import Link from "next/link";
import type { Metadata } from "next";
import { subjects } from "@/lib/quiz-data";

export const metadata: Metadata = {
  title: "Subjects - Quiz App",
  description: "Browse subjects and topics",
};

export default function SubjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Subjects</h1>
        <p className="mt-1 text-sm text-foreground/60">Pick a subject to see its topics.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/subjects/${subject.slug}`}
            className="rounded-2xl border border-border bg-muted/40 p-5 transition-colors hover:border-foreground/20"
          >
            <h2 className="font-semibold text-foreground">{subject.name}</h2>
            <p className="mt-1 text-sm text-foreground/60">{subject.description}</p>
            <p className="mt-3 text-xs text-foreground/40">
              {subject.topics.length} topic{subject.topics.length === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
