'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  createdQuizId?: number;
};

export function CompleteDialog({
  isDialogOpen,
  setIsDialogOpen,
  createdQuizId,
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
          <p className="my-4 block underline">
            クイズURL: {`${window.location.origin}/quiz/${createdQuizId}`}
          </p>
          <Button className="mx-auto">SNSでシェア</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
