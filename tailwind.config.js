/** @type {import('tailwindcss').Config} */
module.exports = {
  // ▼ JSX / TSX / MDX が存在するフォルダをすべて列挙
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  // ▼ デフォルト値を壊さないように extend だけ使う
  theme: {
    extend: {
      /* 追加カスタムがあればここへ */
      // 例:
      // borderRadius: { '3xl': '1.5rem' },
    },
  },
  plugins: [],
};
