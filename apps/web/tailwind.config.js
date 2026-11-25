/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211B",
        muted: "#5E675F",
        paper: "#F3EFE6",
        card: "#FFFDF8",
        line: "#E3DACE",
        forest: {
          DEFAULT: "#1B4332",
          dark: "#10281E",
          mid: "#2F6B4E",
          soft: "#E5F2EA",
        },
        lime: "#D7F06A",
        clay: "#C45C2A",
        gold: "#8D6A2F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 16px 40px rgba(23, 33, 27, 0.06)",
      },
    },
  },
  plugins: [],
};
