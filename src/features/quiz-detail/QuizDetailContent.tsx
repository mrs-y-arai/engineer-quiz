'use client';

import { CorrectDialog } from './components/CorrectDialog';
import { InCorrectDialog } from './components/InCorrectDialog';
import { useQuizProgress } from './hooks/useQuizProgress';
import { QuestionList } from './components/QuestionList';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { QuestionList as QuestionListType } from '~/types/Question';

type Props = {
  quiz: {
    id: number;
    title: string;
  };
  questionList: QuestionListType;
};

export function QuizDetailContent({ questionList, quiz }: Props) {
  const {
    handleAnswer,
    answerList,
    totalScore,
    currentQuizCorrectAnswer,
    isCorrectOpen,
    setIsCorrectOpen,
    isInCorrectOpen,
    setIsInCorrectOpen,
  } = useQuizProgress(questionList);

  return (
    <>
      <QuestionList
        questionList={questionList}
        answerList={answerList}
        handleAnswer={handleAnswer}
      />
      {answerList.length === questionList.length ? (
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
      <CorrectDialog
        toggleFunction={setIsCorrectOpen}
        isOpen={isCorrectOpen}
        isLast={answerList.length === questionList.length}
      />
      <InCorrectDialog
        toggleFunction={setIsInCorrectOpen}
        isOpen={isInCorrectOpen}
        correctAnswer={currentQuizCorrectAnswer.content}
        isLast={answerList.length === questionList.length}
      />
    </>
  );
}
