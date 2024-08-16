import { QuestionList as QuestionListType } from '~/types/Question';
import { QuestionItem } from './QuestionItem';

type Props = {
  questionList: QuestionListType;
  answerList: boolean[];
  handleAnswer: (params: { quizId: number; answerId: number }) => void;
};

export function QuestionList({
  questionList,
  answerList,
  handleAnswer,
}: Props) {
  return (
    <div>
      {questionList.map((item, index) => {
        return (
          <div key={index}>
            {answerList.length === index ? (
              <QuestionItem
                {...item}
                index={index}
                handleAnswer={handleAnswer}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
