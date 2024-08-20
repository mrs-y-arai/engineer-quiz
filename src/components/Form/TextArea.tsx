import { Textarea } from '../ui/textarea';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessages: string[] | undefined;
}

export function TextArea({ errorMessages, ...props }: TextareaProps) {
  return (
    <div className="relative w-full md:grow">
      <Textarea
        className="w-full border border-gray-light px-2 py-1"
        {...props}
      />
      {errorMessages &&
        errorMessages.length > 0 &&
        errorMessages.map((error, index) => (
          <div
            key={index}
            className="mt-2 text-sm text-destructive"
            id="name-error"
            aria-live="polite"
          >
            {error}
          </div>
        ))}
    </div>
  );
}
