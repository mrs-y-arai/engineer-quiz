import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '~/components/layouts/Header';
import { Footer } from '~/components/layouts/Footer';
import { FixedMenu } from '~/components/Menu/FixedMenu';
import { headers } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'みんなのエンジニアクイズ',
  description: 'エンジニアクイズ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url = headers().get('x-url') || '';
  const pathname = new URL(url).pathname;
  const hasFixedMenu = !pathname.startsWith('/mypage/quiz-setting');

  return (
    <html lang="ja">
      <body className={inter.className}>
        {hasFixedMenu && <FixedMenu />}
        <Header />
        <main className="container py-10">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-S3NZN9TX3E" />
    </html>
  );
}
