"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium ThemeToggle Switch
 * A custom rectangular sliding switch for toggling between light and dark themes.
 * Smoothly transitions a thumb/pill between Sun and Moon states.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-16" />; // Placeholder to avoid layout shift
  }

  const isDark = theme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative h-[30px] w-14 rounded-lg p-1 transition-all duration-300",
        "bg-muted hover:bg-muted/80 border border-border/50 cursor-pointer",
        "active:scale-95 hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {/* Sliding Pill */}
      <div 
        className={cn(
          "absolute h-[22px] w-[22px] rounded-md bg-background shadow-sm transition-all duration-300 ease-spring",
          isDark ? "left-[28px]" : "left-1"
        )}
      />

      {/* Icons */}
      <div className="relative flex h-full w-full items-center justify-between px-1">
        <Sun 
          className={cn(
            "h-3.5 w-3.5 transition-all duration-500 ease-spring",
            !isDark ? "text-foreground scale-110 rotate-0" : "text-muted-foreground rotate-45 scale-75 group-hover:text-foreground/70"
          )} 
        />
        <Moon 
          className={cn(
            "h-3.5 w-3.5 transition-all duration-500 ease-spring",
            isDark ? "text-foreground scale-110 rotate-0" : "text-muted-foreground -rotate-45 scale-75 group-hover:text-foreground/70"
          )} 
        />
      </div>
    </button>
  );
}