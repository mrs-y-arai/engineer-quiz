import { NextResponse } from 'next/server';
import { QuizList } from '~/types/Quiz';
import { QuizService } from '~/server/services/QuizService';

export async function GET(): Promise<
  | NextResponse<{
      error: string;
    }>
  | NextResponse<{
      data: QuizList;
      message: string;
    }>
> {
  try {
    const quizService = QuizService();
    const quizzes = await quizService.getAllQuizWithCategory();
    return NextResponse.json({ data: quizzes, message: 'クイズ一覧取得成功' });
  } catch (error) {
    return NextResponse.json({ error: 'クイズ一覧取得失敗' });
  }
}
