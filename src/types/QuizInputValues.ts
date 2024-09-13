export type QuizInputValues = {
  id: number;
  title: string;
  description: string;
  categoryId?: string;
  questions: {
    id: number;
    content: string;
    options: {
      content: string;
      isCorrect: boolean;
    }[];
  }[];
};
