'use server';
import {
  QuizFormState,
  quizFormSchema,
  QUIZ_STATUS_ITEM,
} from '~/types/QuizForm';
import { QuizService } from '~/server/services/QuizService';
import { AuthRepository } from '~/server/repositories/AuthRepository';

export const createQuestion = async (
  _state: QuizFormState,
  formData: FormData,
): Promise<QuizFormState> => {
  const user = await AuthRepository().getUser();
  if (!user) {
    return {
      message: 'ログインしてください',
      isSuccess: false,
    };
  }

  const questionsFormData = formData.getAll('question');
  const mappedQuestions = questionsFormData.map((question, questionIndex) => {
    const options = formData.getAll(`option_${questionIndex + 1}`);
    const mappedOptions = options.map((option, optionIndex) => {
      const optionCheck = formData.get(
        `question_${questionIndex + 1}_option_${optionIndex + 1}_check`,
      );
      return {
        content: option,
        isCorrect: optionCheck,
      };
    });

    return {
      content: question,
      options: mappedOptions,
    };
  });

  const categoryId = formData.get('categoryId')
    ? Number(formData.get('categoryId'))
    : undefined;

  const status = formData.get('status');

  // ユーザースキーマによるバリデーション
  const validatedFields = quizFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    questions: mappedQuestions,
    categoryId,
    status,
  });

  if (!validatedFields.success) {
    // あまりしたくないが、アサーションしてる
    const formattedErrors =
      validatedFields.error.format() as QuizFormState['errors'];
    return {
      message: 'Missing Fields. Failed to Create Question.',
      errors: formattedErrors,
    };
  }

  const { createQuizWithQuestionsAndOptions } = QuizService();
  const result = await createQuizWithQuestionsAndOptions({
    userId: user.id,
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    questions: validatedFields.data.questions,
    categoryId: validatedFields.data.categoryId,
    isPublished: validatedFields.data.status === QUIZ_STATUS_ITEM.PUBLISHED,
  });

  return {
    message: 'Success',
    isSuccess: true,
    quiz: {
      id: result.id,
      title: result.title,
    },
  };
};
