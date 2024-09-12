import { RegisterForm } from '~/features/quiz-register/components/RegisterForm';
import { CategoryRepository } from '~/server/repositories/CategoryRepository';
import { Suspense } from 'react';
import { LoadingUI } from '~/components/Loading/LoadingUI';

export default async function RegisterPage() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">クイズ作成</h1>
      <Suspense fallback={<LoadingUI />}>
        <RegisterContent />
      </Suspense>
    </div>
  );
}

async function RegisterContent() {
  const categoryRepository = CategoryRepository();
  const categories = await categoryRepository.findAll();
  const mappedCategories = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <>
      <RegisterForm categories={mappedCategories} />
    </>
  );
}
