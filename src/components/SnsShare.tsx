'use client';

import { Button } from '~/components/ui/button';
import { generateXShareUrl, generateLineShareUrl } from '~/utils';
import Image from 'next/image';
import { cn } from '~/lib/utils';

export function SnsShare({
  text,
  path,
  className,
}: {
  text: string;
  path: string;
  className?: string;
}) {
  const xShareUrl = generateXShareUrl({
    text,
    path,
  });
  const lineShareUrl = generateLineShareUrl({
    text,
    path,
  });

  return (
    <div className={cn(className)}>
      <p className="mb-3 text-center text-lg font-bold">SNSで共有する</p>
      <div className="flex items-center justify-center gap-3">
        <Button
          className="size-[36px] bg-black p-1"
          variant="plain"
          size="icon"
          onClick={() => window.open(xShareUrl)}
        >
          <Image src="/x-logo.svg" alt="X" width={24} height={24} />
        </Button>
        <Button
          className="size-[36px]"
          variant="plain"
          size="icon"
          onClick={() =>
            window.open(lineShareUrl, '_blank', 'noopener,noreferrer')
          }
        >
          <Image src="/LINE_Brand_icon.png" alt="LINE" width={36} height={36} />
        </Button>
      </div>
    </div>
  );
}
