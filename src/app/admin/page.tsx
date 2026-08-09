import Link from "next/link";
import type { Metadata } from "next";
import { subjects } from "@/lib/quiz-data";

export const metadata: Metadata = {
  title: "Admin - Quiz App",
  description: "Content audit view of all subjects, topics, and questions",
};

export default function AdminPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Admin</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Read-only content audit. Quiz content lives in{" "}
          <code className="text-xs">src/lib/quiz-data.ts</code> — edit that file to change it.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs uppercase text-foreground/50">
              <th className="px-4 py-3 font-medium">Subject</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Topics</th>
              <th className="px-4 py-3 font-medium">Questions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.slug} className="border-b border-border last:border-0 hover:bg-muted/40">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/${subject.slug}`}
                    className="font-medium text-foreground hover:text-primary hover:underline"
                  >
                    {subject.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-foreground/60">{subject.slug}</td>
                <td className="px-4 py-3 text-foreground/60">{subject.topics.length}</td>
                <td className="px-4 py-3 text-foreground/60">
                  {subject.topics.reduce((sum, t) => sum + t.questions.length, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
