import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TechBadgeOverflow from "../common/TechBadgeOverflow";

type Props = {
  title: string;
  description: string;
  tech: string[];
  slug?: string;
  type?: "post" | "project";
  tags?: string[];
  liveUrl?: string;
  image?: string;
};

export default function PostCard({
  title,
  description,
  tech,
  slug,
  type,
  tags,
  liveUrl,
  image,
}: Props) {
  // These labels keep the card CTA language plain and consistent across sections.
  const detailLabel = type === "project" ? "View case study" : "Read article";
  const eyebrowLabel = type === "project" ? "Project" : "Blog";
  const isBlog = type === "post";

  const cardInner = (
    <Card
      className={`group flex h-full flex-col overflow-hidden border-border/70 bg-background/78 backdrop-blur-xl ${
        slug ? "cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl" : ""
      }`}
    >
      {image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge className="rounded-full border-white/20 bg-black/45 px-3 py-1 text-[11px] text-white hover:bg-black/45">
              {eyebrowLabel}
            </Badge>
          </div>
        </div>
      )}

      {!image && (
        <div className="border-b border-border/60 bg-gradient-to-br from-primary/[0.08] via-background to-background px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px]">
              {eyebrowLabel}
            </Badge>
            {liveUrl && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ExternalLink className="h-3.5 w-3.5" />
                Live
              </span>
            )}
          </div>
        </div>
      )}

      <CardHeader className="space-y-4 pb-3">
        <div className="space-y-2">
          <h3
            className={`line-clamp-2 text-xl leading-tight font-semibold tracking-tight text-foreground ${
              isBlog ? "min-h-[3.125rem]" : ""
            }`}
          >
            {title}
          </h3>
          <p
            className={`line-clamp-3 text-sm leading-6 text-muted-foreground ${
              isBlog ? "min-h-[4.5rem]" : ""
            }`}
          >
            {description}
          </p>
        </div>

        {tags && tags.length > 0 && (
          <div className={`flex flex-wrap gap-2 ${isBlog ? "min-h-6" : ""}`}>
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full border-border/70 bg-muted/40 text-[11px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="mt-auto flex flex-col gap-5 pt-0">
        <TechBadgeOverflow tech={tech} limit={6} />
        <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
            {detailLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          {liveUrl && (
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Live Project
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!slug || !type) {
    return cardInner;
  }

  const href = type === "project" ? `/projects/${slug}` : `/blogs/${slug}`;

  return (
    <Link href={href} className="block h-full">
      {cardInner}
    </Link>
  );
}
