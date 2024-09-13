'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { SnsShare } from '~/components/SnsShare';
import Link from 'next/link';
import { tryRevalidateTag } from '~/actions/tryRevalidateTag';

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  isRegister: boolean;
  quiz?: {
    id: number;
    title: string;
  };
};

export function QuestionCompleteDialog({
  isDialogOpen,
  setIsDialogOpen,
  isRegister,
  quiz,
}: Props) {
  useEffect(() => {
    tryRevalidateTag('getQuizzes');
  }, []);

  return (
    <>
      {typeof window === 'undefined' ? null : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="min-h-[40svh]">
            <DialogHeader>
              <DialogTitle className="text-center">
                {isRegister ? 'クイズ作成完了！' : 'クイズ更新完了！'}
              </DialogTitle>
            </DialogHeader>
            <div className="text-center">
              <p>SNSなどで、友達にシェアしよう！</p>
              {quiz && (
                <>
                  <Link
                    href={`/quiz/${quiz.id}`}
                    className="my-4 block underline"
                    prefetch={true}
                  >
                    クイズURL: {`${window.location.origin}/quiz/${quiz.id}`}
                  </Link>
                  <SnsShare
                    text={`エンジニアクイズを作りました！${quiz?.title}に挑戦しよう！`}
                    path={`/quiz/${quiz?.id}`}
                  />
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
