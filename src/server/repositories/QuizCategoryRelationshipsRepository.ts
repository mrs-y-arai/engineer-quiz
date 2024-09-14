import { createClient } from '~/lib/supabase/supabaseServer';
import { SUPABASE_ERROR_CODE } from '~/constants/supabaseErrorCode';
import { type TablesInsert } from '~/../supabase/database.types';

export const QuizCategoryRelationshipsRepository = () => {
  const create = async (
    values: TablesInsert<'quizzes_categories_relationships'>,
  ) => {
    const { data, error } = await createClient()
      .from('quizzes_categories_relationships')
      .insert({
        quiz_id: values.quiz_id,
        category_id: values.category_id,
        user_id: values.user_id,
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
