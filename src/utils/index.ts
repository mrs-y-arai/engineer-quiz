import { revalidateTag } from 'next/cache';

/**
 * スネークケースをキャメルケースに変換するヘルパー関数
 * @param obj - The object to convert.
 * @returns The converted object.
 */
export function snakeToCamel<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel) as T;
  }

  // オブジェクトの場合
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
      snakeToCamel(value),
    ]),
  ) as T;
}

/**
 * 指定したミリ秒数だけ待機するヘルパー関数
 * @param ms - The number of milliseconds to wait.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateXShareUrl(params: { text: string; path: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return `https://twitter.com/intent/tweet?text=${params.text}&url=${baseUrl}${params.path}&hashtags=エンジニアクイズ`;
}

export function generateLineShareUrl(params: { text: string; path: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return `https://line.me/R/msg/text/?${params.text}%20${baseUrl}${params.path}`;
}

export function tryRevalidateTag(tag: string) {
  revalidateTag(tag);
}
