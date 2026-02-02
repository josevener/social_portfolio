import { ExperiencePost } from "@/types/post";
import TechBadgeOverflow from "../common/TechBadgeOverflow";

type Props = {
  experiences: ExperiencePost[];
};

export default function ExperienceTimeline({ experiences }: Props) {
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
            <div className="space-y-2">
              {/* Title + Date */}
              <div className="flex justify-between gap-4">
                <h3 className="font-medium leading-tight">
                  {exp.title}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              {/* Org / Context */}
              {exp.description && (
                <p className="text-sm text-muted-foreground">
                  {exp.description}
                </p>
              )}

              {/* What I did */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {/* Tech */}
              <TechBadgeOverflow tech={exp.tech} limit={7} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}