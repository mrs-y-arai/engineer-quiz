import { expect, it, describe } from 'vitest';
import { generateXShareUrl } from './index';
describe('generateXShareUrl', () => {
  it('should return the correct URL', () => {
    // Arrange
    const text = 'test';
    const path = '/test';

    // Act
    const result = generateXShareUrl({ text, path });

    // Assert
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    expect(result).toBe(
      `https://twitter.com/intent/tweet?text=${text}&url=${baseUrl}${path}&hashtags=エンジニアクイズ`,
    );
  });
});
