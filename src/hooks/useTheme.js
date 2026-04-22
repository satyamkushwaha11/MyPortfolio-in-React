import { useCallback, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../config/sessions";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    () => getLocalStorage("theme") || "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    setLocalStorage("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
