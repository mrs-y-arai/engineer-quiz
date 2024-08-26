import { Checkbox as CheckboxComponent } from '~/components/ui/checkbox';
import { cn } from '~/lib/utils';

type CheckboxProps = {
  id: string;
  name: string;
  className?: string;
};

export function Checkbox({ ...props }: CheckboxProps) {
  return (
    <div className="relative w-full md:grow">
      <CheckboxComponent
        className={cn(props.className, 'mt-3 inline-block')}
        {...props}
      />
    </div>
  );
}
