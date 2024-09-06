import { createClient } from '~/lib/supabase/supabaseServer';
import { redirect } from 'next/navigation';
import { Button } from '~/components/ui/button';

export default function LoginPage() {
  const signInWithTwitter = async () => {
    'use server';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');
    const { data, error } = await createClient().auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: `${baseUrl}/api/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    redirect(data.url);
  };

  return (
    <>
      <h1 className="mb-4 text-center text-xl font-bold">ログイン</h1>
      <form action={signInWithTwitter}>
        <Button
          className="mx-auto bg-[rgba(0,0,0,1)] hover:bg-[rgba(0,0,0,0.8)]"
          type="submit"
        >
          X(Twitter) Login
        </Button>
      </form>
    </>
  );
}
