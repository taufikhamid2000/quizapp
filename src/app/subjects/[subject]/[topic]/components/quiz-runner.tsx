"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/quiz-data";

export function QuizRunner({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function handleNext() {
    if (selected === null) return;
    const nextScore = selected === question.answerIndex ? score + 1 : score;
    setScore(nextScore);
    if (isLast) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function handleRetake() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <p className="text-sm text-foreground/60">You scored</p>
        <p className="mt-1 text-4xl font-bold text-foreground">
          {score} / {questions.length}
        </p>
        <button
          type="button"
          onClick={handleRetake}
          className="mt-6 cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Retake
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-foreground/40">
        Question {index + 1} of {questions.length}
      </p>
      <div className="rounded-2xl border border-border bg-muted/40 p-6">
        <p className="mb-4 font-medium text-foreground">{question.question}</p>
        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={isSelected}
                className={
                  isSelected
                    ? "cursor-pointer rounded-lg border border-primary bg-primary/10 px-4 py-2 text-left text-sm text-foreground transition-colors"
                    : "cursor-pointer rounded-lg border border-border px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                }
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={selected === null}
        className="self-end cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLast ? "Finish" : "Next"}
      </button>
    </div>
  );
}
