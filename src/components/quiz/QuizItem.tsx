import { Button } from '~/components/ui/button';
import { QuizItem as QuizItemType } from '~/types/Quiz';

type Props = {
  id: QuizItemType['id'];
  index: number;
  question: QuizItemType['question'];
  answerList: QuizItemType['answerList'];
  handleAnswer: (params: { quizId: number; answerId: number }) => void;
};

export function QuizItem({
  id,
  index,
  question,
  answerList,
  handleAnswer,
}: Props) {
  return (
    <div>
      <div className="mb-6 gap-x-4">
        <span className="block text-center text-2xl font-bold text-primary">
          Q{index + 1}
        </span>
        <p className="pt-1.5 text-base font-bold">{question}</p>
      </div>
      <div className="flex flex-col gap-y-4">
        {answerList.map((answer) => {
          return (
            <Button
              key={answer.content}
              onClick={() =>
                handleAnswer({
                  quizId: id,
                  answerId: answer.id,
                })
              }
              className="text-lg font-bold"
              variant="outline"
              size="full"
            >
              {answer.content}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
