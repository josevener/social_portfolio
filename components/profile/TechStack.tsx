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
    <Card className="glass-card flex h-full flex-1 overflow-hidden">
      <CardContent className="p-5 space-y-6">
        <SectionHeader
          title="Tech Stack"
          subtitle="Tools and technologies I use to build solutions"
        />

        <div className="space-y-6">
          {/* Frontend Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-blue-500" />
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-2.5 py-0.5 text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Backend Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-green-500" />
              Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-2.5 py-0.5 text-[11px] font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mobile Dev Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-purple-500" />
              Mobile Application
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.mobile.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-2.5 py-0.5 text-[11px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tools & Ecosystem
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="px-2.5 py-0.5 text-[11px] font-medium border-border/50 hover:border-border transition-colors text-muted-foreground"
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
