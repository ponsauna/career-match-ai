// src/app/dictionary/page.tsx
import React from 'react';
import { categorizedDictionary } from './data';

export default function DictionaryPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>外資系企業でよく使われる職種用語辞書</h1>

      {Object.entries(categorizedDictionary).map(([category, entries]) => (
        <section key={category} style={styles.section}>
          <h2 style={styles.category}>{category}</h2>
          {/* グリッド風にカードを並べる */}
          <div style={styles.gridContainer}>
            {entries.map((entry, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{entry.term}</h3>
                <p style={styles.cardDescription}>{entry.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <footer style={styles.footer}>
        ※ この辞書は外資系企業で使われる職種用語をわかりやすくまとめた参考資料です。
      </footer>
    </main>
  );
}

// スタイル定義（オブジェクト形式：Reactのinline styleとして適用）
const styles: { [key: string]: React.CSSProperties } = {
  main: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fafafa', 
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '32px',
    lineHeight: 1.3,
  },
  section: {
    marginBottom: '40px',
  },
  category: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '16px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '8px',
  },
  // カードを並べるためのコンテナ
  gridContainer: {
    display: 'grid',
    gap: '20px',
    // モバイルは1列、幅が広い画面では2列にしたい場合↓
    gridTemplateColumns: '1fr', // デフォルト1カラム
    // 画面幅に応じて変えたいなら responsive が必要ですが、
    // inline style では難しいのでここでは 1カラム固定にしています。
    // もし複数カラムにしたければこちらを有効化:
    // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
  // 個々のカード（記事）
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '16px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  cardDescription: {
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: '#555',
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#555',
  },
};
