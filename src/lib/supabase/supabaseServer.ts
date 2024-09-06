// import { createClient } from '@supabase/supabase-js';
import { Database } from '~/../supabase/database.types';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ?? '';

if (supabaseUrl === '' || supabaseServiceKey === '') {
  throw new Error(
    `supabaseUrl or supabaseServiceKey not set for Server - ${supabaseServiceKey}`,
  );
}

// Create a single supabase client for interacting with your database
// export const supabaseServer = createServerClient<Database>(
//   supabaseUrl,
//   supabaseServiceKey,
//   {
//     cookies: {
//       get(name) {
//         return cookies().get(name)?.value;
//       },
//     },
//   },
// );

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
