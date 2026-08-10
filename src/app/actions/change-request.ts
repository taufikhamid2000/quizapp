"use server";

import { z } from "zod";
import { createServerClient } from "@/utils/supabase/server";

// Player-submitted content corrections land in quizapp_change_requests
// (see supabase/migrations/) — the shared Supabase project already used
// for auth, so no new secret to configure. Anonymous inserts are allowed
// by RLS; review happens via the Supabase Table Editor for now.
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

  const supabase = await createServerClient();
  const { error } = await supabase.from("quizapp_change_requests").insert({
    subject_slug: data.subjectSlug,
    subject_name: data.subjectName,
    topic_slug: data.topicSlug,
    topic_name: data.topicName,
    question_id: data.questionId ?? null,
    question_text: data.questionText ?? null,
    issue: data.issue,
    suggested_fix: data.suggestedFix ?? null,
    reporter_contact: data.reporterContact ?? null,
  });

  if (error) {
    console.error("Failed to insert change request", error);
    return { ok: false, error: "Something went wrong submitting your report. Please try again." };
  }

  return { ok: true };
}
