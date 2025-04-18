// src/app/signup/page.tsx
'use client';

import React, { useState, FormEvent, FC } from 'react';
import { createBrowserSupabase } from '@/utils/supabase/client';
const supabase = createBrowserSupabase();

const SignUpPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('サインアップに成功しました！認証メールを確認してください。');
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">サインアップ</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded
                       hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                       font-semibold tracking-wide"
          >
            サインアップ
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
