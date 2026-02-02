import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TechBadgeOverflow from "../common/TechBadgeOverflow";

type Props = {
  title: string;
  description: string;
  tech: string[];
  slug?: string;
  type?: "post" | "project";
};

export default function PostCard({
  title,
  description,
  tech,
  slug,
  type,
}: Props) {

  const CardInner = (
    <Card className={slug ? "cursor-pointer hover:border-primary transition" : ""}>
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