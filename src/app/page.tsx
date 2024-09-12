import Link from 'next/link';
import { QuizList as QuizListType } from '~/types/Quiz';
import { Button } from '~/components/ui/button';
import { Suspense } from 'react';
import { LoadingUI } from '~/components/Loading/LoadingUI';

export default async function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-4 text-center text-2xl font-bold">
          みんなのエンジニアクイズ
        </h1>
        <p className="mb-4 text-center text-base font-bold leading-relaxed">
          エンジニアクイズを解いて、
          <br className="block md:hidden" />
          自分の力を試してみよう！
          <br />
          自分でクイズを作って、
          <br className="block md:hidden" />
          みんなに共有することもできるよ！
        </p>
      </div>
      <section className="py-4" id="quiz-list">
        <h2 className="mb-3 text-center text-xl font-bold">クイズ一覧</h2>
        <Suspense fallback={<LoadingUI />}>
          <QuizList />
        </Suspense>
      </section>
      <section className="py-4">
        <h2 className="mb-4 text-center text-xl font-bold">クイズを作る</h2>
        <Link
          href="/mypage/quiz-setting/register"
          prefetch={true}
          className="mx-auto block w-fit"
        >
          <Button>クイズを作る</Button>
        </Link>
      </section>
    </div>
  );
}

async function QuizList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/quizzes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['getQuizzes'] },
  });
  const responseJson = await response.json();
  const quizzes = responseJson.data;

  return (
    <>
      {quizzes.length > 0 ? (
        <>
          <ul className="grid grid-cols-1">
            {quizzes.map((quiz: QuizListType[0]) => {
              return (
                <li key={quiz.id} className="border-b">
                  <Link
                    className="flex items-center justify-between p-4 duration-200 hover:bg-primary/5"
                    href={`/quiz/${quiz.id}`}
                    prefetch={true}
                  >
                    {quiz.title}
                    {quiz.category && <p>#{quiz.category.name}</p>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-center">クイズがありません</p>
      )}
    </>
  );
}
