import { QuizRepository } from '../repositories/QuizRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { OptionRepository } from '../repositories/OptionRepository';
import { QuizCategoryRelationship } from '../repositories/QuizCategoryRelationship';

export const QuizService = () => {
  const quizRepository = QuizRepository();
  const questionRepository = QuestionRepository();
  const optionRepository = OptionRepository();
  const quizCategoryRelationship = QuizCategoryRelationship();

  /**
   * クイズ1つ分のまとまりを取得する
   */
  const getQuizWithQuestionsAndOptions = async (id: number) => {
    const [quiz, questions] = await Promise.all([
      quizRepository.findById(id),
      questionRepository.findByQuizId(id),
    ]);

    if (!quiz) return null;

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

  /**
   * クイズ1つ分のまとまりを作成する
   */
  const createQuizWithQuestionsAndOptions = async (params: {
    title: string;
    description: string;
    questions: {
      content: string;
      options: {
        content: string;
        isCorrect: boolean;
      }[];
    }[];
    categoryId?: number;
  }) => {
    const quiz = await quizRepository.create({
      title: params.title,
      description: params.description,
    });

    await Promise.all([
      ...params.questions.map(async (question) => {
        const resultQuestion = await questionRepository.create({
          content: question.content,
          quiz_id: quiz.id,
        });

        await Promise.all(
          question.options.map(async (option) => {
            await optionRepository.create({
              content: option.content,
              is_correct: option.isCorrect,
              question_id: resultQuestion.id,
            });
          }),
        );
      }),
      params.categoryId
        ? quizCategoryRelationship.create(quiz.id, params.categoryId)
        : null,
    ]);

    return {
      ok: true,
      id: quiz.id,
    };
  };

  return {
    getQuizWithQuestionsAndOptions,
    createQuizWithQuestionsAndOptions,
  };
};
