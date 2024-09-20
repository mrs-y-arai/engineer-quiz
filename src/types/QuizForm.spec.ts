import { expect, it, describe } from 'vitest';
import { quizFormSchema } from './QuizForm';
import { QUIZ_STATUS_ITEM } from './QuizForm';

describe('quizFormSchema', () => {
  it('正常系(公開する。errorsが空配列であること。)', () => {
    // Arrange
    const inputValues = {
      title: 'クイズタイトル',
      description: 'クイズ説明',
      questions: [
        {
          content: '問題文',
          options: [
            {
              content: '選択肢1',
              isCorrect: 'true',
            },
            {
              content: '選択肢2',
              isCorrect: null,
            },
            {
              content: '選択肢3',
              isCorrect: null,
            },
            {
              content: '選択肢4',
              isCorrect: null,
            },
          ],
        },
      ],
      status: QUIZ_STATUS_ITEM.PUBLISHED,
    };

    // Act
    const result = quizFormSchema.safeParse(inputValues);

    // Assert
    expect(result.success).toBe(true);
  });

  it('正常系(公開する。errorsが空配列であること。)', () => {
    // Arrange
    const inputValues = {
      title: 'クイズタイトル',
      description: 'クイズ説明',
      questions: [
        {
          content: '問題文',
          options: [
            {
              content: '選択肢1',
              isCorrect: 'true',
            },
            {
              content: '選択肢2',
              isCorrect: null,
            },
            {
              content: '選択肢3',
              isCorrect: null,
            },
            {
              content: '選択肢4',
              isCorrect: null,
            },
          ],
        },
      ],
      status: QUIZ_STATUS_ITEM.UNPUBLISHED,
    };

    // Act
    const result = quizFormSchema.safeParse(inputValues);

    // Assert
    expect(result.success).toBe(true);
  });

  it('異常系(必須系のバリデーション)', () => {
    // Arrange
    const inputValues = {
      title: '',
      description: '',
      questions: [
        {
          content: '',
          options: [
            {
              content: '',
              isCorrect: null,
            },
            {
              content: '',
              isCorrect: null,
            },
            {
              content: '',
              isCorrect: null,
            },
            {
              content: '',
              isCorrect: null,
            },
          ],
        },
      ],
      status: undefined,
    };

    // Act
    const result = quizFormSchema.safeParse(inputValues);

    // Assert
    expect(result.success).toBe(false);
    expect(
      result.error?.errors.find(
        (error) => error.message === 'タイトルは必須です',
      ),
    ).toBeDefined();
    expect(
      result.error?.errors.find(
        (error) => error.message === '説明文は必須です',
      ),
    ).toBeDefined();
    expect(
      result.error?.errors.find(
        (error) => error.message === '問題文は必須です',
      ),
    ).toBeDefined();
    expect(
      result.error?.errors.find(
        (error) => error.message === '選択肢は必須です',
      ),
    ).toBeDefined();
    expect(
      result.error?.errors.find(
        (error) => error.message === '正解の選択肢を1つ選択してください',
      ),
    ).toBeDefined();
    expect(
      result.error?.errors.find(
        (error) => error.message === 'ステータスは必須です',
      ),
    ).toBeDefined();
  });

  it('異常系(問題が1つも設定されていない)', () => {
    // Arrange
    const inputValues = {
      title: 'タイトル',
      description: '説明文',
      questions: [],
      status: QUIZ_STATUS_ITEM.PUBLISHED,
    };

    // Act
    const result = quizFormSchema.safeParse(inputValues);

    // Assert
    expect(result.success).toBe(false);
    expect(
      result.error?.errors.find(
        (error) => error.message === '問題は最低1つ以上必要です',
      ),
    ).toBeDefined();
  });

  it('異常系(1つの問題に対して、正解の選択肢を2つ以上設定した場合)', () => {
    // Arrange
    const inputValues = {
      title: 'タイトル',
      description: '説明文',
      questions: [
        {
          content: '',
          options: [
            {
              content: '',
              isCorrect: 'true',
            },
            {
              content: '',
              isCorrect: 'true',
            },
            {
              content: '',
              isCorrect: null,
            },
            {
              content: '',
              isCorrect: null,
            },
          ],
        },
      ],
      status: QUIZ_STATUS_ITEM.PUBLISHED,
    };

    // Act
    const result = quizFormSchema.safeParse(inputValues);

    // Assert
    expect(result.success).toBe(false);
    expect(
      result.error?.errors.find(
        (error) => error.message === '正解の選択肢を1つ選択してください',
      ),
    ).toBeDefined();
  });
});
