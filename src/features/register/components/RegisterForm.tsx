'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { createQuestion } from '~/actions/createQuestion';
import { useFormState, useFormStatus } from 'react-dom';
import { Label, Input, FormItem, TextArea, Combobox } from '~/components/Form';
import { CompleteDialog } from './CompleteDialog';
import { Option } from './Option';
import { Categories } from '~/types/Category';

type Props = {
  categories: Categories;
};

export function RegisterForm({ categories }: Props) {
  const initialState = {
    errors: { _errors: [] },
    message: null,
  };

  const [state, dispatch] = useFormState(createQuestion, initialState);
  const [questionCount, setQuestionCount] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const addQuestion = () => {
    setQuestionCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (state.createdQuizId) {
      setIsDialogOpen(true);
    }
  }, [state.createdQuizId]);

  return (
    <>
      <form action={(formData) => dispatch(formData)}>
        <div className="flex flex-col gap-y-8">
          <p className="-mb-6 text-center text-lg font-bold">基本情報</p>
          <div className="flex flex-col gap-y-2">
            <FormItem>
              <Label
                label="タイトル"
                htmlFor="title"
                hasError={!!state.errors?.title?._errors}
              />
              <Input
                type="text"
                id="title"
                name="title"
                errorMessages={state.errors?.title?._errors}
              />
            </FormItem>
            <FormItem>
              <Label
                label="説明文"
                htmlFor="description"
                hasError={!!state.errors?.description?._errors}
              />
              <Input
                type="text"
                id="description"
                name="description"
                errorMessages={state.errors?.description?._errors}
              />
            </FormItem>
            <FormItem>
              <Label label="カテゴリ" htmlFor="tag" />
              <Combobox
                placeholder="カテゴリを選択"
                value={selectedTag}
                onChange={setSelectedTag}
                options={categories}
              />
              <input type="hidden" name="category" value={selectedTag} />
            </FormItem>
          </div>
          <div className="flex flex-col gap-y-6">
            <p className="-mb-3 text-center text-lg font-bold">問題登録</p>
            <p className="text-center text-sm">
              4択問題を作ります。正解の選択肢に、チェックをつけてください。
            </p>
            {Array.from({ length: questionCount }).map((_, questionIndex) => (
              <div key={questionIndex}>
                <p className="mb-2 text-center text-base font-bold">
                  {questionIndex + 1}問目
                </p>
                <FormItem>
                  <Label
                    label="問題文"
                    htmlFor={`question${questionIndex + 1}`}
                    hasError={
                      !!state.errors?.questions?.[questionIndex]?.content
                        ?._errors
                    }
                  />
                  <TextArea
                    className="block"
                    name="question"
                    id={`question${questionIndex + 1}`}
                    errorMessages={
                      state.errors?.questions?.[questionIndex]?.content?._errors
                    }
                  />
                </FormItem>
                <div className="mt-4 grid grid-cols-1 gap-y-3">
                  {Array.from({ length: 4 }).map((_, optionIndex) => {
                    return (
                      <Option
                        key={optionIndex}
                        index={optionIndex}
                        questionIndex={questionIndex}
                        errorMessages={
                          state.errors?.questions?.[questionIndex]?.options?.[
                            optionIndex
                          ]?.content?._errors
                        }
                        isCorrect={{
                          errorMessages:
                            state.errors?.questions?.[questionIndex]?.options
                              ?._errors,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <Button
              onClick={addQuestion}
              variant="outline"
              className="mx-auto mt-1"
              type="button"
            >
              問題追加
            </Button>
          </div>
          <SubmitButton />
        </div>
      </form>
      <CompleteDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        createdQuizId={state.createdQuizId}
      />
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="mx-auto mt-4 w-[200px]"
      type="submit"
      isProcessing={pending}
    >
      作成
    </Button>
  );
}
