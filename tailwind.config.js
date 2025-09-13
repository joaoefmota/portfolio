/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paragraph: "#31353a",
      },
    },
    screens: {
      sm: { min: "320px", max: "600px" },
      tall: { min: "601px", max: "1024px" },
    },
  },
  plugins: [],
};
