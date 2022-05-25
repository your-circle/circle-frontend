import { ReactElement, useEffect, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type themeContextType = {
  theme: any;
  updateTheme: (newTheme: string) => void;
};

export const themeContext = createContext<themeContextType>({
  theme: {},
  updateTheme: () => {},
});

export const ThemeProvider = (props: { children: ReactElement }) => {
  const [theme, setTheme] = useLocalStorage<string>("theme", "dark");
  const colorTheme = theme === "dark" ? "light" : "dark";
  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, updateTheme }}>
      {props.children}
    </themeContext.Provider>
  );
};
