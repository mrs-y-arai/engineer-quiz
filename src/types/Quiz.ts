import { QuestionList } from '~/types/Question';

export type Quiz = {
  id: number;
  title: string;
  questionList: QuestionList;
};
