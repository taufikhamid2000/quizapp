import type { Subject } from "./types";

export const generalKnowledge: Subject = {
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
};
