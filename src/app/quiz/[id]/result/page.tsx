'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { SnsShare } from '~/components/SnsShare';

export default function ResultPage() {
  const params = useParams();
  const quizId = params.id.toString();

  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const score = searchParams.get('score');

  const shareText = `${name}に挑戦しました。${score}点でした。あなたも挑戦してみませんか？`;
  const path = `/quiz/${quizId}`;

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="border-2 border-primary bg-primary/5 p-10">
        {!name || !score ? (
          <>
            <div className="text-center">データがありません</div>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-center text-2xl font-bold">
              {name}の結果
            </h1>
            <p className="mb-4 text-center text-2xl font-bold">{score}点!</p>
            <SnsShare text={shareText} path={path} />
          </>
        )}
      </div>
    </div>
  );
}
