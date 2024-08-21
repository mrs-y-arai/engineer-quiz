'use client';

import { useState, useEffect } from 'react';
import { Questions as QuestionsType } from '~/types/Question';
import { Option } from '~/types/Option';

/**
 * クイズの回答状況を管理する
 */
export const useQuizProgress = (questions: QuestionsType) => {
  const QUESTION_s = questions;

  /**
   * 回答結果
   * true: 正解
   * false: 不正解
   */
  const [answers, setAnswers] = useState<boolean[]>([]);

  /**
   * 現在の問題の正解
   */
  const [currentQuizCorrectAnswer, setCurrentQuizCorrectAnswer] =
    useState<Option>({
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
  const _updateAnswers = (answer: boolean) => {
    setAnswers([...answers, answer]);
  };

  /**
   * 正誤チェックする
   */
  const _checkAnswer = (params: {
    quizId: number;
    answerId: number;
  }): {
    correct: boolean;
    correctAnswer: Option;
  } => {
    // 答えたクイズを取得
    const quizTarget = QUESTION_s.find((quiz) => quiz.id === params.quizId);

    // TODO: あとでエラーハンドリング
    if (!quizTarget) throw new Error('エラー');

    // 正誤チェック
    const correctAnswer = quizTarget.options.find(
      (option) => option.isCorrect === true,
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
      (answers.filter((answer) => answer).length / QUESTION_s.length) * 100,
    );
    setTotalScore(totalScore);
  };

  const handleAnswer = (params: { quizId: number; answerId: number }) => {
    const result = _checkAnswer(params);

    _updateAnswers(result.correct);

    setCurrentQuizCorrectAnswer(result.correctAnswer);

    if (result.correct) {
      setIsCorrectOpen(true);
    } else {
      setIsInCorrectOpen(true);
    }
  };

  useEffect(() => {
    if (QUESTION_s.length === answers.length) {
      calcTotalScore();
    }
  }, [answers.length]);

  return {
    handleAnswer,
    answers,
    currentQuizCorrectAnswer,
    isCorrectOpen,
    setIsCorrectOpen,
    isInCorrectOpen,
    setIsInCorrectOpen,
    totalScore,
  };
};
