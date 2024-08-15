import { createClient } from '@supabase/supabase-js';
import { Database } from '~/../supabase/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ?? '';

if (supabaseUrl === '' || supabaseServiceKey === '') {
  throw new Error(
    `supabaseUrl or supabaseServiceKey not set for Server - ${supabaseServiceKey}`,
  );
}

// Create a single supabase client for interacting with your database
export const supabaseServer = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
);
