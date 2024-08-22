import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { QuizRepository } from '~/server/repositories/QuizRepository';
import { Quiz } from '~/types/Quiz';

export default async function Home() {
  const quizzes = await fetchOnRender();

  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-4 text-center text-2xl font-bold">
          クイズメーカーさん
        </h1>
        <p className="mb-4 text-center text-base font-bold">
          クイズを作って、みんなに共有してみよう！
        </p>
        <Link className="mx-auto block w-fit" href="/register" prefetch={true}>
          <Button>クイズを作る</Button>
        </Link>
      </div>
      <section className="py-4">
        <h2 className="mb-3 text-center text-xl font-bold">
          今まで作ったクイズたち
        </h2>
        <ul className="grid grid-cols-1">
          {quizzes.map((quiz) => {
            return (
              <li key={quiz.id} className="border-b">
                <Link
                  className="block p-4 duration-200 hover:bg-primary/5"
                  href={`/quiz/${quiz.id}`}
                  prefetch={true}
                >
                  {quiz.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

async function fetchOnRender(): Promise<Omit<Quiz, 'questions'>[]> {
  const quizRepository = QuizRepository();
  const quizzes = await quizRepository.findAll();
  const quizzesWithoutQuestions = quizzes.map((quiz) => {
    return {
      id: quiz.id,
      title: quiz.title,
    };
  });
  return quizzesWithoutQuestions;
}
