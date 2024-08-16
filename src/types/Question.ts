import { OptionList } from '~/types/Option';

export type QuestionItem = {
  id: number;
  content: string;
  optionList: OptionList;
};

export type QuestionList = QuestionItem[];
