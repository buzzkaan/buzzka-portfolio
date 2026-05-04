"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface Week {
  contributionDays: ContributionDay[];
}

const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

export const LEVEL_COLORS = [
  "bg-[#d4d4d4] dark:bg-[#303030]",
  "bg-[#a8a8a8] dark:bg-[#555555]",
  "bg-[#808080] dark:bg-[#777777]",
  "bg-[#5f5f5f] dark:bg-[#a7a7a7]",
  "bg-[#2f2f2f] dark:bg-[#f1f1f1]",
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function formatContributionDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .replace(",", "");
}

export function getContributionLabel(day: ContributionDay) {
  const countLabel = `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`;
  return `${countLabel} on ${formatContributionDate(day.date)}`;
}

export function ContributionGrid({
  weeks,
  onActiveDayChange,
}: {
  weeks: Week[];
  onActiveDayChange?: (day: ContributionDay | null) => void;
}) {
  const [activeCell, setActiveCell] = useState<string | null>(null);

  function showDay(day: ContributionDay) {
    setActiveCell(day.date);
    onActiveDayChange?.(day);
  }

  function clearDay() {
    setActiveCell(null);
    onActiveDayChange?.(null);
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`,
        gridTemplateRows: "repeat(7, 1fr)",
        gap: 2,
      }}
    >
      {Array.from({ length: 7 }, (_, dayIndex) => [
        <div key={`label-${dayIndex}`} className="flex items-center justify-end pr-0.5">
          <span className="ui-text-caption">
            {DAYS[dayIndex]}
          </span>
        </div>,
        ...weeks.map((week, wi) => {
          const day = week.contributionDays[dayIndex];
          if (!day) return <div key={`${wi}-${dayIndex}`} />;
          const level = getLevel(day.contributionCount);
          const label = getContributionLabel(day);

          return (
            <button
              key={`${wi}-${dayIndex}`}
              type="button"
              aria-label={label}
              title={label}
              className={cn(
                "aspect-square w-full cursor-pointer rounded-[2px] outline-none touch-manipulation ui-transition",
                "hover:-translate-y-px hover:brightness-125 focus-visible:-translate-y-px focus-visible:brightness-125 active:translate-y-0",
                activeCell === day.date && "-translate-y-px brightness-125",
                LEVEL_COLORS[level],
              )}
              onMouseEnter={() => showDay(day)}
              onMouseLeave={clearDay}
              onFocus={() => showDay(day)}
              onBlur={clearDay}
              onPointerDown={() => showDay(day)}
            />
          );
        }),
      ])}
    </div>
  );
}
