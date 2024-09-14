/**
 * スネークケースをキャメルケースに変換するヘルパー関数
 * @param obj - The object to convert.
 * @returns The converted object.
 */
export function snakeToCamel<T, U = T>(obj: T): U {
  if (typeof obj !== 'object' || obj === null) {
    return obj as unknown as U;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel) as U;
  }

  // オブジェクトの場合
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase()),
      snakeToCamel(value),
    ]),
  ) as U;
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
