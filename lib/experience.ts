import type { ExperiencePost } from "@/types/post";

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function parseMonth(value: string) {
  const [year, month] = value.split("-").map(Number);

  return { year, month };
}

function toMonthIndex(value: string) {
  const { year, month } = parseMonth(value);

  return year * 12 + month - 1;
}

function formatMonth(value: string) {
  const { year, month } = parseMonth(value);

  return MONTH_FORMATTER.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function getCurrentMonth(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getExperienceDurationMonths(
  experience: ExperiencePost,
  currentMonth: string
) {
  const endMonth = experience.endDate ?? currentMonth;

  return Math.max(0, toMonthIndex(endMonth) - toMonthIndex(experience.startDate));
}

export function formatDuration(monthCount: number) {
  const years = Math.floor(monthCount / 12);
  const months = monthCount % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
}

export function formatExperiencePeriod(
  experience: ExperiencePost,
  currentMonth: string
) {
  const startLabel =
    experience.datePrecision === "year"
      ? String(parseMonth(experience.startDate).year)
      : formatMonth(experience.startDate);

  if (experience.endDate === experience.startDate) {
    return startLabel;
  }

  const endLabel = experience.endDate ? formatMonth(experience.endDate) : "Present";
  const duration =
    experience.endDate || currentMonth
      ? formatDuration(getExperienceDurationMonths(experience, currentMonth))
      : "";

  return `${startLabel} – ${endLabel}${duration ? ` · ${duration}` : ""}`;
}

export function getTotalExperienceMonths(
  experiences: ExperiencePost[],
  currentMonth: string
) {
  // A set of month indexes prevents concurrent roles from being counted twice.
  const workedMonths = new Set<number>();

  experiences
    .filter((experience) => experience.category === "work")
    .forEach((experience) => {
      const startMonth = toMonthIndex(experience.startDate);
      const endMonth = toMonthIndex(experience.endDate ?? currentMonth);

      for (let month = startMonth; month < endMonth; month += 1) {
        workedMonths.add(month);
      }
    });

  return workedMonths.size;
}
