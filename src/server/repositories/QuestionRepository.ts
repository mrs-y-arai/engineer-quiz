import { supabaseServer } from '~/lib/supabase/supabaseServer';

export const QuestionRepository = () => {
  const findById = async (id: number) => {
    const { data, error } = await supabaseServer
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
    const { data, error } = await supabaseServer
      .from('questions')
      .select('*')
      .eq('quiz_id', quizId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findAll = async () => {
    const { data, error } = await supabaseServer.from('questions').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return {
    findById,
    findByQuizId,
    findAll,
  };
};
