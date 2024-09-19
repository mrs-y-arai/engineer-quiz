import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { QUIZ_STATUS_ITEM, QuizStatus } from '~/types/QuizForm';
import { Label } from '~/components/Form';

type Props = {
  status: QuizStatus;
  setStatus: (status: QuizStatus) => void;
  errorMessages?: string[];
};

export function StatusRadioGroup({ status, setStatus, errorMessages }: Props) {
  return (
    <>
      <RadioGroup defaultValue={status} onValueChange={setStatus}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            checked={status === QUIZ_STATUS_ITEM.PUBLISHED}
            value={QUIZ_STATUS_ITEM.PUBLISHED}
            id="published"
          />
          <Label label="公開" htmlFor="published" />
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            checked={status === QUIZ_STATUS_ITEM.UNPUBLISHED}
            value={QUIZ_STATUS_ITEM.UNPUBLISHED}
            id="unpublished"
          />
          <Label label="非公開" htmlFor="unpublished" />
        </div>
      </RadioGroup>
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
      <input type="hidden" name="status" value={status} />
    </>
  );
}
