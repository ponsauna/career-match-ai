"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "../utils/supabase/client";

export default function Header() {
  const router = useRouter();

  // ログアウト処理
  const handleLogout = async () => {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">
          <Link href="/" className="hover:underline">Career Match AI</Link>
        </h1>
        <nav className="w-full sm:w-auto">
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full">
            <li className="w-full sm:w-auto">
              <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-100 text-center">ホーム</Link>
            </li>
            <li className="w-full sm:w-auto">
              <Link href="/dictionary" className="block px-3 py-2 rounded hover:bg-gray-100 text-center">外資企業職種辞書</Link>
            </li>
            <li className="w-full sm:w-auto">
              <Link href="/gaishishokushu-match" className="block px-3 py-2 rounded hover:bg-gray-100 text-center">外資職種マッチ</Link>
            </li>
            <li className="w-full sm:w-auto">
              <Link href="/login" className="block px-3 py-2 rounded hover:bg-gray-100 text-center">ログイン</Link>
            </li>
            <li className="w-full sm:w-auto">
              <Link href="/signup" className="block px-3 py-2 rounded hover:bg-gray-100 text-center">サインアップ</Link>
            </li>
            <li className="w-full sm:w-auto">
              <button
                onClick={handleLogout}
                className="block w-full px-3 py-2 rounded text-blue-600 hover:bg-gray-100 text-center"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                ログアウト
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
