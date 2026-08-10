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
