import { Button } from '../ui/button';
import Link from 'next/link';

export function FixedMenu() {
  return (
    <>
      <div className="z-fixed-menu fixed bottom-0 left-0 flex h-[60px] w-screen items-center justify-center bg-gray-strong/50 md:h-[70px]">
        <Link
          prefetch={true}
          className="mx-auto block h-[45px] w-[160px]"
          href="/register"
        >
          <Button className="size-full" variant="default" size="lg">
            クイズを作る
          </Button>
        </Link>
      </div>
    </>
  );
}
