import { Questions } from '~/types/Question';

export type Quiz = {
  id: number;
  title: string;
  questions: Questions;
};
