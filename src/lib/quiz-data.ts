export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Topic {
  slug: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Subject {
  slug: string;
  name: string;
  description: string;
  topics: Topic[];
}

// Quiz content lives here, in the repo — no database. Add a subject, give
// it topics, give each topic questions. See README.md.
export const subjects: Subject[] = [
  {
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
  },
  {
    slug: "general-knowledge",
    name: "General Knowledge",
    description: "A mix of geography, science, and history.",
    topics: [
      {
        slug: "geography",
        name: "Geography",
        description: "Countries, capitals, and landmarks.",
        questions: [
          {
            id: "gk-geo-1",
            question: "What is the capital of Malaysia?",
            options: ["Johor Bahru", "Kuala Lumpur", "Penang", "Ipoh"],
            answerIndex: 1,
          },
          {
            id: "gk-geo-2",
            question: "Which is the largest ocean?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answerIndex: 3,
          },
        ],
      },
      {
        slug: "science",
        name: "Science",
        description: "Basic scientific facts.",
        questions: [
          {
            id: "gk-sci-1",
            question: "What planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answerIndex: 1,
          },
          {
            id: "gk-sci-2",
            question: "What gas do plants absorb from the air for photosynthesis?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            answerIndex: 2,
          },
        ],
      },
    ],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getTopic(
  subjectSlug: string,
  topicSlug: string
): { subject: Subject; topic: Topic } | undefined {
  const subject = getSubject(subjectSlug);
  if (!subject) return undefined;
  const topic = subject.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { subject, topic };
}
