"use client"; // Indica che questo componente funziona solo sul lato client

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Importa le icone da lucide-react

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Controllo iniziale del tema
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme); // Salva il tema nel localStorage
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-white bg-gray-800 rounded-full"
    >
      {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;
