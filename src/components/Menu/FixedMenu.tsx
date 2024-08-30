import { Button } from '../ui/button';
import Link from 'next/link';

export function FixedMenu() {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-fixed-menu flex h-[60px] w-screen items-center justify-center gap-x-2 bg-gray-strong/50 md:h-[70px]">
        <Link
          prefetch={true}
          className="block h-[45px] w-[160px]"
          href="/register"
        >
          <Button className="size-full" variant="default" size="lg">
            クイズを作る
          </Button>
        </Link>
        <Link
          prefetch={true}
          className="block h-[45px] w-[160px]"
          href="/#quiz-list"
        >
          <Button className="size-full" variant="outline" size="lg">
            クイズ一覧
          </Button>
        </Link>
      </div>
    </>
  );
}
