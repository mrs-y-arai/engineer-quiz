import { supabaseServer } from '~/lib/supabase/supabaseServer';

export const CategoryRepository = () => {
  const findAll = async (limit: number = 100) => {
    const { data, error } = await supabaseServer
      .from('categories')
      .select('*')
      .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const findById = async (id: number) => {
    const { data, error } = await supabaseServer
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return { findAll, findById };
};
