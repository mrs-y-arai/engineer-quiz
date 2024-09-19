import { Questions as QuestionsType } from '~/types/Question';
import { QuestionItem } from './QuestionItem';

type Props = {
  questions: QuestionsType;
  answers: boolean[];
  handleAnswer: (params: { quizId: number; answerId: number }) => void;
};

export function Questions({ questions, answers, handleAnswer }: Props) {
  return (
    <div>
      {questions.map((item, index) => {
        return (
          <div key={index}>
            {answers.length === index ? (
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
