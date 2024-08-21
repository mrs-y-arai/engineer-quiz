import { Options } from '~/types/Option';

export type QuestionItem = {
  id: number;
  content: string;
  options: Options;
};

export type Questions = QuestionItem[];
