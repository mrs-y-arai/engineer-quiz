import { Checkbox as CheckboxComponent } from '~/components/ui/checkbox';
import { cn } from '~/lib/utils';

type CheckboxProps = {
  id: string;
  name: string;
  value: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function Checkbox({
  id,
  name,
  value,
  onChange,
  className,
  ...props
}: CheckboxProps) {
  return (
    <div className="relative w-full md:grow">
      <CheckboxComponent
        id={id}
        name={name}
        value={String(value)}
        onCheckedChange={onChange}
        className={cn(className, 'mt-3 inline-block')}
        {...props}
      />
    </div>
  );
}
