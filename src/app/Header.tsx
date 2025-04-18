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
    <header>
      <div className="container header-inner">
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>
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
            <li>
              <Link href="/login">ログイン</Link>
            </li>
            <li>
              <Link href="/signup">サインアップ</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#0070f3", cursor: "pointer", padding: 0 }}>
                ログアウト
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
