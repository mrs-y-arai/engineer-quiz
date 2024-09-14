import { createClient } from '~/lib/supabase/supabaseServer';
import { TablesUpdate, type TablesInsert } from '~/../supabase/database.types';
import { SUPABASE_ERROR_CODE } from '~/constants/supabaseErrorCode';

export const QuizRepository = () => {
  const findById = async (id: number) => {
    const { data, error } = await createClient()
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === SUPABASE_ERROR_CODE.NO_DATA) {
        return null;
      }
      throw new Error(error.message);
    }

    return data;
  };

  const findByUserId = async (userId: string, limit: number = 100) => {
    const { data, error } = await createClient()
      .from('quizzes')
      .select('*')
      .eq('user_id', userId)
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findAll = async (limit: number = 10) => {
    const { data, error } = await createClient()
      .from('quizzes')
      .select('*')
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const create = async (value: TablesInsert<'quizzes'>) => {
    const { data, error } = await createClient()
      .from('quizzes')
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

  const update = async (id: number, value: TablesUpdate<'quizzes'>) => {
    const { data, error } = await createClient()
      .from('quizzes')
      .update(value)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
    };
  };

  return {
    findById,
    findByUserId,
    findAll,
    create,
    update,
  };
};
