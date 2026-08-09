import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSubject, subjects } from "@/lib/quiz-data";

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  return { title: subject ? `${subject.name} - Quiz App` : "Subject not found" };
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <div>
        <Link href="/subjects" className="text-sm text-foreground/60 hover:text-foreground">
          &larr; Subjects
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">{subject.name}</h1>
        <p className="mt-1 text-sm text-foreground/60">{subject.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {subject.topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/subjects/${subject.slug}/${topic.slug}`}
            className="rounded-2xl border border-border bg-muted/40 p-5 transition-colors hover:border-foreground/20"
          >
            <h2 className="font-semibold text-foreground">{topic.name}</h2>
            <p className="mt-1 text-sm text-foreground/60">{topic.description}</p>
            <p className="mt-3 text-xs text-foreground/40">
              {topic.questions.length} question{topic.questions.length === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
