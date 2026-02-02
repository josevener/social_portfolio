"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";

type Props = {
  containerRef: RefObject<HTMLDivElement | null>;
};

export default function GoToTopButton({ containerRef }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      setVisible(el.scrollTop > 100);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <Button
      size="icon"
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6 z-50
        rounded-full shadow-lg
        hover:scale-105 transition
      "
      aria-label="Go to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}