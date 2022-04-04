module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "main-bg": "#0F1319",
        "main-purple": "#7362D1",
        "gray-border": "#525866",
        "main-gray": "#1d1f27",
      },
    },
  },
  plugins: [],
};
