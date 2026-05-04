"use client";

import { useState } from "react";
import {
  ContributionGrid,
  getContributionLabel,
  LEVEL_COLORS,
  type Week,
} from "./ContributionGrid";
import { cn } from "@/lib/utils";

interface GitHubActivityClientProps {
  monthLabels: { month: string; col: number }[];
  profileUrl: string;
  summaryLabel: string;
  weeks: Week[];
}

export function GitHubActivityClient({
  monthLabels,
  profileUrl,
  summaryLabel,
  weeks,
}: GitHubActivityClientProps) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  return (
    <>
      <div className="overflow-x-auto pb-3 md:overflow-x-visible md:pb-0">
        <div className="min-w-[660px] md:min-w-0">
          <div
            className="mb-1 grid"
            style={{ gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`, gap: 2 }}
          >
            <div />
            {weeks.map((week, wi) => {
              const matchedMonth = monthLabels.find((month) => month.col === wi);
              const label = matchedMonth?.month;

              return (
                <div key={wi} className="overflow-visible">
                  {label && (
                    <span className="ui-text-caption whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <ContributionGrid
            weeks={weeks}
            onActiveDayChange={(day) => setActiveLabel(day ? getContributionLabel(day) : null)}
          />
        </div>
      </div>

      <div className="ui-text-caption mt-3 flex items-center justify-between gap-4">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 ui-transition-color hover:text-muted-foreground"
        >
          {activeLabel ?? summaryLabel}
        </a>
        <div className="flex shrink-0 items-center gap-1 text-foreground">
          <span>Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} className={cn("size-3 rounded-[2px]", color)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </>
  );
}
