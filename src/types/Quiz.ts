export type Answer = {
  id: number;
  content: string;
  isCorrect: boolean;
};

export type AnswerList = Answer[];

export type QuizItem = {
  id: number;
  question: string;
  answerList: AnswerList;
};

export type QuizList = QuizItem[];
