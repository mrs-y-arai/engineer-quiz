import { QuizDetailContent } from '~/features/quiz-detail/components/QuizDetailContent';
import { QuizService } from '~/server/services/QuizService';
import { Quiz } from '~/types/Quiz';
import { snakeToCamel } from '~/utils';
import { redirect } from 'next/navigation';

export default async function QuizDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const quizId = parseInt(params.id, 10);
  const quiz = await fetchOnRender(quizId);

  return (
    <div className="mx-auto max-w-[700px]">
      <h1 className="headline mb-4 text-center">{quiz.title}</h1>
      <QuizDetailContent
        quiz={{
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
        }}
        questions={quiz.questions}
      />
    </div>
  );
}

/**
 * ページがレンダリングされるタイミングで発火させるデータ取得処理
 * @param id
 */
async function fetchOnRender(id: number): Promise<Quiz> {
  const { getQuizWithQuestionsAndOptions } = QuizService();
  const quiz = await getQuizWithQuestionsAndOptions(id);

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

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    questions: camelCaseQuestions,
  };
}
