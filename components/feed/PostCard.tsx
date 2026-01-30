import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  description: string;
  tech: string[];
  slug?: string;
};

export default function PostCard({
  title,
  description,
  tech,
  slug,
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
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (!slug) return CardInner;

  return (
    <Link href={`/projects/${slug}`} className="block">
      {CardInner}
    </Link>
  );
}