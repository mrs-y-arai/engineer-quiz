import { supabaseServer } from '~/lib/supabase/supabaseServer';

export const QuizCategoryRelationship = () => {
  const create = async (quizId: number, categoryId: number) => {
    const { data, error } = await supabaseServer
      .from('quizzes_categories_relationships')
      .insert({
        quiz_id: quizId,
        category_id: categoryId,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return { create };
};
