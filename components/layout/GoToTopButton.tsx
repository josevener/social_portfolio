"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // The document owns the scrollbar, so visibility must follow the window position.
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <Button
      size="icon-lg"
      onClick={scrollToTop}
      className="fixed right-4 bottom-24 z-50 cursor-pointer rounded-full shadow-lg transition hover:scale-105 sm:right-6 sm:bottom-6"
      aria-label="Go to top"
      title="Go to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
