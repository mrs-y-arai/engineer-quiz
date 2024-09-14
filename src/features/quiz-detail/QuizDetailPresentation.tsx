'use client';

import { CorrectDialog } from './components/CorrectDialog';
import { InCorrectDialog } from './components/InCorrectDialog';
import { DescriptionDialog } from './components/DescriptionDialog';
import { useQuizProgress } from './hooks/useQuizProgress';
import { Questions } from './components/Questions';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { Questions as QuestionsType } from '~/types/Question';

type Props = {
  quiz: {
    id: number;
    title: string;
    description: string;
  };
  questions: QuestionsType;
};

export function QuizDetailPresentation({ questions, quiz }: Props) {
  const {
    handleAnswer,
    answers,
    totalScore,
    currentQuizCorrectAnswer,
    isCorrectOpen,
    setIsCorrectOpen,
    isInCorrectOpen,
    setIsInCorrectOpen,
  } = useQuizProgress(questions);

  return (
    <>
      <Questions
        questions={questions}
        answers={answers}
        handleAnswer={handleAnswer}
      />
      {answers.length === questions.length ? (
        <>
          <p className="mb-4 text-center text-xl font-bold">回答終了!</p>
          {/* リンクにパラメーターを詰める */}
          <Link
            className="mx-auto block w-fit"
            href={`/quiz/${quiz.id}/result?name=${quiz.title}&score=${totalScore}`}
            prefetch={true}
          >
            <Button>結果を見る</Button>
          </Link>
        </>
      ) : null}
      <DescriptionDialog
        id={quiz.id}
        title={quiz.title}
        description={quiz.description}
      />
      <CorrectDialog
        toggleFunction={setIsCorrectOpen}
        isOpen={isCorrectOpen}
        isLast={answers.length === questions.length}
      />
      <InCorrectDialog
        toggleFunction={setIsInCorrectOpen}
        isOpen={isInCorrectOpen}
        correctAnswer={currentQuizCorrectAnswer.content}
        isLast={answers.length === questions.length}
      />
    </>
  );
}
