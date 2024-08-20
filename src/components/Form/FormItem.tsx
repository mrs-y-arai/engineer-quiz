import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function FormItem({ children }: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-y-2 md:flex-row md:gap-2">
      {children}
    </div>
  );
}
