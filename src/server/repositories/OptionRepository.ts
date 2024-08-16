import { supabaseServer } from '~/lib/supabase/supabaseServer';

export const OptionRepository = () => {
  const findById = async (id: number) => {
    const { data, error } = await supabaseServer
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
    const { data, error } = await supabaseServer
      .from('options')
      .select('*')
      .eq('question_id', questionId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findAll = async () => {
    const { data, error } = await supabaseServer.from('options').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return {
    findById,
    findByQuestionId,
    findAll,
  };
};
