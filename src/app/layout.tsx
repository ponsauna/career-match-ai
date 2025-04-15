// src/app/layout.tsx
import './globals.css'; // globals.css が同じ src/app フォルダなら './globals.css'
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Match AI',
  description: 'Career matching service with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* ====== Header ====== */}
        <header>
          <div className="container header-inner">
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
              <Link href="/">Career Match AI</Link>
            </h1>
            <nav>
              <ul>
                <li>
                  <Link href="/">ホーム</Link>
                </li>
                <li>
                  <Link href="/dictionary">外資企業職種辞書</Link>
                </li>
                <li>
                  <Link href="/gaishishokushu-match">外資職種マッチ</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ====== Main ====== */}
        <main className="container">
          {children}
        </main>

        {/* ====== Footer ====== */}
        <footer>
          <div className="container">
            © {new Date().getFullYear()} Career Match AI. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
