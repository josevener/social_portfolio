import { posts } from "@/data/posts";
import { ExperiencePost } from "@/types/post";

export default function ExperienceTimeline() {
  const experiences = posts
    .filter((p): p is ExperiencePost => p.type === "experience")
    // newest first (optional but recommended)
    .sort((a, b) => b.id - a.id);

  return (
    <div className="relative">
      <ul className="space-y-10">
        {experiences.map((exp, index) => (
          <li key={exp.id} className="relative pl-8">
            {/* Vertical line */}
            {index !== experiences.length - 1 && (
              <span className="absolute left-[11px] top-6 h-full w-px bg-border" />
            )}

            {/* Dot */}
            <span className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full bg-primary" />

            {/* Content */}
            <div className="space-y-1">
              {/* Title + Date */}
              <div className="flex justify-between gap-4">
                <h3 className="font-medium leading-tight">
                  {exp.title}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              {/* Organization / Description */}
              {exp.description && (
                <p className="text-sm text-muted-foreground">
                  {exp.description}
                </p>
              )}

              {/* Tech (optional) */}
              {exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-muted px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}