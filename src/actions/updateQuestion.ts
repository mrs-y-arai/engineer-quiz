'use server';
import { QuizService } from '~/server/services/QuizService';
import { AuthRepository } from '~/server/repositories/AuthRepository';
import { QuizFormState, quizFormSchema } from '~/types/QuizForm';

export const updateQuestion = async (
  state: QuizFormState,
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

  // ユーザースキーマによるバリデーション
  const validatedFields = quizFormSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    questions: mappedQuestions,
    categoryId,
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

  const id = Number(formData.get('id'));
  if (!id) {
    return {
      message: 'Quiz ID is required',
      isSuccess: false,
    };
  }

  const { updateQuizWithQuestionsAndOptions } = QuizService();
  const result = await updateQuizWithQuestionsAndOptions({
    quizId: id,
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    questions: validatedFields.data.questions,
    categoryId: validatedFields.data.categoryId,
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
