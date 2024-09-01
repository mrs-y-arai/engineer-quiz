import { Label, Input, FormItem, Checkbox } from '~/components/Form';
import { ChangeEvent } from 'react';

type Props = {
  index: number;
  questionIndex: number;
  errorMessages?: string[];
  isCorrect: {
    errorMessages?: string[];
  };
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  isCorrectValue: boolean;
  isCorrectOnChange: (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean,
  ) => void;
};

export function Option({
  index,
  questionIndex,
  errorMessages,
  isCorrect,
  value,
  onChange,
  isCorrectValue,
  isCorrectOnChange,
}: Props) {
  return (
    <FormItem>
      <Label
        label={`選択肢${index + 1}`}
        htmlFor={`option1_${index + 1}`}
        hasError={!!errorMessages?.length}
      />
      <Input
        type="text"
        id={`option1_${index + 1}`}
        name={`option_${questionIndex + 1}`}
        errorMessages={errorMessages}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <div className="-mt-2 md:mt-0">
        <div className="flex items-center">
          <Label
            className="mt-0 text-sm"
            label="正解の選択肢"
            htmlFor={`question_${questionIndex + 1}_option_${index + 1}_check`}
            hasError={!!isCorrect.errorMessages?.length}
          />
          <Checkbox
            className="mt-1.5"
            id={`question_${questionIndex + 1}_option_${index + 1}_check`}
            name={`question_${questionIndex + 1}_option_${index + 1}_check`}
            value={isCorrectValue}
            onChange={(e) => {
              isCorrectOnChange(questionIndex, index, e);
            }}
          />
        </div>
        {isCorrect.errorMessages &&
          isCorrect.errorMessages.length > 0 &&
          isCorrect.errorMessages.map((error, index) => (
            <div
              key={index}
              className="mt-1 text-sm text-destructive"
              aria-live="polite"
            >
              {error}
            </div>
          ))}
      </div>
    </FormItem>
  );
}
