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
        "main-purple": "#3b82f6",
        "gray-border": "#525866",
        "main-gray": "#1d1f27",
        "disabled-purple": "#a198d1",
        "secondary-bg": "#343347",
        "card-bg": "#1c1f26",
      },
      boxShadow: {
        "3xl": "0 0px 3px 0 #3b82f6",
      },
    },
  },
  plugins: [],
};
