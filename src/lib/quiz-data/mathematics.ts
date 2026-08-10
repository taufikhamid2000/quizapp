import type { Subject } from "./types";

export const mathematics: Subject = {
  slug: "mathematics",
  name: "Mathematics",
  description: "Core arithmetic and algebra fundamentals.",
  topics: [
    {
      slug: "arithmetic",
      name: "Arithmetic",
      description: "Basic operations and number sense.",
      questions: [
        { id: "math-arith-1", question: "What is 12 + 7?", options: ["17", "18", "19", "20"], answerIndex: 2 },
        { id: "math-arith-2", question: "What is 9 × 6?", options: ["45", "54", "56", "63"], answerIndex: 1 },
        { id: "math-arith-3", question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], answerIndex: 2 },
      ],
    },
    {
      slug: "algebra",
      name: "Algebra",
      description: "Solving for unknowns.",
      questions: [
        { id: "math-alg-1", question: "Solve for x: x + 5 = 12", options: ["5", "6", "7", "8"], answerIndex: 2 },
        { id: "math-alg-2", question: "Solve for x: 3x = 21", options: ["6", "7", "8", "9"], answerIndex: 1 },
      ],
    },
  ],
};
