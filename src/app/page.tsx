'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type UsageInfo = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD: number;    // 今回のリクエストで消費した推定コスト(USD)
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

  // 累計コスト（画面をリロードすると消えます。永続化したい場合はDBなどを利用してください）
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

        // 累計コストを加算 (リロードするとリセットされます)
        setTotalCost((prev) => prev + newUsage.costUSD);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('不明なエラーが発生しました');
      }
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white rounded shadow p-6">
        <h1 className="text-2xl mb-4 font-bold">職歴と求人入力フォーム</h1>

        {/* 入力フォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="career">
              職務経歴
            </label>
            <textarea
              id="career"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows={4}
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="jd">
              求人内容（JD）
            </label>
            <textarea
              id="jd"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows={4}
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? '解析中...' : '送信'}
          </button>
        </form>

        {/* エラー表示 */}
        {error && <div className="mt-4 text-red-600">{error}</div>}

        {/* AI結果表示（Markdown） */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}

        {/* コストやトークン情報の表示 */}
        <div className="mt-6 p-4 bg-gray-100 rounded text-sm text-gray-700">
          <h2 className="font-bold mb-2">コスト・トークン情報</h2>
          <p>今回のリクエスト推定コスト: <strong>${usage.costUSD.toFixed(4)}</strong></p>
          <p>累計コスト: <strong>${totalCost.toFixed(4)}</strong></p>

          <div className="mt-2">
            <p>Prompt tokens: {usage.promptTokens}</p>
            <p>Completion tokens: {usage.completionTokens}</p>
            <p>Total tokens: {usage.totalTokens}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
