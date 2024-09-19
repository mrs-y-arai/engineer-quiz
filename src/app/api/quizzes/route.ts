import { NextRequest, NextResponse } from 'next/server';
import { QuizList } from '~/types/Quiz';
import { QuizService } from '~/server/services/QuizService';

export const revalidate = 0;

export async function GET(request: NextRequest): Promise<
  | NextResponse<{
      error: string;
    }>
  | NextResponse<{
      data: QuizList;
      message: string;
    }>
> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user-id');
    const isPublished = searchParams.get('is-published');
    const isPublishedBoolean =
      isPublished === 'true'
        ? true
        : isPublished === 'false'
          ? false
          : undefined;

    const quizService = QuizService();
    const quizzes = await quizService.getAllQuizWithCategory({
      userId: userId ?? undefined,
      isPublished: isPublishedBoolean,
    });
    return NextResponse.json({ data: quizzes, message: 'クイズ一覧取得成功' });
  } catch (error) {
    return NextResponse.json({ error: 'クイズ一覧取得失敗' });
  }
}
