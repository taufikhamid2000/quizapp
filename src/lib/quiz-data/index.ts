// One file per subject in this folder — add a subject, give it topics,
// give each topic questions, then list it below. No database. See
// README.md. Splitting by subject keeps each file small and gives
// approved player-submitted corrections a narrow, single-subject diff
// instead of one growing monolith.
export type { QuizQuestion, Topic, Subject } from "./types";
import type { Subject, Topic } from "./types";

import { mathematics } from "./mathematics";
import { generalKnowledge } from "./general-knowledge";
import { programming } from "./programming";

export const subjects: Subject[] = [mathematics, generalKnowledge, programming];

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getTopic(
  subjectSlug: string,
  topicSlug: string
): { subject: Subject; topic: Topic } | undefined {
  const subject = getSubject(subjectSlug);
  if (!subject) return undefined;
  const topic = subject.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { subject, topic };
}
