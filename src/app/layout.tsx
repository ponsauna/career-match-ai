// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Match AI',
  description: 'Career matching service with Next.js + OpenAI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-100 text-gray-900">
        {/* ヘッダー */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2">
            {/* ロゴ */}
            <h1 className="text-xl font-bold text-center sm:text-left">
              <Link href="/">Career Match AI</Link>
            </h1>

            {/* ナビゲーション */}
            <nav>
              <ul className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm sm:text-base text-center sm:text-left">
                <li>
                  <Link href="/" className="text-blue-600 hover:underline">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/dictionary" className="text-blue-600 hover:underline">
                    外資企業職種辞書
                  </Link>
                </li>
                <li>
                  <Link href="/gaishishokushu-match" className="text-blue-600 hover:underline">
                    外資職種マッチ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* メイン */}
        <main>{children}</main>

        {/* フッター */}
        <footer className="bg-white text-center py-4 mt-8 shadow">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Career Match AI. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
