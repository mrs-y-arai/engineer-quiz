import { QuizService } from '~/server/services/QuizService';
import { snakeToCamel } from '~/utils';
import { redirect } from 'next/navigation';
import { QuizDetailPresentation } from '~/features/quiz-detail/QuizDetailPresentation';
import { Suspense } from 'react';
import { LoadingUI } from '~/components/Loading/LoadingUI';

export default async function QuizDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const quizId = parseInt(params.id, 10);

  return (
    <div className="mx-auto max-w-[700px]">
      <Suspense fallback={<LoadingUI />}>
        <QuizDetailContainer quizId={quizId} />
      </Suspense>
    </div>
  );
}

async function QuizDetailContainer({ quizId }: { quizId: number }) {
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
    <>
      <h1 className="headline mb-4 text-center">{quiz.title}</h1>
      <QuizDetailPresentation
        quiz={{
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
        }}
        questions={camelCaseQuestions}
      />
    </>
  );
}
