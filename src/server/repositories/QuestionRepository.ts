import { createClient } from '~/lib/supabase/supabaseServer';
import { type TablesInsert } from '~/../supabase/database.types';

export const QuestionRepository = () => {
  const findById = async (id: number) => {
    const { data, error } = await createClient()
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findByQuizId = async (quizId: number) => {
    const { data, error } = await createClient()
      .from('questions')
      .select('*')
      .eq('quiz_id', quizId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findAll = async () => {
    const { data, error } = await createClient().from('questions').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const create = async (value: TablesInsert<'questions'>) => {
    const { data, error } = await createClient()
      .from('questions')
      .insert({
        ...value,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return {
    findById,
    findByQuizId,
    findAll,
    create,
  };
};
