import { createClient } from '~/lib/supabase/supabaseServer';
import { SUPABASE_ERROR_CODE } from '~/constants/supabaseErrorCode';

export const QuizCategoryRelationshipsRepository = () => {
  const create = async (quizId: number, categoryId: number) => {
    const { data, error } = await createClient()
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

  const findByQuizId = async (quizId: number) => {
    const { data, error } = await createClient()
      .from('quizzes_categories_relationships')
      .select('*')
      .eq('quiz_id', quizId)
      .single();

    if (error) {
      if (error.code === SUPABASE_ERROR_CODE.NO_DATA) {
        return null;
      }

      throw new Error(error.message);
    }

    return data;
  };

  const deleteByQuizId = async (quizId: number) => {
    const { error } = await createClient()
      .from('quizzes_categories_relationships')
      .delete()
      .eq('quiz_id', quizId);

    if (error) {
      throw new Error(error.message);
    }
  };

  return { create, findByQuizId, deleteByQuizId };
};
