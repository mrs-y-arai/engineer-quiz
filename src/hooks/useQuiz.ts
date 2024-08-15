'use client';

import { useState, useEffect } from 'react';
import { QuizList, Answer } from '~/types/Quiz';

export const useQuiz = (quizList: QuizList) => {
  const QUIZ_LIST = quizList;

  /**
   * 回答結果
   * true: 正解
   * false: 不正解
   */
  const [answerList, setAnswerList] = useState<boolean[]>([]);

  /**
   * 現在の問題の正解
   */
  const [currentQuizCorrectAnswer, setCurrentQuizCorrectAnswer] =
    useState<Answer>({
      id: 0,
      content: '',
      isCorrect: true,
    });

  /**
   * 正解のモーダルを開くかどうか
   */
  const [isCorrectOpen, setIsCorrectOpen] = useState(false);

  /**
   * 不正解のモーダルを開くかどうか
   */
  const [isInCorrectOpen, setIsInCorrectOpen] = useState(false);

  /**
   * 回答結果を更新する
   * @param answer 回答結果
   */
  const _updateAnswerList = (answer: boolean) => {
    setAnswerList([...answerList, answer]);
  };

  /**
   * 正誤チェックする
   */
  const _checkAnswer = (params: {
    quizId: number;
    answerId: number;
  }): {
    correct: boolean;
    correctAnswer: Answer;
  } => {
    // 答えたクイズを取得
    const quizTarget = QUIZ_LIST.find((quiz) => quiz.id === params.quizId);

    // TODO: あとでエラーハンドリング
    if (!quizTarget) throw new Error('エラー');

    // 正誤チェック
    const correctAnswer = quizTarget.answerList.find(
      (answer) => answer.isCorrect === true,
    );

    if (!correctAnswer) throw new Error('エラー');

    const result = correctAnswer.id === params.answerId;

    return {
      correct: result,
      correctAnswer,
    };
  };

  /**
   * 合計スコア
   */
  const [totalScore, setTotalScore] = useState(0);

  /**
   * 合計スコアを計算する
   */
  const calcTotalScore = () => {
    // 正解した数とクイズの合計数を比較して、正解率を計算。小数点切り上げ
    const totalScore = Math.ceil(
      (answerList.filter((answer) => answer).length / QUIZ_LIST.length) * 100,
    );
    setTotalScore(totalScore);
  };

  const handleAnswer = (params: { quizId: number; answerId: number }) => {
    const result = _checkAnswer(params);

    _updateAnswerList(result.correct);

    setCurrentQuizCorrectAnswer(result.correctAnswer);

    if (result.correct) {
      setIsCorrectOpen(true);
    } else {
      setIsInCorrectOpen(true);
    }
  };
  useEffect(() => {
    if (QUIZ_LIST.length === answerList.length) {
      calcTotalScore();
    }
  }, [answerList.length]);

  return {
    handleAnswer,
    answerList,
    currentQuizCorrectAnswer,
    isCorrectOpen,
    setIsCorrectOpen,
    isInCorrectOpen,
    setIsInCorrectOpen,
    totalScore,
  };
};
