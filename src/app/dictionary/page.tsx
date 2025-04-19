// src/app/dictionary/page.tsx
import React from "react";
import { categorizedDictionary } from "./data";

export default function DictionaryPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 leading-snug">
        外資系企業で使われる職種用語辞書
      </h1>

      {Object.entries(categorizedDictionary).map(([category, entries]) => (
        <section key={category} className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
            {category}
          </h2>
          {/* グリッドでカードを並べる */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-5 transition-transform hover:scale-[1.02] hover:shadow-md"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {entry.term}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <footer className="mt-12 text-center text-sm text-gray-500">
        ※ この辞書は外資系企業で使われる職種用語をわかりやすくまとめた参考資料です。
      </footer>
    </main>
  );
}
