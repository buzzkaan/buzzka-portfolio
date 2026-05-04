import { Suspense } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GitHubActivityClient } from "./GitHubActivityClient";
import type { ContributionDay, Week } from "./ContributionGrid";
import {
  fetchContributions,
  GITHUB_USERNAME,
} from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getDayOfYear(date: Date) {
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  return Math.floor((date.getTime() - yearStart) / 86_400_000);
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildYearWeeks(sourceWeeks: Week[], year: number) {
  const countsByDate = new Map<string, number>();
  sourceWeeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      countsByDate.set(day.date, day.contributionCount);
    });
  });

  const janFirst = new Date(Date.UTC(year, 0, 1));
  const decLast = new Date(Date.UTC(year, 11, 31));
  const firstDayOffset = janFirst.getUTCDay();
  const weekCount = Math.ceil((getDayOfYear(decLast) + firstDayOffset + 1) / 7);
  const weeks = Array.from({ length: weekCount }, () => ({ contributionDays: [] as ContributionDay[] }));

  for (let dayOffset = 0; dayOffset <= getDayOfYear(decLast); dayOffset += 1) {
    const date = new Date(Date.UTC(year, 0, 1 + dayOffset));
    const weekIndex = Math.floor((dayOffset + firstDayOffset) / 7);
    const dayIndex = date.getUTCDay();
    const dateKey = toDateKey(date);
    weeks[weekIndex].contributionDays[dayIndex] = {
      date: dateKey,
      contributionCount: countsByDate.get(dateKey) ?? 0,
    };
  }

  return weeks;
}

function buildMonthLabels(year: number) {
  const janFirst = new Date(Date.UTC(year, 0, 1));
  const firstDayOffset = janFirst.getUTCDay();

  return MONTHS.map((month, monthIndex) => {
    const firstOfMonth = new Date(Date.UTC(year, monthIndex, 1));
    return {
      month,
      col: Math.floor((getDayOfYear(firstOfMonth) + firstDayOffset) / 7),
    };
  });
}

function GitHubActivitySkeleton() {
  return (
    <div className="w-full animate-pulse px-4 py-2 sm:px-6">
      <div className="overflow-x-auto pb-3 md:overflow-x-visible md:pb-0">
        <div className="min-w-[660px] md:min-w-0">
          <div className="mb-1 flex gap-[2px]">
            <div className="w-6" />
            {Array.from({ length: 53 }, (_, i) => (
              <div key={i} className="flex-1">
                {i % 4 === 0 && <div className="h-2.5 w-6 rounded bg-muted-foreground/10" />}
              </div>
            ))}
          </div>
          <div
            className="grid gap-[2px]"
            style={{ gridTemplateColumns: "24px repeat(53, 1fr)", gridTemplateRows: "repeat(7, 1fr)" }}
          >
            {Array.from({ length: 7 }, (_, dayIndex) => [
              <div key={`label-${dayIndex}`} className="flex items-center justify-end pr-0.5">
                {dayIndex % 2 === 1 && <div className="h-2 w-4 rounded bg-muted-foreground/10" />}
              </div>,
              ...Array.from({ length: 53 }, (_, wi) => (
                <div
                  key={`${wi}-${dayIndex}`}
                  className="aspect-square w-full rounded-[2px] bg-muted-foreground/10"
                />
              )),
            ])}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="h-3 w-48 rounded bg-muted-foreground/10" />
        <div className="flex shrink-0 items-center gap-1">
          <div className="h-3 w-6 rounded bg-muted-foreground/10" />
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="size-3 rounded-[2px] bg-muted-foreground/20" />
          ))}
          <div className="h-3 w-6 rounded bg-muted-foreground/10" />
        </div>
      </div>
    </div>
  );
}

export function GitHubActivitySection() {
  return (
    <SectionWrapper heading="GitHub Activity">
      <Suspense fallback={<GitHubActivitySkeleton />}>
        <GitHubActivityContent />
      </Suspense>
    </SectionWrapper>
  );
}

async function GitHubActivityContent() {
  const displayYear = new Date().getFullYear();
  const contributions = await fetchContributions({
    from: `${displayYear}-01-01T00:00:00Z`,
    to: new Date().toISOString(),
  });

  const apiWeeks = contributions?.weeks ?? [];
  const weeks = buildYearWeeks(apiWeeks, displayYear);
  const total = contributions?.totalContributions ?? 0;
  const summaryLabel = `${total} contributions in ${displayYear}`;
  const monthLabels = buildMonthLabels(displayYear);

  return (
    <div className="w-full px-4 py-2 sm:px-6">
      {apiWeeks.length > 0 ? (
        <GitHubActivityClient
          monthLabels={monthLabels}
          profileUrl={`https://github.com/${GITHUB_USERNAME}`}
          summaryLabel={summaryLabel}
          weeks={weeks}
        />
      ) : (
        <div className="py-6 text-center">
          <p className="ui-text-meta">
            Contribution graph requires a{" "}
            <code className="bg-muted px-1 py-0.5 text-foreground">GITHUB_TOKEN</code> env
            variable
          </p>
        </div>
      )}
    </div>
  );
}
