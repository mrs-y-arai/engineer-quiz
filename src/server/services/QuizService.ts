import { QuizRepository } from '../repositories/QuizRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { OptionRepository } from '../repositories/OptionRepository';
import { QuizCategoryRelationshipsRepository } from '../repositories/QuizCategoryRelationshipsRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { type QuizList } from '~/types/Quiz';

export const QuizService = () => {
  const quizRepository = QuizRepository();
  const questionRepository = QuestionRepository();
  const optionRepository = OptionRepository();
  const quizCategoryRelationshipsRepository =
    QuizCategoryRelationshipsRepository();
  const categoryRepository = CategoryRepository();

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
    userId: string;
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
      user_id: params.userId,
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
        ? quizCategoryRelationshipsRepository.create(quiz.id, params.categoryId)
        : null,
    ]);

    return {
      ok: true,
      id: quiz.id,
      title: quiz.title,
    };
  };

  /**
   * クイズを取得する
   */
  const getAllQuizWithCategory = async (params?: {
    userId?: string;
  }): Promise<QuizList> => {
    const quizzes = params?.userId
      ? await quizRepository.findByUserId(params.userId)
      : await quizRepository.findAll(100);

    const quizzesWithCategory = await Promise.all(
      quizzes.map(async (quiz) => {
        const quizCategoryRelationship =
          await quizCategoryRelationshipsRepository.findByQuizId(quiz.id);

        if (quizCategoryRelationship) {
          const category = await categoryRepository.findById(
            quizCategoryRelationship.category_id,
          );
          return {
            id: quiz.id,
            title: quiz.title,
            category: {
              id: category.id,
              name: category.name,
            },
          };
        }

        return {
          id: quiz.id,
          title: quiz.title,
          category: null,
        };
      }),
    );

    return quizzesWithCategory;
  };

  return {
    getQuizWithQuestionsAndOptions,
    createQuizWithQuestionsAndOptions,
    getAllQuizWithCategory,
  };
};
