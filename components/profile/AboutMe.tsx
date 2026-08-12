import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../layout/SectionHeader";

export default function AboutMe() {
  return (
    <Card className="glass-card">
      <CardContent className="space-y-4 p-5">
        <SectionHeader
          title="About Me"
          subtitle="How I approach building useful software"
        />

        <p className="text-sm font-medium">
          Full-stack developer building practical web applications, APIs, and connected systems.
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          I work from the problem outward: clarify requirements, solve issues in
          existing systems, and ship maintainable improvements.
        </p>

        <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
          <li>Maintainable architecture that supports future changes</li>
          <li>Clear, direct communication with teammates and clients</li>
          <li>Features shaped around real workflow needs</li>
        </ul>

        <p className="text-sm leading-relaxed text-muted-foreground">
          I am especially interested in improving performance, reducing unnecessary
          complexity, and making software easier for teams to work with.
        </p>
      </CardContent>
    </Card>
  );
}
