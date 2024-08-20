'use server';
import { z, type ZodFormattedError } from 'zod';

type State = {
  message: string | null;
  errors?: ZodFormattedError<
    {
      title: string;
      description: string;
      questions: {
        question: string;
        optionList: string[];
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
      question: z.string().min(1, { message: '問題文は必須です' }),
      optionList: z
        .string()
        .min(1, { message: '選択肢は必須です' })
        .array()
        .nonempty({ message: '選択肢は最低1つ以上必要です' }),
    })
    .array()
    .nonempty({ message: '問題は最低1つ以上必要です' }),
});

export const createQuestion = async (
  state: State,
  formData: FormData,
): Promise<State> => {
  const questions = formData.getAll('question');
  const questionList = questions.map((question, index) => {
    const options = formData.getAll(`option_${index + 1}`);

    return {
      question,
      optionList: options,
    };
  });

  // ユーザースキーマによるバリデーション
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    questions: questionList,
  });

  if (!validatedFields.success) {
    // あまりしたくないが、アサーションしてる
    const formattedErrors = validatedFields.error.format() as State['errors'];
    return {
      message: 'Missing Fields. Failed to Create Question.',
      errors: formattedErrors,
    };
  }

  // const { title, description, questions } = validatedFields.data;

  return { message: 'Success' };
};
