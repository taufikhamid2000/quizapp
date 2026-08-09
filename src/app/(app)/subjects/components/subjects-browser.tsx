"use client";

import Link from "next/link";
import { ListBrowser, type SortOption } from "@/components/ui/list-browser";
import type { Subject } from "@/lib/quiz-data";

// Sort compare functions are values that can't cross the Server->Client
// boundary as props (same class of bug as passing a full dict with
// function fields — see signin-form.tsx). Defining them here, inside a
// client component, keeps them local to the client bundle.
const sortOptions: SortOption<Subject>[] = [
  { label: "Name (A–Z)", compare: (a, b) => a.name.localeCompare(b.name) },
  { label: "Name (Z–A)", compare: (a, b) => b.name.localeCompare(a.name) },
  { label: "Most topics", compare: (a, b) => b.topics.length - a.topics.length },
];

export function SubjectsBrowser({ subjects }: { subjects: Subject[] }) {
  return (
    <ListBrowser
      items={subjects}
      getKey={(subject) => subject.slug}
      getSearchText={(subject) => `${subject.name} ${subject.description}`}
      sortOptions={sortOptions}
      searchPlaceholder="Search subjects…"
      emptyMessage="No subjects match your search."
      renderItem={(subject) => (
        <Link
          href={`/subjects/${subject.slug}`}
          className="rounded-2xl border border-border bg-muted/40 p-5 transition-colors hover:border-foreground/20"
        >
          <h2 className="font-semibold text-foreground">{subject.name}</h2>
          <p className="mt-1 text-sm text-foreground/60">{subject.description}</p>
          <p className="mt-3 text-xs text-foreground/40">
            {subject.topics.length} topic{subject.topics.length === 1 ? "" : "s"}
          </p>
        </Link>
      )}
    />
  );
}
