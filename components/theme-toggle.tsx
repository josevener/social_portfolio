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
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => setMounted(true));

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  if (!mounted) {
    return <div className="h-11 w-20 rounded-xl bg-muted/50 animate-fade-in-up opacity-0" />; // Placeholder to avoid layout shift
  }

  const isDark = resolvedTheme === "dark";
  const nextThemeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={nextThemeLabel}
      title={nextThemeLabel}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative h-11 w-20 rounded-xl border p-1 transition-all duration-300",
        "cursor-pointer border-border/60 bg-background/70 shadow-sm hover:border-primary/35 hover:bg-muted/70 hover:shadow-md",
        "animate-fade-in-up opacity-0 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {/* The active thumb gives the current theme a clear visual state. */}
      <div
        className={cn(
          "absolute top-1 h-9 w-9 rounded-lg bg-primary shadow-md transition-all duration-300 ease-spring",
          isDark ? "left-10" : "left-1"
        )}
      />

      {/* Both options remain visible; color and the thumb identify the selected one. */}
      <div className="relative grid h-full w-full grid-cols-2 place-items-center">
        <Sun
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-all duration-300 ease-spring",
            !isDark ? "scale-110 text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        <Moon
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-all duration-300 ease-spring",
            isDark ? "scale-110 text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}
        />
      </div>
      <span className="sr-only">{isDark ? "Dark theme active" : "Light theme active"}</span>
    </button>
  );
}
