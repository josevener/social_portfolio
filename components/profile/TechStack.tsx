"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "../layout/SectionHeader";
import { skills } from "@/data/skills";

/**
 * TechStack Component
 * Displays categorized skills (Core and Secondary) using badges.
 * Positioned in the left column below the About Me section.
 */
export default function TechStack() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5 space-y-6">
        <SectionHeader
          title="Tech Stack"
          subtitle="Tools and technologies I use to build solutions"
        />

        <div className="space-y-4">
          {/* Core Skills Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Core Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.core.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-3 py-1 text-xs font-medium bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Secondary Skills/Tools Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tools & Ecosystem
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.secondary.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="px-3 py-1 text-xs font-medium border-border/50 hover:border-border transition-colors text-muted-foreground"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
