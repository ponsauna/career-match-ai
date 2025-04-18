// src/app/layout.tsx
import './globals.css'; // Tailwind + カスタムグローバルCSSを含む
import type { Metadata } from 'next';
import Header from './Header';

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
        <Header />

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
