// src/app/page.tsx
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

      // data.result が Markdown 形式で返ってくる想定
      setResult(data.result || '');

      // usage があれば取り出して state に反映
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
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start text-gray-900">
      <div className="max-w-3xl w-full bg-white rounded-md shadow p-6 space-y-6">
        <h1 className="text-3xl font-bold">職歴と求人入力フォーム</h1>

        {/* 入力フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="職歴と求人入力フォーム">
          <div>
            <label className="block text-lg font-medium mb-1" htmlFor="career">
              職務経歴
            </label>
            <textarea
              id="career"
              required
              className="w-full p-3 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-600
                         focus:ring-offset-2 focus:ring-offset-white"
              rows={6}
              placeholder="例: ○○社で営業として3年間勤務し、売上目標達成率120%を実現..."
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1" htmlFor="jd">
              求人内容（JD）
            </label>
            <textarea
              id="jd"
              required
              className="w-full p-3 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-600
                         focus:ring-offset-2 focus:ring-offset-white"
              rows={6}
              placeholder="例: 米系IT企業の営業職で、新規顧客開拓・既存顧客対応を担当..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-md bg-blue-700 text-white font-semibold
                       hover:bg-blue-800 focus:bg-blue-800 focus:outline-none
                       focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                       focus:ring-offset-white transition-colors"
          >
            {loading ? '解析中...' : '送信'}
          </button>
        </form>

        {/* エラー表示 */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md border border-red-300">
            {error}
          </div>
        )}

        {/* AI結果表示（Markdown） */}
        {result && (
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            {/* 👇 ここがポイント：ReactMarkdownをdivで包み classNameをそのdivに付ける */}
            <div className="prose prose-base">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* コストやトークン情報の表示 */}
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-base">
          <h2 className="font-bold text-xl mb-3">コスト・トークン情報</h2>
          <p className="mb-1">
            今回のリクエスト推定コスト:
            <strong className="ml-1 text-gray-900">
              ${usage.costUSD.toFixed(4)}
            </strong>
          </p>
          <p className="mb-1">
            累計コスト:
            <strong className="ml-1 text-gray-900">
              ${totalCost.toFixed(4)}
            </strong>
          </p>
          <div className="mt-2 space-y-1">
            <p>Prompt tokens: {usage.promptTokens}</p>
            <p>Completion tokens: {usage.completionTokens}</p>
            <p>Total tokens: {usage.totalTokens}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
