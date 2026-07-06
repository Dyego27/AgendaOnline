"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="
        flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9
        rounded-full transition-colors duration-200 flex-shrink-0
        bg-zinc-200 hover:bg-zinc-300
        dark:bg-zinc-800 dark:hover:bg-zinc-700
      "
    >
      {isDark ? (
        <Sun size={15} className="text-zinc-200" />
      ) : (
        <Moon size={15} className="text-zinc-600" />
      )}
    </button>
  );
}