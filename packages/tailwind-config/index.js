/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/App.tsx"],
  theme: {
    extend: {
      colors: {
        "lite-green": "#53E88B",
        "dark-green": "#15BE77",
        "lite-gray": "#D9D9D9",
        "bg-color": "#F9F9F9",
        dark: "#3B3B3B",
      },
    },
  },
  plugins: [],
}
