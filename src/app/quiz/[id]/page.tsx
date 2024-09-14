import { QuizDetailContent } from '~/features/quiz-detail/components/QuizDetailContent';
import { QuizService } from '~/server/services/QuizService';
import { snakeToCamel } from '~/utils';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { LoadingUI } from '~/components/Loading/LoadingUI';
import { Questions } from '~/types/Question';

export default async function QuizDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const quizId = parseInt(params.id, 10);
  const { getQuizWithQuestionsAndOptions } = QuizService();
  const quiz = await getQuizWithQuestionsAndOptions(quizId);

  if (!quiz) {
    redirect('/');
  }

  const transformedQuestions = quiz.questions.map((question) => {
    const transformedOptions = question.options.map((option) => {
      return {
        id: option.id,
        content: option.content,
        isCorrect: option.is_correct,
      };
    });
    return {
      id: question.id,
      content: question.content,
      options: transformedOptions,
    };
  });

  const camelCaseQuestions = snakeToCamel(transformedQuestions);

  return (
    <div className="mx-auto max-w-[700px]">
      <QuizDetail
        quiz={{
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
        }}
        questions={camelCaseQuestions}
      />
      {/* <Suspense fallback={<LoadingUI />}>
      </Suspense> */}
    </div>
  );
}

/**
 * ページがレンダリングされるタイミングで発火させるデータ取得処理
 * @param id
 */
type Props = {
  quiz: {
    id: number;
    title: string;
    description: string;
  };
  questions: Questions;
};
function QuizDetail({ questions, quiz }: Props) {
  // const { getQuizWithQuestionsAndOptions } = QuizService();
  // const quiz = await getQuizWithQuestionsAndOptions(id);

  // if (!quiz) {
  //   redirect('/');
  // }

  // const transformedQuestions = quiz.questions.map((question) => {
  //   const transformedOptions = question.options.map((option) => {
  //     return {
  //       id: option.id,
  //       content: option.content,
  //       isCorrect: option.is_correct,
  //     };
  //   });
  //   return {
  //     id: question.id,
  //     content: question.content,
  //     options: transformedOptions,
  //   };
  // });

  // const camelCaseQuestions = snakeToCamel(transformedQuestions);

  return (
    <>
      <h1 className="headline mb-4 text-center">{quiz.title}</h1>
      <QuizDetailContent
        quiz={{
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
        }}
        questions={questions}
      />
    </>
  );
}
