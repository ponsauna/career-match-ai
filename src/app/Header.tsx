"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabase } from "../utils/supabase/client";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // ログアウト処理
  const handleLogout = async () => {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    router.push("/login");
  };

  // メニューリスト
  const menuItems = [
    { href: "/", label: "ホーム" },
    { href: "/dictionary", label: "外資企業職種辞書" },
    { href: "/gaishishokushu-match", label: "外資職種マッチ" },
    { href: "/login", label: "ログイン" },
    { href: "/signup", label: "サインアップ" },
  ];

  return (
    <header className="w-full bg-white shadow z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold">
          <Link href="/" className="hover:underline">Career Match AI</Link>
        </h1>
        {/* PCメニュー */}
        <nav className="hidden sm:block">
          <ul className="flex flex-row gap-4 items-center">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block px-4 py-2 rounded hover:bg-gray-100 text-center">{item.label}</Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 rounded text-blue-600 hover:bg-gray-100 text-center"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                ログアウト
              </button>
            </li>
          </ul>
        </nav>
        {/* ハンバーガーアイコン（スマホ） */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-100"
          aria-label="メニューを開く"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block w-6 h-0.5 bg-gray-800 mb-1 rounded transition-all"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1 rounded transition-all"></span>
          <span className="block w-6 h-0.5 bg-gray-800 rounded transition-all"></span>
        </button>
      </div>
      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-40 z-50" onClick={() => setMenuOpen(false)}>
          <nav
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-4 text-2xl text-gray-600 hover:text-gray-900"
              aria-label="メニューを閉じる"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <ul className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 rounded hover:bg-gray-100 text-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="block px-4 py-2 rounded text-blue-600 hover:bg-gray-100 text-lg text-left"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  ログアウト
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
