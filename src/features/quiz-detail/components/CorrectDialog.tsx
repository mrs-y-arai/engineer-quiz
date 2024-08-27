'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { CircleCheck } from '~/components/icons/CircleCheck';

export function CorrectDialog({
  isOpen,
  toggleFunction,
  isLast,
}: {
  isOpen: boolean;
  toggleFunction: (isOpen: boolean) => void;
  isLast: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={toggleFunction}>
      <DialogContent>
        <DialogHeader>
          <CircleCheck className="mx-auto mb-3 size-12 text-success" />
          <DialogTitle className="text-center">正解!</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => toggleFunction(false)}>
            {isLast ? '閉じる' : '次の問題へ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
