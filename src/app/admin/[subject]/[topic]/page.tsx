import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTopic, subjects } from "@/lib/quiz-data";

export function generateStaticParams() {
  return subjects.flatMap((s) => s.topics.map((t) => ({ subject: s.slug, topic: t.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug, topic: topicSlug } = await params;
  const found = getTopic(subjectSlug, topicSlug);
  return { title: found ? `${found.topic.name} - Admin - Quiz App` : "Topic not found" };
}

export default async function AdminTopicPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject: subjectSlug, topic: topicSlug } = await params;
  const found = getTopic(subjectSlug, topicSlug);
  if (!found) notFound();
  const { subject, topic } = found;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <div>
        <Link href={`/admin/${subject.slug}`} className="text-sm text-foreground/60 hover:text-foreground">
          &larr; {subject.name}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">{topic.name}</h1>
        <p className="mt-1 text-sm text-foreground/60">{topic.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        {topic.questions.map((question, i) => (
          <div key={question.id} className="rounded-2xl border border-border bg-muted/40 p-5">
            <p className="text-xs text-foreground/40">
              Question {i + 1} &middot; {question.id}
            </p>
            <p className="mt-1 font-medium text-foreground">{question.question}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.answerIndex;
                return (
                  <li
                    key={optionIndex}
                    className={`rounded-lg border px-3 py-1.5 text-sm ${
                      isCorrect
                        ? "border-primary/40 bg-primary/10 font-medium text-foreground"
                        : "border-border text-foreground/60"
                    }`}
                  >
                    {option}
                    {isCorrect && <span className="ml-2 text-xs text-primary">Correct</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
