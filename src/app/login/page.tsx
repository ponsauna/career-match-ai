// src/app/login/page.tsx
'use client';

import React, { useState, FormEvent, Suspense, useEffect } from "react";
import { createBrowserSupabase } from "@/utils/supabase/client";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";  // 👁 アイコン用
import { useRouter, useSearchParams } from "next/navigation";

const supabase = createBrowserSupabase();

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("ログイン成功！");
      // router.pushはuseEffectで実行
    }
  };

  // ログイン成功時に自動でHomeへ遷移
  useEffect(() => {
    if (message === "ログイン成功！") {
      setTimeout(() => {
        router.push("/");
      }, 500); // 0.5秒後に遷移（即時でもOK）
    }
  }, [message, router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-8 w-full max-w-md">
        {/* ログイン必須メッセージ */}
        {searchParams.get("redirect") && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 border border-yellow-300 rounded text-center text-sm font-semibold">
            このページを閲覧するにはログインが必要です
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6 text-center">ログイン</h1>

        {/* ナビゲーション */}
        <div className="flex justify-between mb-8 text-sm">
          <Link href="/signup" className="text-blue-600 hover:underline">
            アカウント作成
          </Link>
          <a href="#" className="text-blue-600 hover:underline">
            パスワードを忘れた方
          </a>
        </div>

        {/* フォーム */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-base font-medium mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full p-5 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="email"
            />
          </div>

          {/* パスワード */}
          <div>
            <label htmlFor="password" className="block text-base font-medium mb-2">
              パスワード
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="パスワード"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full p-5 pr-14 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="current-password"
              />
              {/* 👁 アイコンボタン */}
              <button
                type={"button" as const}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center"
                aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示する"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* 送信 */}
          <button
            type={"submit" as const}
            className="w-full py-5 bg-blue-600 text-white rounded font-semibold tracking-wide text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            ログイン
          </button>
        </form>

        {/* メッセージ */}
        {message && (
          <p
            className={`mt-8 text-center rounded-md px-4 py-3 font-semibold ${
              message.includes("成功")
                ? "bg-green-50 text-green-700 border border-green-300"
                : "bg-red-50 text-red-600 border border-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}
