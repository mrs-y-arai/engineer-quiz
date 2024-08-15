import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

export function InCorrectDialog({
  isOpen,
  toggleFunction,
  correctAnswer,
  isLast,
}: {
  isOpen: boolean;
  toggleFunction: (isOpen: boolean) => void;
  correctAnswer: string;
  isLast: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={toggleFunction}>
      <DialogContent>
        <DialogHeader>
          <CircleXIcon className="mx-auto mb-3 size-12 text-destructive" />
          <DialogTitle className="text-center">不正解...</DialogTitle>
          <DialogDescription className="pt-2 text-center">
            正解は{correctAnswer}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => toggleFunction(false)}>
            {isLast ? '結果へ' : '次の問題へ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CircleXIcon(props: any) {
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
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
