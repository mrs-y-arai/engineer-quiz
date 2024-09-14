import { render } from '@testing-library/react';
import { QuizDetailPresentation } from './QuizDetailPresentation';
import { describe, expect, it } from 'vitest';

describe('QuizDetailPresentation', () => {
  it('should render correctly', () => {
    // Arrange
    const props = {
      quiz: {
        id: 1,
        title: 'Test Quiz',
        description: 'This is a test quiz',
      },
      questions: [],
    };

    const { findByText } = render(<QuizDetailPresentation {...props} />);

    expect(findByText('問題がありません。')).toBeDefined();
  });
});
