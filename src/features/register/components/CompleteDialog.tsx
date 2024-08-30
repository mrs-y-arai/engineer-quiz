'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { SnsShare } from '~/components/SnsShare';
import Link from 'next/link';

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  createdQuiz?: {
    id: number;
    title: string;
  };
};

export function CompleteDialog({
  isDialogOpen,
  setIsDialogOpen,
  createdQuiz,
}: Props) {
  if (typeof window === 'undefined') return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="min-h-[40svh]">
        <DialogHeader>
          <DialogTitle className="text-center">クイズ作成完了！</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p>クイズの作成、ありがとうございます！</p>
          <p>SNSなどで、友達にシェアしよう！</p>
          {createdQuiz && (
            <>
              <Link
                href={`/quiz/${createdQuiz.id}`}
                className="my-4 block underline"
                prefetch={true}
              >
                クイズURL: {`${window.location.origin}/quiz/${createdQuiz.id}`}
              </Link>
              <SnsShare
                text={`エンジニアクイズを作りました！${createdQuiz?.title}に挑戦しよう！`}
                path={`/quiz/${createdQuiz?.id}`}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
