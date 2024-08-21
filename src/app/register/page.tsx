'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { createQuestion } from '~/actions/createQuestion';
import { customErrorMap } from '~/lib/validation';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { Label, Input, FormItem, TextArea } from '~/components/Form';
import { Checkbox } from '~/components/Form/Checkbox';

export default function RegisterPage() {
  z.setErrorMap(customErrorMap);
  const initialState = {
    errors: { _errors: [] },
    message: null,
  };
  const [state, dispatch] = useFormState(createQuestion, initialState);
  const [questionCount, setQuestionCount] = useState(1);

  const addQuestion = () => {
    setQuestionCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">クイズ作成</h1>
      <form action={dispatch}>
        <div className="flex flex-col gap-y-8">
          <p className="-mb-6 text-center text-lg font-bold">基本情報</p>
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
          <div className="flex flex-col gap-y-6">
            <p className="-mb-3 text-center text-lg font-bold">問題登録</p>
            {Array.from({ length: questionCount }, (_, index) => (
              <div className="flex flex-col gap-y-4" key={index}>
                <p className="text-center text-base font-bold">
                  {index + 1}問目
                </p>
                <FormItem>
                  <Label
                    label="問題文"
                    htmlFor={`question${index + 1}`}
                    hasError={
                      !!state.errors?.questions?.[index]?.content?._errors
                    }
                  />
                  <TextArea
                    className="block"
                    name="question"
                    id={`question${index + 1}`}
                    errorMessages={
                      state.errors?.questions?.[index]?.content?._errors
                    }
                  />
                </FormItem>
                <FormItem>
                  <Label
                    label="選択肢1"
                    htmlFor={`option1_${index + 1}`}
                    hasError={
                      !!state.errors?.questions?.[index]?.options?.[0]?.content
                        ?._errors
                    }
                  />
                  <Input
                    type="text"
                    id={`option1_${index + 1}`}
                    name={`option_${index + 1}`}
                    errorMessages={
                      state.errors?.questions?.[index]?.options?.[0]?.content
                        ?._errors
                    }
                  />
                  <div className="-mt-2 flex items-center">
                    <Label
                      className="text-sm"
                      label="正解の選択肢"
                      htmlFor={`question_${index + 1}_option_1_check`}
                      hasError={
                        !!state.errors?.questions?.[index]?.options?.[0]
                          ?._errors
                      }
                    />
                    <Checkbox
                      className="mt-1"
                      id={`question_${index + 1}_option_1_check`}
                      name={`question_${index + 1}_option_1_check`}
                      errorMessages={
                        state.errors?.questions?.[index]?.options?.[0]?._errors
                      }
                    />
                  </div>
                </FormItem>
                <FormItem>
                  <Label
                    label="選択肢2"
                    htmlFor={`option2_${index + 1}`}
                    hasError={
                      !!state.errors?.questions?.[index]?.options?.[1]?.content
                        ?._errors
                    }
                  />
                  <Input
                    type="text"
                    id={`option2_${index + 1}`}
                    name={`option_${index + 1}`}
                    errorMessages={
                      state.errors?.questions?.[index]?.options?.[1]?.content
                        ?._errors
                    }
                  />
                  <div className="-mt-2 flex items-center">
                    <Label
                      className="text-sm"
                      label="正解の選択肢"
                      htmlFor={`question_${index + 1}_option_2_check`}
                      hasError={
                        !!state.errors?.questions?.[index]?.options?.[1]
                          ?._errors
                      }
                    />
                    <Checkbox
                      className="mt-1"
                      id={`question_${index + 1}_option_2_check`}
                      name={`question_${index + 1}_option_2_check`}
                      errorMessages={
                        state.errors?.questions?.[index]?.options?.[1]?._errors
                      }
                    />
                  </div>
                </FormItem>
                <FormItem>
                  <Label
                    label="選択肢3"
                    htmlFor={`option3_${index + 1}`}
                    hasError={
                      !!state.errors?.questions?.[index]?.options?.[2]?.content
                        ?._errors
                    }
                  />
                  <Input
                    type="text"
                    id={`option3_${index + 1}`}
                    name={`option_${index + 1}`}
                    errorMessages={
                      state.errors?.questions?.[index]?.options?.[2]?.content
                        ?._errors
                    }
                  />
                  <div className="-mt-2 flex items-center">
                    <Label
                      className="text-sm"
                      label="正解の選択肢"
                      htmlFor={`question_${index + 1}_option_3_check`}
                      hasError={
                        !!state.errors?.questions?.[index]?.options?.[2]
                          ?._errors
                      }
                    />
                    <Checkbox
                      className="mt-1"
                      id={`question_${index + 1}_option_3_check`}
                      name={`question_${index + 1}_option_3_check`}
                      errorMessages={
                        state.errors?.questions?.[index]?.options?.[2]?._errors
                      }
                    />
                  </div>
                </FormItem>
                <FormItem>
                  <Label
                    label="選択肢4"
                    htmlFor={`option4_${index + 1}`}
                    hasError={
                      !!state.errors?.questions?.[index]?.options?.[3]?.content
                        ?._errors
                    }
                  />
                  <Input
                    type="text"
                    id={`option4_${index + 1}`}
                    name={`option_${index + 1}`}
                    errorMessages={
                      state.errors?.questions?.[index]?.options?.[3]?.content
                        ?._errors
                    }
                  />
                  <div className="-mt-2 flex items-center">
                    <Label
                      className="text-sm"
                      label="正解の選択肢"
                      htmlFor={`question_${index + 1}_option_4_check`}
                      hasError={
                        !!state.errors?.questions?.[index]?.options?.[3]
                          ?._errors
                      }
                    />
                    <Checkbox
                      className="mt-1"
                      id={`question_${index + 1}_option_4_check`}
                      name={`question_${index + 1}_option_4_check`}
                      errorMessages={
                        state.errors?.questions?.[index]?.options?.[3]?._errors
                      }
                    />
                  </div>
                </FormItem>
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
          <Button className="mx-auto mt-4 w-[200px]" type="submit">
            作成
          </Button>
        </div>
      </form>
    </div>
  );
}
