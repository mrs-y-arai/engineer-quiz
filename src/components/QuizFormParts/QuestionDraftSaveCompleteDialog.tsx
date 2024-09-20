'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { tryRevalidateTag } from '~/actions/tryRevalidateTag';

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  isRegister: boolean;
};

export function QuestionDraftSaveCompleteDialog({
  isDialogOpen,
  setIsDialogOpen,
  isRegister,
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
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
