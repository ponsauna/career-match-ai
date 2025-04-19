// src/app/layout.tsx
import './globals.css';
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
      {/* bg-gray-50 と text-gray-800 をここに */}
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-1 w-full max-w-screen-lg mx-auto px-4 sm:px-8 md:px-24 py-8 sm:py-16 md:py-24">
          {children}
        </main>
        <footer className="bg-white shadow-inner py-4">
          <div className="container mx-auto text-center text-gray-600">
            © {new Date().getFullYear()} Career Match AI. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
