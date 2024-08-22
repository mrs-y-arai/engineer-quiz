'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

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
          <CircleCheckIcon className="mx-auto mb-3 size-12 text-success" />
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

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
