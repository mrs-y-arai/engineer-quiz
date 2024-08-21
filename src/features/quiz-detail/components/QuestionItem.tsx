import { Button } from '~/components/ui/button';
import { QuestionItem as QuestionItemType } from '~/types/Question';

type Props = QuestionItemType & {
  index: number;
  handleAnswer: (params: { quizId: number; answerId: number }) => void;
};

export function QuestionItem({
  id,
  index,
  content,
  options,
  handleAnswer,
}: Props) {
  return (
    <div>
      <div className="mb-6 gap-x-4">
        <span className="block text-center text-2xl font-bold text-primary">
          Q{index + 1}
        </span>
        <p className="pt-1.5 text-center text-xl font-bold">{content}</p>
      </div>
      <div className="flex flex-col gap-y-4">
        {options.map((option) => {
          return (
            <Button
              key={option.content}
              onClick={() =>
                handleAnswer({
                  quizId: id,
                  answerId: option.id,
                })
              }
              className="text-lg font-bold"
              variant="outline"
              size="full"
            >
              {option.content}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
