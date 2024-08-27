import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { CircleCross } from '~/components/icons/CircleCross';

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
          <CircleCross className="mx-auto mb-3 size-12 text-destructive" />
          <DialogTitle className="text-center">不正解...</DialogTitle>
          <DialogDescription className="pt-2 text-center">
            正解は{correctAnswer}
          </DialogDescription>
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
