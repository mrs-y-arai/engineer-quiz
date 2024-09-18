import { render, cleanup } from '@testing-library/react';
import { QuizDetailPresentation, Props } from './QuizDetailPresentation';
import { describe, expect, it, afterEach } from 'vitest';

describe('QuizDetailPresentation', () => {
  afterEach(() => {
    cleanup();
  });

  it('正常系 問題が2問あり、1問目は正解、2問目は不正解。最後に、「回答終了!」と表示される', async () => {
    // Arrange
    const props: Props = {
      quiz: {
        id: 1,
        title: 'Test Quiz',
        description: 'This is a test quiz',
      },
      questions: [
        {
          id: 1,
          content: '問題1',
          options: [
            {
              id: 1,
              content: '選択肢1',
              isCorrect: true,
            },
            {
              id: 2,
              content: '選択肢2',
              isCorrect: false,
            },
            {
              id: 3,
              content: '選択肢3',
              isCorrect: false,
            },
            {
              id: 4,
              content: '選択肢4',
              isCorrect: true,
            },
          ],
        },
        {
          id: 2,
          content: '問題2',
          options: [
            {
              id: 5,
              content: '選択肢5',
              isCorrect: true,
            },
            {
              id: 6,
              content: '選択肢6',
              isCorrect: false,
            },
            {
              id: 7,
              content: '選択肢7',
              isCorrect: false,
            },
            {
              id: 8,
              content: '選択肢8',
              isCorrect: false,
            },
          ],
        },
      ],
    };

    // Act
    const { findByText } = render(<QuizDetailPresentation {...props} />);

    // クイズを始めるボタンをクリック
    const startButton = await findByText('クイズを始める');
    expect(startButton).toBeDefined();
    startButton.click();

    expect(await findByText('問題1')).toBeDefined();
    const correctOption = await findByText('選択肢1');
    expect(correctOption).toBeDefined();
    correctOption.click();

    expect(await findByText('正解!')).toBeDefined();

    const nextButton = await findByText('次の問題へ');
    expect(nextButton).toBeDefined();
    nextButton.click();

    expect(await findByText('問題2')).toBeDefined();
    const incorrectOption = await findByText('選択肢6');
    expect(incorrectOption).toBeDefined();
    incorrectOption.click();
    expect(await findByText('不正解...')).toBeDefined();

    const closeButton = await findByText('閉じる');
    expect(closeButton).toBeDefined();
    closeButton.click();

    // Assert
    expect(await findByText('回答終了!')).toBeDefined();
  });

  it('異常系 問題が1問もない場合、「問題がありません。」と表示される', async () => {
    // Arrange
    const props: Props = {
      quiz: {
        id: 1,
        title: 'Test Quiz',
        description: 'This is a test quiz',
      },
      questions: [],
    };

    // Act
    const { findByText } = render(<QuizDetailPresentation {...props} />);

    // Assert
    expect(await findByText('問題がありません。')).toBeDefined();
  });
});
