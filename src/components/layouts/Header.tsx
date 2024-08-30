import Link from 'next/link';
import { HamburgerMenu } from '~/components/Menu/HamburgerMenu';

export function Header() {
  return (
    <header className="flex h-[70px] items-center justify-center border-b py-2">
      <Link className="text-xl font-bold" href="/">
        みんなのエンジニアクイズ
      </Link>
      <HamburgerMenu className="absolute right-4 top-4" />
    </header>
  );
}
