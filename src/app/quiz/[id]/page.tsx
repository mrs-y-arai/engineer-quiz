'use client';

import { CorrectDialog } from '~/components/quiz/CorrectDialog';
import { InCorrectDialog } from '~/components/quiz/InCorrectDialog';
import { useQuiz } from '~/hooks/useQuiz';
import { QuizList } from '~/components/quiz/QuizList';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

export default function QuizPage() {
  const QUESTION_LIST: {
    id: number;
    question: string;
    answerList: {
      id: number;
      content: string;
      isCorrect: boolean;
    }[];
  }[] = [
    {
      id: 1,
      question:
        '問題文1が入ります。問題文が入ります。問題文が入ります。問題文が入ります。問題文が入ります。',
      answerList: [
        {
          id: 1,
          content: '回答1',
          isCorrect: false,
        },
        {
          id: 2,
          content: '回答2',
          isCorrect: false,
        },
        {
          id: 3,
          content: '回答3',
          isCorrect: true,
        },
        {
          id: 4,
          content: '回答4',
          isCorrect: false,
        },
      ],
    },
    {
      id: 2,
      question:
        '問題文2が入ります。問題文が入ります。問題文が入ります。問題文が入ります。問題文が入ります。',
      answerList: [
        {
          id: 1,
          content: '回答1',
          isCorrect: true,
        },
        {
          id: 2,
          content: '回答2',
          isCorrect: false,
        },
        {
          id: 3,
          content: '回答3',
          isCorrect: false,
        },
        {
          id: 4,
          content: '回答4',
          isCorrect: false,
        },
      ],
    },
  ];

  const {
    handleAnswer,
    answerList,
    totalScore,
    currentQuizCorrectAnswer,
    isCorrectOpen,
    setIsCorrectOpen,
    isInCorrectOpen,
    setIsInCorrectOpen,
  } = useQuiz(QUESTION_LIST);

  return (
    <div className="mx-auto max-w-[700px]">
      <h2 className="headline mb-4 text-center">ミセス検定</h2>
      <QuizList
        quizList={QUESTION_LIST}
        answerList={answerList}
        handleAnswer={handleAnswer}
      />
      {answerList.length === QUESTION_LIST.length ? (
        <>
          <p className="mb-4 text-center text-xl font-bold">回答終了!</p>
          {/* リンクにパラメーターを詰める */}
          <Link
            className="mx-auto block w-fit"
            href={`/result?name=ミセス検定&score=${totalScore}`}
            prefetch={true}
          >
            <Button>結果を見る</Button>
          </Link>
        </>
      ) : null}
      <CorrectDialog
        toggleFunction={setIsCorrectOpen}
        isOpen={isCorrectOpen}
        isLast={answerList.length === QUESTION_LIST.length}
      />
      <InCorrectDialog
        toggleFunction={setIsInCorrectOpen}
        isOpen={isInCorrectOpen}
        correctAnswer={currentQuizCorrectAnswer.content}
        isLast={answerList.length === QUESTION_LIST.length}
      />
    </div>
  );
}
