// ========= src/app/dictionary/page.tsx =========
import React from "react";
import { categorizedDictionary } from "./data";

export default function DictionaryPage() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-16 drop-shadow-sm">
        外資系企業で使われる職種用語辞書
      </h1>

      {/* カテゴリーごとに“大きなカード” */}
      <div className="space-y-16">
        {Object.entries(categorizedDictionary).map(([category, entries]) => (
          <section key={category} className="mx-auto max-w-5xl card-category">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {entries.map((entry, idx) => (
                <article key={idx} className="card-term group relative">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{entry.term}</h3>
                  <p className="text-gray-600 leading-relaxed">{entry.description}</p>
                  <span className="card-outline"></span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-20 text-center text-sm text-gray-500">
        ※ この辞書は外資系企業で使われる職種用語をわかりやすくまとめた参考資料です。
      </footer>
    </main>
  );
}
