import { EditForm } from '~/features/quiz-edit/components/EditForm';
import { CategoryRepository } from '~/server/repositories/CategoryRepository';
import { QuizCategoryRelationshipsRepository } from '~/server/repositories/QuizCategoryRelationshipsRepository';
import { Suspense } from 'react';
import { LoadingUI } from '~/components/Loading/LoadingUI';
import { QuizService } from '~/server/services/QuizService';
import { snakeToCamel } from '~/utils';

export default async function EditPage({ params }: { params: { id: string } }) {
  const quizId = parseInt(params.id, 10);
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">クイズ編集</h1>
      <Suspense fallback={<LoadingUI />}>
        <EditContent quizId={quizId} />
      </Suspense>
    </div>
  );
}

async function EditContent({ quizId }: { quizId: number }) {
  const categoryRepository = CategoryRepository();
  const categories = await categoryRepository.findAll();
  const mappedCategories = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  const quizService = QuizService();
  const [quiz, quizCategoryRelationships] = await Promise.all([
    quizService.getQuizWithQuestionsAndOptions(quizId),
    QuizCategoryRelationshipsRepository().findByQuizId(quizId),
  ]);

  if (!quiz) {
    return (
      <>
        <p className="text-center">クイズが見つかりません。</p>
      </>
    );
  }

  const transformedQuiz = snakeToCamel<any>(quiz);

  return (
    <>
      <EditForm
        categories={mappedCategories}
        initialQuiz={{
          ...transformedQuiz,
          categoryId: quizCategoryRelationships?.category_id,
        }}
      />
    </>
  );
}
