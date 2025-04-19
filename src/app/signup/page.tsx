'use client';

import React, { useState, FormEvent } from "react";
import { createBrowserSupabase } from "@/utils/supabase/client";
import Link from "next/link";

const supabase = createBrowserSupabase();

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("サインアップに成功しました！認証メールを確認してください。");
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">サインアップ</h1>
        <div className="flex justify-between mb-6 text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">ログインはこちら</Link>
          <a href="#" className="text-blue-600 hover:underline">パスワードを忘れた方</a>
        </div>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium mb-1">メールアドレス</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-5 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                autoComplete="email"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm1.75-.25 7.72 6.18a2.25 2.25 0 0 0 2.56 0l7.72-6.18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium mb-1">パスワード</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-5 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
              >
                {showPassword ? (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 3l18 18M10.7 10.7A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88M9.53 9.53A3 3 0 0 1 15 12c0 .83-.34 1.58-.88 2.12M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-5 bg-green-600 text-white rounded font-semibold tracking-wide text-lg hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            サインアップ
          </button>
        </form>
        {message && (
          <div className={`mt-6 text-center rounded-md px-4 py-3 font-semibold ${message.includes("成功") ? "bg-green-50 text-green-700 border border-green-300" : "bg-red-50 text-red-600 border border-red-300"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
