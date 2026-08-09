"use client";

import Link from "next/link";
import { ListBrowser, type SortOption } from "@/components/ui/list-browser";
import type { Topic } from "@/lib/quiz-data";

const sortOptions: SortOption<Topic>[] = [
  { label: "Name (A–Z)", compare: (a, b) => a.name.localeCompare(b.name) },
  { label: "Name (Z–A)", compare: (a, b) => b.name.localeCompare(a.name) },
  { label: "Most questions", compare: (a, b) => b.questions.length - a.questions.length },
];

export function TopicsBrowser({ topics, subjectSlug }: { topics: Topic[]; subjectSlug: string }) {
  return (
    <ListBrowser
      items={topics}
      getKey={(topic) => topic.slug}
      getSearchText={(topic) => `${topic.name} ${topic.description}`}
      sortOptions={sortOptions}
      searchPlaceholder="Search topics…"
      emptyMessage="No topics match your search."
      renderItem={(topic) => (
        <Link
          href={`/subjects/${subjectSlug}/${topic.slug}`}
          className="rounded-2xl border border-border bg-muted/40 p-5 transition-colors hover:border-foreground/20"
        >
          <h2 className="font-semibold text-foreground">{topic.name}</h2>
          <p className="mt-1 text-sm text-foreground/60">{topic.description}</p>
          <p className="mt-3 text-xs text-foreground/40">
            {topic.questions.length} question{topic.questions.length === 1 ? "" : "s"}
          </p>
        </Link>
      )}
    />
  );
}
