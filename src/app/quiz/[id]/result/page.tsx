'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '~/components/ui/button';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const score = searchParams.get('score');

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
            <Button className="mx-auto w-fit">共有リンク</Button>
          </>
        )}
      </div>
    </div>
  );
}
