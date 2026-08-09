import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSubject, subjects } from "@/lib/quiz-data";
import { TopicsBrowser } from "./components/topics-browser";

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

      <TopicsBrowser topics={subject.topics} subjectSlug={subject.slug} />
    </div>
  );
}
