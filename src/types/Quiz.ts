import { Questions } from '~/types/Question';

export type Quiz = {
  id: number;
  title: string;
  questions: Questions;
};

/**
 * Quiz一覧表示用の型
 */
export type QuizList = {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  } | null;
}[];
