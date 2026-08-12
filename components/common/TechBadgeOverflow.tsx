"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
  tech: string[];
  limit?: number;
  className?: string;
};

export default function TechBadgeOverflow({
  tech,
  limit = 5,
  className = "",
}: Props) {
  if (!tech || tech.length === 0) return null;

  const visible = tech.slice(0, limit);
  const hidden = tech.slice(limit);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {visible.map((t) => (
        <span
          key={t}
          className="text-xs bg-muted px-2 py-0.5 rounded"
        >
          {t}
        </span>
      ))}

      {hidden.length > 0 && (
        <HoverCard openDelay={150} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button
              type="button"
              className="cursor-pointer text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Show ${hidden.length} more technologies`}
            >
              +{hidden.length} more
            </button>
          </HoverCardTrigger>

          <HoverCardContent
            side="top"
            align="start"
            className="w-64"
          >
            <div className="flex flex-wrap gap-2">
              {hidden.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-muted px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
}
