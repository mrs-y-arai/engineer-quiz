'use client';

import { MenuIcon } from '~/components/icons/Menu';
import { MinusIcon } from '~/components/icons/Minus';
import { Button } from '../ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '~/lib/utils';
import { Logout } from '~/components/Logout';

export function HamburgerMenu({
  isAuthenticated,
  className,
}: {
  isAuthenticated: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={cn('absolute', className)}>
        {isOpen ? (
          <Button
            onClick={closeMenu}
            variant="plain"
            size="icon"
            aria-controls="navigation"
            aria-expanded={isOpen}
            aria-label="メニューを閉じる"
          >
            <MinusIcon className="size-8" />
            <span className="sr-only">Close navigation menu</span>
          </Button>
        ) : (
          <Button
            onClick={openMenu}
            variant="plain"
            size="icon"
            aria-controls="navigation"
            aria-expanded={isOpen}
            aria-label="メニューを開く"
          >
            <MenuIcon className="size-8" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        )}
      </div>
      <div
        onClick={closeMenu}
        className={cn(
          `fixed left-0 top-0 z-menu-overlay h-screen w-screen bg-gray-strong/50 transition-all duration-500`,
          isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full',
        )}
      ></div>
      <div
        className={cn(
          'fixed right-0 top-0 z-menu block h-screen w-72 transform bg-gray-strong p-4 pt-10 text-white transition-all duration-500',
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full',
        )}
      >
        <Button
          className="absolute right-4 top-4"
          size="icon"
          variant="plain"
          onClick={closeMenu}
          aria-controls="navigation"
          aria-expanded={isOpen}
          aria-label="メニューを閉じる"
        >
          <MinusIcon className="size-8" />
          <span className="sr-only">Close navigation menu</span>
        </Button>
        <div className="mb-6 flex flex-col gap-4">
          <Link
            prefetch={true}
            onClick={closeMenu}
            className="text-white"
            href="/"
          >
            トップ
          </Link>
          <Link
            prefetch={true}
            onClick={closeMenu}
            className="text-white"
            href="/mypage/quiz-setting/register"
          >
            クイズを作る
          </Link>
          <Link
            prefetch={true}
            onClick={closeMenu}
            className="text-white"
            href="/#quiz-list"
          >
            クイズ一覧
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                prefetch={true}
                onClick={closeMenu}
                className="text-white"
                href="/mypage"
              >
                マイページ
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link
                prefetch={true}
                onClick={closeMenu}
                className="text-white"
                href="/login"
              >
                ログイン/新規作成
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
