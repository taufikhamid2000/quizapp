import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTopic, subjects } from "@/lib/quiz-data";
import { QuizRunner } from "./components/quiz-runner";

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
  return { title: found ? `${found.topic.name} - Quiz App` : "Topic not found" };
}

export default async function TopicQuizPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject: subjectSlug, topic: topicSlug } = await params;
  const found = getTopic(subjectSlug, topicSlug);
  if (!found) notFound();
  const { subject, topic } = found;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <div>
        <Link href={`/subjects/${subject.slug}`} className="text-sm text-foreground/60 hover:text-foreground">
          &larr; {subject.name}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">{topic.name}</h1>
        <p className="mt-1 text-sm text-foreground/60">{topic.description}</p>
      </div>

      <QuizRunner questions={topic.questions} subjectSlug={subject.slug} />
    </div>
  );
}
