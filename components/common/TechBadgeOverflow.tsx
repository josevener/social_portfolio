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
            <span className="text-xs text-muted-foreground cursor-help hover:text-foreground underline-offset-2 hover:underline">
              +{hidden.length} more
            </span>
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