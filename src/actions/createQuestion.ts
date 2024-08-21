'use server';
import { z, type ZodFormattedError } from 'zod';
import { QuizService } from '~/server/services/QuizService';

type State = {
  message: string | null;
  errors?: ZodFormattedError<
    {
      title: string;
      description: string;
      questions: {
        content: string;
        options: {
          content: string;
          isCorrect: 'on' | null;
        }[];
      }[];
    },
    string
  >;
};

const schema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  description: z.string().min(1, { message: '説明文は必須です' }),
  questions: z
    .object({
      content: z.string().min(1, { message: '問題文は必須です' }),
      options: z
        .object({
          content: z.string().min(1, { message: '選択肢は必須です' }),
          isCorrect: z
            .enum(['on'])
            .nullable()
            .transform((value) => value === 'on'),
        })
        .array()
        .nonempty({ message: '選択肢は最低1つ以上必要です' })
        .superRefine((val, ctx) => {
          const isCorrectCount =
            val.filter((option) => option.isCorrect).length === 1;
          if (!isCorrectCount) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '正解の選択肢は1つだけです',
            });
          }
        }),
    })
    .array()
    .nonempty({ message: '問題は最低1つ以上必要です' }),
});

export const createQuestion = async (
  state: State,
  formData: FormData,
): Promise<State> => {
  const questionsFormData = formData.getAll('question');
  const mappedQuestions = questionsFormData.map((question, index) => {
    const options = formData.getAll(`option_${index + 1}`);
    const mappedOptions = options.map((option, index) => {
      const optionCheck = formData.get(`question_${index + 1}_option_1_check`);
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

  // ユーザースキーマによるバリデーション
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    questions: mappedQuestions,
  });

  if (!validatedFields.success) {
    // あまりしたくないが、アサーションしてる
    const formattedErrors = validatedFields.error.format() as State['errors'];
    return {
      message: 'Missing Fields. Failed to Create Question.',
      errors: formattedErrors,
    };
  }

  const { createQuizWithQuestionsAndOptions } = QuizService();
  await createQuizWithQuestionsAndOptions({
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    questions: validatedFields.data.questions,
  });

  return { message: 'Success' };
};
