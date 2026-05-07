import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TechBadgeOverflow from "../common/TechBadgeOverflow";

import Image from "next/image";

type Props = {
  title: string;
  description: string;
  tech: string[];
  slug?: string;
  type?: "post" | "project";
  image?: string; // Optional image for project/blog preview
};

export default function PostCard({
  title,
  description,
  tech,
  slug,
  type,
  image,
}: Props) {

  const CardInner = (
    <Card className={`overflow-hidden break-inside-avoid mb-6 glass-card group ${slug ? "cursor-pointer hover:border-primary/50 hover:scale-[1.02] transition-all duration-300" : ""}`}>
      {/* 
          Hero image for the card. 
          Renders at the top if an image URL is provided. 
      */}
      {image && (
        <div className="relative aspect-video w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader className="font-semibold">
        {title}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>

        <TechBadgeOverflow tech={tech} limit={8} />
      </CardContent>
    </Card>
  );

  if (!slug || !type) return CardInner;

  const href =
    type === "project"
      ? `/projects/${slug}`
      : `/blogs/${slug}`;

  return (
    <Link href={href} className="block">
      {CardInner}
    </Link>
  );
}