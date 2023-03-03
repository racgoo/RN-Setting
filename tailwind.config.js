/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,jsx,tsx,ttf}',
    "./src/**/*.{js,ts,jsx,tsx,ttf}",
    "./src/**/**/*.{js,ts,jsx,tsx,ttf}",
    "./src/**/**/**/*.{js,ts,jsx,tsx,ttf}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ["Pretendard"],
      },
    },
  },
  plugins: [],
}
