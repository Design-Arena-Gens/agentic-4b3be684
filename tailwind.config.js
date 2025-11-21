/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefaff",
          100: "#d8f1ff",
          200: "#b6e6ff",
          300: "#84d6ff",
          400: "#49bdff",
          500: "#1ea0ff",
          600: "#0b82f5",
          700: "#0868ce",
          800: "#0a56a3",
          900: "#0d487f"
        }
      }
    },
  },
  plugins: [],
};

