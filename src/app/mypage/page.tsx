import { AuthRepository } from '~/server/repositories/AuthRepository';
import { QuizList as QuizListType } from '~/types/Quiz';
import Link from 'next/link';
import { Logout } from '~/components/Logout';
import { Button } from '~/components/ui/button';
import { Suspense } from 'react';
import { LoadingUI } from '~/components/Loading/LoadingUI';

export default function MypagePage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="mb-4 text-xl font-bold">マイページ</h1>
        <Suspense fallback={<LoadingUI />}>
          <UserProfile />
        </Suspense>
      </div>
      <div className="mb-10">
        <h2 className="mb-4 text-center text-lg font-bold">作成したクイズ</h2>
        <Suspense fallback={<LoadingUI />}>
          <QuizList />
        </Suspense>
      </div>
      <Logout />
    </>
  );
}

async function UserProfile() {
  const user = await AuthRepository().getUser();
  return (
    <>
      <p className="mb-4">ユーザー名: {user.name}</p>
      <Link
        className="mx-auto block w-fit"
        href="/mypage/quiz-setting/register"
      >
        <Button>クイズを作成する</Button>
      </Link>
    </>
  );
}

async function QuizList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const user = await AuthRepository().getUser();
  const response = await fetch(`${baseUrl}/api/quizzes?user-id=${user.id}`, {
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
