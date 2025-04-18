'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type UsageInfo = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD: number;
};

export default function GaishiShokushuMatchPage() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<string>('');
  const [usage, setUsage] = useState<UsageInfo>({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    costUSD: 0,
  });
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/position-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
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
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white rounded shadow p-6">
        <h1 className="text-2xl sm:text-3xl mb-6 font-bold text-center">外資職種マッチ</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base sm:text-lg font-medium mb-1" htmlFor="description">
              仕事内容（3000文字以内）
            </label>
            <textarea
              id="description"
              className="w-full mt-1 p-4 sm:p-3 border border-gray-300 rounded text-base sm:text-lg"
              rows={8}
              maxLength={3000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* 文字数カウンター */}
            <div className="text-right text-sm text-gray-500 mt-1">
              {description.length} / 3000 文字
            </div>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-blue-600 text-white rounded font-semibold text-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition-colors"
            disabled={loading}
          >
            {loading ? '解析中...' : '送信'}
          </button>
        </form>

        {error && <div className="mt-4 text-red-600">{error}</div>}

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-100 rounded text-base text-gray-700">
          <h2 className="font-bold text-lg sm:text-xl mb-3 text-center">コスト・トークン情報</h2>
          <p>
            今回のリクエスト推定コスト:{" "}
            <strong>${usage.costUSD.toFixed(4)}</strong>
          </p>
          <p>
            累計コスト: <strong>${totalCost.toFixed(4)}</strong>
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
