import { CREATED_YEAR } from '~/constants';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  const copyRightYear = () => {
    if (year === CREATED_YEAR) return year;

    return `${CREATED_YEAR} - ${year}`;
  };

  return (
    <>
      <footer className="border-t px-5 pb-24 pt-3 text-center">
        <nav className="mb-2">
          <ul className="flex justify-center gap-x-2">
            <li className="text-sm">
              <Link className="underline" href="/terms">
                利用規約
              </Link>
            </li>
            <li className="text-sm">
              <Link
                className="underline"
                href="https://smz97hiro.xsrv.jp/contact/"
                target="_blank"
                rel="noopener noreferrer"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
        <small>&copy; {copyRightYear()} Yuki Arai</small>
      </footer>
    </>
  );
}
