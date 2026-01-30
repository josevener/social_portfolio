import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Post = {
  title: string;
  description: string;
  tech: string[];
};

export default function PostCard({ title, description, tech }: Post) {
  return (
    <Card>
      <CardHeader className="font-semibold">{title}</CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
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
}