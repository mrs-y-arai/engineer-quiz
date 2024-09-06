'use server';

import { createClient } from '~/lib/supabase/supabaseServer';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
};
