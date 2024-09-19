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
    isPublished: boolean;
  }) => {
    const quiz = await quizRepository.create({
      title: params.title,
      description: params.description,
      user_id: params.userId,
      is_published: params.isPublished,
    });

    await Promise.all([
      ...params.questions.map(async (question) => {
        const resultQuestion = await questionRepository.create({
          content: question.content,
          quiz_id: quiz.id,
          user_id: params.userId,
        });

        await Promise.all(
          question.options.map(async (option) => {
            await optionRepository.create({
              content: option.content,
              is_correct: option.isCorrect,
              question_id: resultQuestion.id,
              user_id: params.userId,
            });
          }),
        );
      }),
      params.categoryId
        ? quizCategoryRelationshipsRepository.create({
            quiz_id: quiz.id,
            category_id: params.categoryId,
            user_id: params.userId,
          })
        : null,
    ]);

    return {
      ok: true,
      id: quiz.id,
      title: quiz.title,
    };
  };

  /**
   * クイズ1つ分のまとまりを更新する
   */
  const updateQuizWithQuestionsAndOptions = async (params: {
    userId: string;
    quizId: number;
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
    const quiz = await quizRepository.findById(params.quizId);
    if (!quiz) throw new Error('Quiz not found');

    const questions = await questionRepository.findByQuizId(params.quizId);

    // クイズの質問・選択肢・カテゴリを削除する
    // リレーションの関係で、options → questions → quizCategoryRelationshipsの順番で削除する。
    await Promise.all([
      questions.map(async (question) => {
        await optionRepository.deleteByQuestionId(question.id);
        await questionRepository.deleteById(question.id);
      }),
    ]);
    await quizCategoryRelationshipsRepository.deleteByQuizId(params.quizId);
    // クイズの質問・選択肢・カテゴリをupdateする
    const [quizResult] = await Promise.all([
      // クイズのタイトルと説明を更新する
      quizRepository.update(params.quizId, {
        title: params.title,
        description: params.description,
      }),
      // クイズの質問と選択肢を更新する
      ...params.questions.map(async (question) => {
        const resultQuestion = await questionRepository.create({
          content: question.content,
          quiz_id: params.quizId,
          user_id: params.userId,
        });

        await Promise.all(
          question.options.map(async (option) => {
            await optionRepository.create({
              content: option.content,
              is_correct: option.isCorrect,
              question_id: resultQuestion.id,
              user_id: params.userId,
            });
          }),
        );
      }),
      // クイズのカテゴリを更新する
      params.categoryId
        ? quizCategoryRelationshipsRepository.create({
            quiz_id: params.quizId,
            category_id: params.categoryId,
            user_id: params.userId,
          })
        : null,
    ]);

    return {
      ok: true,
      id: quizResult.id,
      title: quizResult.title,
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
    updateQuizWithQuestionsAndOptions,
    getAllQuizWithCategory,
  };
};
