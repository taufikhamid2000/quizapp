import type { Metadata } from "next";
import { subjects } from "@/lib/quiz-data";
import { SubjectsBrowser } from "./components/subjects-browser";

export const metadata: Metadata = {
  title: "Quizzes - Quiz App",
  description: "Browse subjects and topics",
};

export default function SubjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Quizzes</h1>
        <p className="mt-1 text-sm text-foreground/60">Pick a subject to see its topics.</p>
      </div>

      <SubjectsBrowser subjects={subjects} />
    </div>
  );
}
