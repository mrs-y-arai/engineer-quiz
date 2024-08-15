import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-center border-b py-6">
      <Link className="text-xl font-bold" href="/" prefetch={true}>
        Quiz App
      </Link>
    </header>
  );
}
