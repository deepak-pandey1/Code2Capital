module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // dark base
        accent: "#a855f7",  // purple
        gold: "#facc15",
      },
    },
  },
  plugins: [],
};