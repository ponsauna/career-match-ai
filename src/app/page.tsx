'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type UsageInfo = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD: number; // 今回のリクエストで消費した推定コスト(USD)
};

export default function Home() {
  // 入力内容
  const [career, setCareer] = useState('');
  const [jd, setJd] = useState('');

  // AI結果表示用
  const [result, setResult] = useState<string>('');

  // 使用状況(今回分)
  const [usage, setUsage] = useState<UsageInfo>({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    costUSD: 0,
  });

  // 累計コスト
  const [totalCost, setTotalCost] = useState(0);

  // ローディング＆エラー
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career, jd }),
      });
      if (!response.ok) {
        throw new Error('ネットワークエラー');
      }
      const data = await response.json();
      setResult(data.result || '');
      if (data.usage) {
        const newUsage: UsageInfo = {
          promptTokens: data.usage.promptTokens || 0,
          completionTokens: data.usage.completionTokens || 0,
          totalTokens: data.usage.totalTokens || 0,
          costUSD: data.usage.costUSD || 0,
        };
        setUsage(newUsage);
        setTotalCost((prev) => prev + newUsage.costUSD);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('不明なエラーが発生しました');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 text-gray-900">
      <div className="w-full max-w-2xl bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          職歴と求人入力フォーム
        </h1>
        
        <form
          onSubmit={handleSubmit}
          aria-label="職歴と求人入力フォーム"
          className="space-y-6"
        >
          <div>
            <label htmlFor="career" className="block text-lg font-medium mb-2">
              職務経歴
            </label>
            <textarea
              id="career"
              required
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              placeholder="例: ○○社で営業として3年間勤務し..."
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>
          <div>
            <label htmlFor="jd" className="block text-lg font-medium mb-2">
              求人内容（JD）
            </label>
            <textarea
              id="jd"
              required
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="例: 米系IT企業の営業職で、新規顧客開拓..."
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            {loading ? '解析中...' : '送信'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded border border-red-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-gray-100 rounded border border-gray-200">
            <ReactMarkdown className="prose prose-base">
              {result}
            </ReactMarkdown>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-100 rounded border border-gray-200">
          <h2 className="text-xl font-bold mb-4">コスト・トークン情報</h2>
          <p className="mb-2">
            今回のリクエスト推定コスト:{' '}
            <strong>${usage.costUSD.toFixed(4)}</strong>
          </p>
          <p className="mb-2">
            累計コスト:{' '}
            <strong>${totalCost.toFixed(4)}</strong>
          </p>
          <div className="space-y-1">
            <p>Prompt tokens: {usage.promptTokens}</p>
            <p>Completion tokens: {usage.completionTokens}</p>
            <p>Total tokens: {usage.totalTokens}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
