/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      // 必要なら "./pages/**/*.{js,ts,jsx,tsx}" なども含める
    ],
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "6rem"
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px"
        }
      },
      extend: {},
    },
    plugins: [],
  };
