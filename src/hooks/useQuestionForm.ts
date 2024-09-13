'use client';

import { useState, useRef } from 'react';
import { QuizInputValues } from '~/types/QuizInputValues';

export const useQuestionForm = (initialQuiz?: QuizInputValues) => {
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * 編集フォームにも使いそうなので、state管理にしてる
   */
  const [title, setTitle] = useState(initialQuiz?.title || '');
  const [description, setDescription] = useState(
    initialQuiz?.description || '',
  );
  const [selectedCategory, setSelectedCategory] = useState(
    String(initialQuiz?.categoryId) || '',
  );
  const [questions, setQuestions] = useState<
    {
      content: string;
      options: {
        content: string;
        isCorrect: boolean;
      }[];
    }[]
  >(
    initialQuiz?.questions || [
      {
        content: '',
        options: [
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
        ],
      },
    ],
  );

  /**
   * フォームのリセット
   */
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedCategory('');
    setQuestions([
      {
        content: '',
        options: [
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
        ],
      },
    ]);
    formRef.current?.reset();
  };

  const addQuestion = () => {
    setQuestions((prevQuestion) => {
      return [
        ...prevQuestion,
        {
          content: '',
          options: [
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
          ],
        },
      ];
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.filter((_, i) => i !== index);
      return newQuestions;
    });
  };

  /**
   * 正解の選択肢のチェックボックスの変更
   * @param questionIndex 問題のインデックス
   * @param optionIndex 選択肢のインデックス
   * @param isCorrect 正解かどうか
   */
  const handleIsCorrectChange = (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean,
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) => {
        return index === questionIndex
          ? {
              ...question,
              options: question.options.map((option, optIdx) =>
                optIdx === optionIndex
                  ? {
                      ...option,
                      isCorrect: isCorrect,
                    }
                  : option,
              ),
            }
          : question;
      }),
    );
  };

  return {
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
  };
};
