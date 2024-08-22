import { Checkbox as CheckboxComponent } from '~/components/ui/checkbox';
import { cn } from '~/lib/utils';

type CheckboxProps = {
  id: string;
  name: string;
  errorMessages: string[] | undefined;
  className?: string;
};

export function Checkbox({ errorMessages, ...props }: CheckboxProps) {
  return (
    <div className="relative w-full md:grow">
      <CheckboxComponent
        className={cn(props.className, 'mt-3 inline-block')}
        {...props}
      />
      {errorMessages &&
        errorMessages.length > 0 &&
        errorMessages.map((error, index) => (
          <div
            key={index}
            className="mt-2 text-sm text-destructive"
            aria-live="polite"
          >
            {error}
          </div>
        ))}
    </div>
  );
}
