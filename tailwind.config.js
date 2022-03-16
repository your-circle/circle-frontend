module.exports = {
  content: [ "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./shared/**/*.{js,ts,jsx,tsx}" ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "main-bg": "#22232D",
        "main-purple": "#7362D1",
        "secondary-bg": "#343347",
        "main-border": "#628CB1"
      },
    },
  },
  plugins: [],
};
