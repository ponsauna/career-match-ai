// src/app/login/page.tsx
'use client';

import React, { useState, FormEvent } from "react";
import { createBrowserSupabase } from "@/utils/supabase/client";
import Link from "next/link";

const supabase = createBrowserSupabase();

export default function LoginPage() {
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
      // 例: リダイレクトするならここで
      // window.location.href = '/';
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">ログイン</h1>
        <div className="flex justify-between mb-6 text-sm">
          <Link href="/signup" className="text-blue-600 hover:underline">アカウント作成</Link>
          <a href="#" className="text-blue-600 hover:underline">パスワードを忘れた方</a>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium mb-1">メールアドレス</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-5 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="email"
              />
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
                className="w-full p-5 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-5 bg-blue-600 text-white rounded font-semibold tracking-wide text-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            ログイン
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
