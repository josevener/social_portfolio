"use client";

import { BriefcaseBusiness, FileText, FolderKanban } from "lucide-react";

import { experiences } from "@/data/experiences";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import {
  formatDuration,
  getTotalExperienceMonths,
} from "@/lib/experience";
import { useCurrentMonth } from "@/lib/use-current-month";

export default function StatsBar() {
  const currentMonth = useCurrentMonth();
  // Every value comes from portfolio data; overlapping work months count only once.
  const totalExperience = currentMonth
    ? formatDuration(getTotalExperienceMonths(experiences, currentMonth))
    : "\u2014";
  const stats = [
    { label: "Posts", value: posts.length, icon: FileText },
    { label: "Projects", value: projects.length, icon: FolderKanban },
    { label: "Experience", value: totalExperience, icon: BriefcaseBusiness },
  ];

  return (
    <section
      aria-label="Portfolio statistics"
      className="glass-card mx-auto grid w-full max-w-full grid-cols-3 divide-x divide-primary/10 overflow-hidden rounded-2xl border-primary/15 sm:mx-0 sm:inline-grid sm:w-fit sm:grid-cols-[auto_auto_auto]"
    >
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="group flex min-w-0 flex-col items-center justify-center gap-2 px-1.5 py-3.5 transition-colors hover:bg-primary/[0.06] sm:flex-row sm:justify-start sm:px-4"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform group-hover:scale-105">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 text-center sm:text-left">
            <span className="block text-xs font-bold tracking-tight text-foreground sm:whitespace-nowrap sm:text-base">
              {value}
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
              {label}
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}
