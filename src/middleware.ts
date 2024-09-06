import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '~/lib/supabase/supabaseServer';

const protectedRoutes = ['/register', 'mypage'];

export async function middleware(request: NextRequest) {
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  // サーバーコンポーネントに、現在のURLをheader経由で返す
  // @see https://qiita.com/P-man_Brown/items/3d0e0ad09db568848367
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
