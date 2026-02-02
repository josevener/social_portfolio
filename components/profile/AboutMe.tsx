import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../layout/SectionHeader";

export default function AboutMe() {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <SectionHeader
          title="About Me"
          subtitle="A short introduction and how I approach my work"
        />

        <p className="text-sm font-medium">
          Full-stack developer focused on building practical, production-ready systems.
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed">
          I work closely with real-world problems—debugging production issues,
          improving workflows, and turning unclear requirements into working solutions.
        </p>

        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Clean, maintainable architecture</li>
          <li>• Clear and honest communication</li>
          <li>• Shipping features that actually get used</li>
        </ul>

        <p className="text-sm text-muted-foreground leading-relaxed">
          I enjoy improving system performance, reducing complexity,
          and making development workflows easier for teams to maintain.
        </p>
      </CardContent>
    </Card>
  );
}