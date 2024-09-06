import Link from 'next/link';
import { HamburgerMenu } from '~/components/Menu/HamburgerMenu';
import { AuthRepository } from '~/server/repositories/AuthRepository';

export async function Header() {
  const isAuthenticated = await AuthRepository().checkHasAuthenticated();

  return (
    <header className="flex h-[70px] items-center justify-center border-b py-2">
      <Link className="text-xl font-bold" href="/">
        みんなのエンジニアクイズ
      </Link>
      <HamburgerMenu
        isAuthenticated={isAuthenticated}
        className="absolute right-4 top-4"
      />
    </header>
  );
}
