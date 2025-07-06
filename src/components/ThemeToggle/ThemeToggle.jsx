import React from "react";
import useTheme from "../../hooks/useTheme.js";
import { Sun, Moon } from "lucide-react";
import "./ThemeToggle.css"; 

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="toggle-theme-btn"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      style={{
        color: theme === "dark" ? "#FAFAFA" : "#121212",
      }}
      title={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;
