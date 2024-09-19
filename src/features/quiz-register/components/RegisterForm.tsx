'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { createQuestion } from '~/actions/createQuestion';
import { useFormState, useFormStatus } from 'react-dom';
import { Label, Input, FormItem, TextArea } from '~/components/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { QuestionOption } from '~/components/QuizFormParts/QuestionOption';
import { QuestionCompleteDialog } from '~/components/QuizFormParts/QuestionCompleteDialog';
import { Categories } from '~/types/Category';
import { useQuestionForm } from '~/hooks/useQuestionForm';
import { StatusRadioGroup } from '~/components/QuizFormParts/StatusRadioGroup';

type Props = {
  categories: Categories;
};

export function RegisterForm({ categories }: Props) {
  const initialState = {
    errors: { _errors: [] },
    message: null,
  };
  const [state, dispatch] = useFormState(createQuestion, initialState);

  const {
    title,
    setTitle,
    description,
    setDescription,
    selectedCategory,
    setSelectedCategory,
    questions,
    setQuestions,
    formRef,
    resetForm,
    addQuestion,
    removeQuestion,
    handleIsCorrectChange,
    status,
    setStatus,
  } = useQuestionForm();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (state.quiz) {
      setIsDialogOpen(true);
      resetForm();
    }
  }, [state.quiz]);

  return (
    <>
      <form ref={formRef} action={(formData) => dispatch(formData)}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                errorMessages={state.errors?.description?._errors}
              />
            </FormItem>
            <FormItem>
              <Label label="カテゴリ" htmlFor="tag" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="categoryId" value={selectedCategory} />
            </FormItem>
          </div>
          <div className="flex flex-col gap-y-6">
            <p className="-mb-3 text-center text-lg font-bold">問題登録</p>
            <p className="text-center text-sm">
              4択問題を作ります。正解の選択肢に、チェックをつけてください。
            </p>
            <div className="flex flex-col gap-y-14">
              {questions.map((question, questionIndex) => (
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
                      value={questions[questionIndex].content}
                      onChange={(e) =>
                        setQuestions((prevQuestions) =>
                          prevQuestions.map((question, index) =>
                            index === questionIndex
                              ? { ...question, content: e.target.value }
                              : question,
                          ),
                        )
                      }
                      id={`question${questionIndex + 1}`}
                      errorMessages={
                        state.errors?.questions?.[questionIndex]?.content
                          ?._errors
                      }
                    />
                  </FormItem>
                  <div className="mt-4 grid grid-cols-1 gap-y-3">
                    {question.options.map((_, optionIndex) => {
                      return (
                        <QuestionOption
                          key={optionIndex}
                          index={optionIndex}
                          value={
                            questions[questionIndex].options[optionIndex]
                              .content
                          }
                          onChange={(e) =>
                            setQuestions((prevQuestions) =>
                              prevQuestions.map((question, index) => {
                                return index === questionIndex
                                  ? {
                                      ...question,
                                      options: question.options.map(
                                        (option, optIdx) =>
                                          optIdx === optionIndex
                                            ? {
                                                ...option,
                                                content: e.target.value,
                                              }
                                            : option,
                                      ),
                                    }
                                  : question;
                              }),
                            )
                          }
                          isCorrectValue={
                            questions[questionIndex].options[optionIndex]
                              .isCorrect
                          }
                          isCorrectOnChange={handleIsCorrectChange}
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
                    <Button
                      onClick={() => removeQuestion(questionIndex)}
                      variant="destructive"
                      className="mx-auto mt-1"
                      type="button"
                      disabled={questions.length < 2}
                    >
                      問題削除
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={addQuestion}
              variant="outline"
              className="mx-auto mt-1"
              type="button"
            >
              問題追加
            </Button>
          </div>
          <FormItem>
            <Label
              label="ステータス"
              htmlFor="status"
              hasError={!!state.errors?.status?._errors}
            />
            <StatusRadioGroup
              status={status}
              setStatus={setStatus}
              errorMessages={state.errors?.status?._errors}
            />
          </FormItem>
          <SubmitButton />
        </div>
      </form>
      <QuestionCompleteDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isRegister={true}
        quiz={state.quiz}
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
