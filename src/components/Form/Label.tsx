import { cn } from '~/lib/utils';

type Props = {
  label: string;
  htmlFor: string;
  hasError?: boolean;
  className?: string;
};

export function Label({ label, htmlFor, hasError = false, className }: Props) {
  return (
    <label
      className={cn(
        'mt-1 w-[100px] shrink-0',
        { 'text-destructive': hasError },
        className,
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}
