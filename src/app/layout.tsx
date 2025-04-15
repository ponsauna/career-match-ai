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
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">
              <Link href="/">Career Match AI</Link>
            </h1>
            <nav>
              <ul className="flex space-x-6">
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
        <main>{children}</main>
        <footer className="bg-white text-center py-4 mt-8 shadow">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Career Match AI. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
