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
