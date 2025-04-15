// src/app/dictionary/page.tsx
import React from 'react';
import { categorizedDictionary } from './data';

export default function DictionaryPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        外資系企業でよく使われる職種用語辞書
      </h1>
      {Object.entries(categorizedDictionary).map(([category, entries]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">{category}</h2>
          <div className="space-y-6">
            {entries.map((entry, index) => (
              <article key={index} className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-semibold mb-1">{entry.term}</h3>
                <p className="text-gray-700 leading-relaxed">{entry.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
      <footer className="mt-8 text-center text-sm text-gray-500">
        ※ この辞書は外資系企業で使われる職種用語をわかりやすくまとめた参考資料です。
      </footer>
    </main>
  );
}
