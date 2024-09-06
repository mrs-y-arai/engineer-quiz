import { createClient } from '~/lib/supabase/supabaseServer';

export const AuthRepository = () => {
  const getUser = async () => {
    const { data, error } = await createClient().auth.getUser();
    if (error) {
      throw new Error(error.message);
    }

    const { data: userData, error: userError } = await createClient()
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    return {
      id: userData.id,
      name: userData.display_name,
    };
  };

  const checkHasAuthenticated = async () => {
    const { data, error } = await createClient().auth.getUser();

    if (error || !data) {
      return false;
    }

    return true;
  };

  return { getUser, checkHasAuthenticated };
};
