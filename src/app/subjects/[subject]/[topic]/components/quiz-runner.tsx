"use client";

import { useLayoutEffect, useState } from "react";
import type { QuizQuestion } from "@/lib/quiz-data";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Reshuffles both question order and each question's options, remapping
// answerIndex to wherever the correct option landed — so scoring still
// works against the shuffled positions.
function shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffle(questions).map((q) => {
    const optionOrder = shuffle(q.options.map((_, i) => i));
    return {
      ...q,
      options: optionOrder.map((i) => q.options[i]),
      answerIndex: optionOrder.indexOf(q.answerIndex),
    };
  });
}

export function QuizRunner({ questions }: { questions: QuizQuestion[] }) {
  // These pages are statically prerendered, so the server-rendered HTML
  // is fixed at build time. Starting state here has to match that exact
  // markup — shuffling in the initializer would call Math.random() again
  // during client hydration and produce a different order, which React
  // flags as a hydration mismatch. Instead: render the original order
  // first, then reshuffle in a layout effect (runs after hydration,
  // before paint) so there's no mismatch and no visible flash.
  const [shuffled, setShuffled] = useState(questions);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    setShuffled(shuffleQuestions(questions));
  }, [questions]);

  const question = shuffled[index];
  const selected = answers[index];
  const isFirst = index === 0;
  const isLast = index === shuffled.length - 1;
  const score = answers.reduce<number>(
    (total, answer, i) => (answer === shuffled[i].answerIndex ? total + 1 : total),
    0
  );

  function handleSelect(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  }

  function handleBack() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function handleNext() {
    if (selected === null) return;
    if (isLast) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handleRetake() {
    setShuffled(shuffleQuestions(questions));
    setIndex(0);
    setAnswers(questions.map(() => null));
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <p className="text-sm text-foreground/60">You scored</p>
        <p className="mt-1 text-4xl font-bold text-foreground">
          {score} / {shuffled.length}
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
        Question {index + 1} of {shuffled.length}
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
                onClick={() => handleSelect(i)}
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
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="cursor-pointer rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={selected === null}
          className="cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
