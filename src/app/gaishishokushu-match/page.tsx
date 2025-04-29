'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { categorizedDictionary } from '../dictionary/data';
import Link from 'next/link';

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

  // 職種名をリンクに変換する関数
  // 全角スペース→半角スペース、全角括弧→半角括弧、前後空白除去
  function normalize(str: string): string {
    return str
      .replace(/　/g, " ")
      .replace(/[（）]/g, (s) => (s === "（" ? "(" : s === "）" ? ")" : s))
      .replace(/\s+/g, " ")
      .trim();
  }

  function replaceTermsWithLinks(text: string): string {
    // すべてのtermをリストアップ
    const terms: string[] = [];
    Object.values(categorizedDictionary).forEach((entries) => {
      entries.forEach((entry) => {
        terms.push(entry.term);
      });
    });
    // 長いtermから順に置換（部分一致防止）
    terms.sort((a, b) => b.length - a.length);

    // 正規化したtermのMap
    const normalizedTermMap = new Map<string, string>();
    terms.forEach((term) => {
      normalizedTermMap.set(normalize(term), term);
    });

    // テキスト内の単語を単語ごとに分割して置換
    // ただし、職種名は複数単語なので、全体を走査して一致部分を置換
    let replaced = text;

    // すでにリンク化されている部分は除外
    // すべてのtermについて、正規化して一致する部分をリンク化
    normalizedTermMap.forEach((originalTerm, normTerm) => {
      // termが正規表現的に特殊文字を含む場合に備えエスケープ
      const escaped = normTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // 既にリンク化されていない場合のみ置換
      replaced = replaced.replace(
        new RegExp(`(?<!\\[)${escaped}(?!\\])`, 'g'),
        `[${originalTerm}](/dictionary/${encodeURIComponent(originalTerm)})`
      );
    });

    // さらに、テキスト内の各行についてもtrimして再度置換（改行混入対策）
    replaced = replaced
      .split('\n')
      .map((line) => {
        const normLine = normalize(line);
        if (normalizedTermMap.has(normLine)) {
          const originalTerm = normalizedTermMap.get(normLine)!;
          return `[${originalTerm}](/dictionary/${encodeURIComponent(originalTerm)})`;
        }
        return line;
      })
      .join('\n');

    return replaced;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white rounded shadow p-4 sm:p-6">
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
              placeholder="例：担当している業務内容、扱っている商材やサービス、顧客層、営業スタイル（新規/既存）、チーム規模、使っているツールやスキルなどを具体的に記載してください。例：『SaaSプロダクトの新規営業、法人顧客向け、5名チーム、Salesforce使用』"
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
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {replaceTermsWithLinks(result)}
            </ReactMarkdown>
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
