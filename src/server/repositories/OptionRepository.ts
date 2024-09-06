import { createClient } from '~/lib/supabase/supabaseServer';
import { type TablesInsert } from '~/../supabase/database.types';

export const OptionRepository = () => {
  const findById = async (id: number) => {
    const { data, error } = await createClient()
      .from('options')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findByQuestionId = async (questionId: number) => {
    const { data, error } = await createClient()
      .from('options')
      .select('*')
      .eq('question_id', questionId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findAll = async () => {
    const { data, error } = await createClient().from('options').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const create = async (value: TablesInsert<'options'>) => {
    const { data, error } = await createClient()
      .from('options')
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
    findByQuestionId,
    findAll,
    create,
  };
};
