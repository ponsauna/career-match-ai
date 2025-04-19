// src/app/Header.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserSupabase } from "../utils/supabase/client";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabase();
    // 初期セッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    // 認証状態が変わったら再設定
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );
    return () => void listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { href: "/", label: "ホーム", show: true },
    { href: "/dictionary", label: "外資企業職種辞書", show: true },
    { href: "/gaishishokushu-match", label: "外資職種マッチ", show: true },
    { href: "/login", label: "ログイン", show: !isLoggedIn },
    // サインアップは非表示
  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* ロゴ */}
        <Link
          href="/"
          className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Career Match AI
        </Link>

        {/* ナビ */}
        <nav>
          <ul
            className="
              flex flex-col gap-2
              sm:flex-row sm:gap-6
              items-start sm:items-center
            "
          >
            {menuItems
              .filter(item => item.show)
              .map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={e => {
                      if (!isLoggedIn && item.href !== "/login") {
                        e.preventDefault();
                        if (window.confirm("このページを閲覧するにはログインが必要です。ログインページへ移動しますか？")) {
                          router.push("/login?redirect=" + item.href);
                        }
                      }
                    }}
                    className={`
                      block px-2 py-1 text-sm font-medium rounded
                      transition-colors
                      ${
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }
                    `}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="
                    block px-2 py-1 text-sm font-medium rounded
                    text-gray-700 hover:text-blue-600 hover:bg-gray-50
                    transition-colors
                  "
                >
                  ログアウト
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
