'use client';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();
  return (
    <>
      <div className="p-10">
        <h1 className="mb-5 text-center text-xl font-bold">
          お探しのページは見つかりません
        </h1>
        <p className="mb-4 text-center">
          お探しのページが見つかりませんでした。URLが間違っているか、ページが削除された可能性があります。
        </p>
        <Button
          className="mx-auto flex"
          variant="default"
          onClick={() => router.push('/')}
        >
          ホームに戻る
        </Button>
      </div>
    </>
  );
}
