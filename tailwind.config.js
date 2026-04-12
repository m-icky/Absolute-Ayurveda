/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        cream: "#F8F6F0",
        olive: {
          DEFAULT: "#6B7C5B",
          dark: "#4a5740",
        },
        gold: {
          DEFAULT: "#C9B79C",
          light: "#E8DCCF",
        },
        text: {
          DEFAULT: "#1A1A1A",
          muted: "#6B6B6B",
          light: "#A0A0A0",
        },
        border: "#E2DADA",
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.3em",
      },
    },
  },
  plugins: [],
};
