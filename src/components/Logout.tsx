'use client';

import { Button } from '~/components/ui/button';
import { logout } from '~/actions/logout';

export function Logout() {
  return (
    <form action={logout}>
      <Button variant="outline" className="mx-auto" type="submit">
        ログアウト
      </Button>
    </form>
  );
}
