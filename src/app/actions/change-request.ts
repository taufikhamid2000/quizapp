"use server";

import { z } from "zod";

// Player-submitted content corrections become GitHub issues on this repo
// (labeled "change-request") instead of rows in a database — quiz content
// has no DB dependency by design, and this keeps the review queue
// somewhere it's already going to be reviewed: the repo itself. Once
// approved, the fix is applied as a normal commit to the relevant subject
// file under src/lib/quiz-data/, referencing the issue number.
//
// Requires a GITHUB_CHANGE_REQUEST_TOKEN env var: a GitHub token with
// "Issues: write" access on this repo (a fine-grained PAT scoped to just
// taufikhamid2000/quizapp is enough). Without it, submissions fail
// visibly with an error instead of silently disappearing.
const ChangeRequestSchema = z.object({
  subjectSlug: z.string().min(1).max(100),
  subjectName: z.string().min(1).max(200),
  topicSlug: z.string().min(1).max(100),
  topicName: z.string().min(1).max(200),
  questionId: z.string().max(100).optional(),
  questionText: z.string().max(1000).optional(),
  issue: z.string().min(10, "Please describe the issue in a bit more detail.").max(2000),
  suggestedFix: z.string().max(2000).optional(),
  reporterContact: z.string().max(200).optional(),
  // Honeypot: real users never see or fill this field (see
  // change-request-form.tsx); bots that auto-fill every input will.
  website: z.string().max(500).optional(),
});

export type ChangeRequestInput = z.infer<typeof ChangeRequestSchema>;

export type ChangeRequestResult = { ok: true } | { ok: false; error: string };

const GITHUB_REPO = "taufikhamid2000/quizapp";

export async function submitChangeRequest(input: ChangeRequestInput): Promise<ChangeRequestResult> {
  const parsed = ChangeRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  const data = parsed.data;

  if (data.website) {
    // Honeypot tripped — pretend it worked so the bot doesn't adjust.
    return { ok: true };
  }

  const token = process.env.GITHUB_CHANGE_REQUEST_TOKEN;
  if (!token) {
    console.error("GITHUB_CHANGE_REQUEST_TOKEN is not configured");
    return { ok: false, error: "Change requests aren't accepting submissions right now. Please try again later." };
  }

  const title = `Change request: ${data.subjectName} / ${data.topicName}${
    data.questionId ? ` (${data.questionId})` : ""
  }`;

  const bodyLines = [
    `**Subject:** ${data.subjectName} (\`${data.subjectSlug}\`)`,
    `**Topic:** ${data.topicName} (\`${data.topicSlug}\`)`,
    data.questionId ? `**Question:** \`${data.questionId}\`` : null,
    data.questionText ? `> ${data.questionText}` : null,
    "",
    "**What's wrong:**",
    data.issue,
    data.suggestedFix ? `\n**Suggested fix:**\n${data.suggestedFix}` : null,
    data.reporterContact ? `\n**Reporter contact:** ${data.reporterContact}` : null,
  ].filter((line): line is string => line !== null);

  let response: Response;
  try {
    response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        title,
        body: bodyLines.join("\n"),
        labels: ["change-request"],
      }),
    });
  } catch (error) {
    console.error("Failed to reach GitHub while submitting a change request", error);
    return { ok: false, error: "Something went wrong submitting your report. Please try again." };
  }

  if (!response.ok) {
    console.error("GitHub rejected the change request issue", response.status, await response.text());
    return { ok: false, error: "Something went wrong submitting your report. Please try again." };
  }

  return { ok: true };
}
