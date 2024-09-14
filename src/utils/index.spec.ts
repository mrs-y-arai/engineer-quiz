import { expect, it, describe } from 'vitest';
import { generateXShareUrl, generateLineShareUrl, snakeToCamel } from './index';
import dotenv from 'dotenv';

describe('generateXShareUrl', () => {
  it('should return the correct URL', () => {
    // Arrange
    const text = 'test';
    const path = '/test';

    // Act
    const result = generateXShareUrl({ text, path });

    // Assert
    const baseUrl = dotenv.config({ path: '.env.test' }).parsed
      ?.NEXT_PUBLIC_BASE_URL;
    expect(result).toBe(
      `https://twitter.com/intent/tweet?text=${text}&url=${baseUrl}${path}&hashtags=エンジニアクイズ`,
    );
  });
});

describe('generateLineShareUrl', () => {
  it('should return the correct URL', () => {
    // Arrange
    const text = 'test';
    const path = '/test';

    // Act
    const result = generateLineShareUrl({ text, path });

    // Assert
    const baseUrl = dotenv.config({ path: '.env.test' }).parsed
      ?.NEXT_PUBLIC_BASE_URL;
    expect(result).toBe(
      `https://line.me/R/msg/text/?${text}%20${baseUrl}${path}`,
    );
  });
});

describe('snakeToCamel', () => {
  it('snake caseのプロパティをcamel caseに変換する', () => {
    // Arrange
    const snakeCase = {
      test_case: 'testCase',
    };

    // Act
    const result = snakeToCamel<
      {
        test_case: string;
      },
      {
        testCase: string;
      }
    >(snakeCase);

    // Assert
    const expected = {
      testCase: 'testCase',
    };
    expect(result).toStrictEqual(expected);
  });

  it('snake caseのプロパティをcamel caseに変換する(オブジェクトが2階層の場合)', () => {
    // Arrange
    const snakeCase = {
      test_case: 'testCase',
      test_case_2: {
        test_case_3: 'testCase3',
      },
    };

    // Act
    const result = snakeToCamel<typeof snakeCase, typeof expected>(snakeCase);

    // Assert
    const expected = {
      testCase: 'testCase',
      testCase2: {
        testCase3: 'testCase3',
      },
    };
    expect(result).toStrictEqual(expected);
  });
});
