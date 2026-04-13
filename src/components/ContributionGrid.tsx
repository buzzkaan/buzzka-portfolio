"use client";

import { useState } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

const LEVEL_COLORS = [
  "[background-color:hsl(0,0%,92%)] dark:[background-color:hsl(0,0%,18%)]",
  "[background-color:hsl(0,0%,77%)] dark:[background-color:hsl(0,0%,31%)]",
  "[background-color:hsl(0,0%,52%)] dark:[background-color:hsl(0,0%,52%)]",
  "[background-color:hsl(0,0%,31%)] dark:[background-color:hsl(0,0%,77%)]",
  "[background-color:hsl(0,0%,18%)] dark:[background-color:hsl(0,0%,92%)]",
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface TooltipState {
  x: number;
  y: number;
  date: string;
  count: number;
}

export function ContributionGrid({ weeks }: { weeks: Week[] }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      date: day.date,
      count: day.contributionCount,
    });
  }

  return (
    <>
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
            <span className="text-[9px] text-muted-foreground/50 font-mono leading-none">
              {DAYS[dayIndex]}
            </span>
          </div>,
          ...weeks.map((week, wi) => {
            const day = week.contributionDays[dayIndex];
            if (!day) return <div key={`${wi}-${dayIndex}`} />;
            const level = getLevel(day.contributionCount);
            return (
              <div
                key={`${wi}-${dayIndex}`}
                className={`aspect-square w-full rounded-[2px] cursor-default ${LEVEL_COLORS[level]}`}
                onMouseEnter={(e) => handleMouseEnter(e, day)}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          }),
        ])}
      </div>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2"
          style={{ left: tooltip.x, top: tooltip.y - 6, transform: "translate(-50%, -100%)" }}
        >
          <div className="border border-edge bg-popover px-2 py-1 font-mono text-[10px] text-foreground shadow-sm whitespace-nowrap">
            {formatDate(tooltip.date)}
            <span className="mx-1 text-muted-foreground/40">·</span>
            {tooltip.count === 0
              ? "No commits"
              : `${tooltip.count} commit${tooltip.count !== 1 ? "s" : ""}`}
          </div>
        </div>
      )}
    </>
  );
}
