interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessages?: string[];
}

export function Input({ errorMessages, ...props }: InputProps) {
  return (
    <div className="relative w-full md:grow">
      <input
        className="w-full rounded border border-gray-light px-2 py-1"
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
