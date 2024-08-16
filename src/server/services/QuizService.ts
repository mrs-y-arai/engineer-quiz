import { QuizRepository } from '../repositories/QuizRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { OptionRepository } from '../repositories/OptionRepository';

export const QuizService = () => {
  const quizRepository = QuizRepository();
  const questionRepository = QuestionRepository();
  const optionRepository = OptionRepository();

  /**
   * クイズ1つ分のまとまりを取得する
   */
  const getQuizWithQuestionsAndOptions = async (id: number) => {
    const quiz = await quizRepository.findById(id);
    const questions = await questionRepository.findByQuizId(id);

    const questionWithOptions = await Promise.all(
      questions.map(async (question) => {
        const options = await optionRepository.findByQuestionId(question.id);
        return {
          id: question.id,
          content: question.content,
          options,
        };
      }),
    );

    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: questionWithOptions,
    };
  };

  return {
    getQuizWithQuestionsAndOptions,
  };
};
