import { QuizList as QuizListType } from '~/types/Quiz';
import { QuizItem } from '~/components/quiz/QuizItem';

type Props = {
  quizList: QuizListType;
  answerList: boolean[];
  handleAnswer: (params: { quizId: number; answerId: number }) => void;
};

export function QuizList({ quizList, answerList, handleAnswer }: Props) {
  return (
    <div>
      {quizList.map((item, index) => {
        return (
          <div key={index}>
            {answerList.length === index ? (
              <QuizItem {...item} index={index} handleAnswer={handleAnswer} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
