'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { SnsShare } from '~/components/SnsShare';

type Props = {
  id: number;
  title: string;
  description: string;
};

export function DescriptionDialog({ id, title, description }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-center text-lg">{description}</p>
        </div>
        <Button
          className="mx-auto block w-fit"
          onClick={() => setIsOpen(false)}
        >
          クイズを始める
        </Button>
        <div className="mt-4">
          <SnsShare
            text={`${title}のクイズを解いてみよう!`}
            path={`/quiz/${id}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
