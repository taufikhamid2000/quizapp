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
  return { title: subject ? `${subject.name} - Admin - Quiz App` : "Subject not found" };
}

export default async function AdminSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <div>
        <Link href="/admin" className="text-sm text-foreground/60 hover:text-foreground">
          &larr; Admin
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">{subject.name}</h1>
        <p className="mt-1 text-sm text-foreground/60">{subject.description}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs uppercase text-foreground/50">
              <th className="px-4 py-3 font-medium">Topic</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Questions</th>
            </tr>
          </thead>
          <tbody>
            {subject.topics.map((topic) => (
              <tr key={topic.slug} className="border-b border-border last:border-0 hover:bg-muted/40">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/${subject.slug}/${topic.slug}`}
                    className="font-medium text-foreground hover:text-primary hover:underline"
                  >
                    {topic.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-foreground/60">{topic.slug}</td>
                <td className="px-4 py-3 text-foreground/60">{topic.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
