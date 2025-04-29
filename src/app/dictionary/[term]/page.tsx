import { categorizedDictionary } from "../data";
import Link from "next/link";

type Props = {
  params: { term: string };
};

export default function DictionaryTermPage({ params }: Props) {
  const decodedTerm = decodeURIComponent(params.term);

  // termを検索
  let foundEntry: { term: string; description: string } | null = null;
  let foundCategory: string | null = null;
  for (const [category, entries] of Object.entries(categorizedDictionary)) {
    for (const entry of entries) {
      if (entry.term === decodedTerm) {
        foundEntry = entry;
        foundCategory = category;
        break;
      }
    }
    if (foundEntry) break;
  }

  if (!foundEntry) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white rounded shadow p-8 max-w-xl w-full text-center">
          <h1 className="text-2xl font-bold mb-4">職種詳細</h1>
          <p className="text-lg text-gray-700 mb-2">
            「{decodedTerm}」に該当する職種がありません。
          </p>
          <Link href="/dictionary" className="text-blue-600 hover:underline">
            辞書一覧に戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded shadow p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">{foundEntry.term}</h1>
        <div className="mb-2 text-gray-600">カテゴリ: <span className="font-semibold">{foundCategory}</span></div>
        <div className="text-lg text-gray-800 mb-6">{foundEntry.description}</div>
        <Link href="/dictionary" className="text-blue-600 hover:underline">
          辞書一覧に戻る
        </Link>
      </div>
    </main>
  );
}
