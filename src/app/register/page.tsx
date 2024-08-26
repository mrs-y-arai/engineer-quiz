import { RegisterForm } from '~/features/register/components/RegisterForm';
import { CategoryRepository } from '~/server/repositories/CategoryRepository';
import { Categories } from '~/types/Category';

export default async function RegisterPage() {
  const categories = await fetchOnRender();
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">クイズ作成</h1>
      <RegisterForm categories={categories} />
    </div>
  );
}

async function fetchOnRender(): Promise<Categories> {
  const categoryRepository = CategoryRepository();
  const categories = await categoryRepository.findAll();
  return categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));
}
