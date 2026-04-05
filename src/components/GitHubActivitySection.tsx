import { SectionHeading } from "./SectionHeading";
import {
  fetchContributions,
  GITHUB_USERNAME,
} from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

export async function GitHubActivitySection() {
  const contributions = await fetchContributions();

  // Build heatmap data from real API or fallback to empty
  const weeks = contributions?.weeks ?? [];
  const total = contributions?.totalContributions ?? 0;

  // Derive month labels from actual dates
  const monthLabels: { month: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const m = new Date(firstDay.date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ month: MONTHS[m], col: wi });
        lastMonth = m;
      }
    }
  });

  return (
    <section className="screen-line-before screen-line-after border-x border-edge">
      <SectionHeading>GitHub Activity</SectionHeading>

      <div className="w-full py-2 px-6">
        {/* Heatmap */}
        {weeks.length > 0 ? (
          <div>
            {/* Month labels — aligned to grid columns */}
            <div
              className="grid mb-1"
              style={{ gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`, gap: 2 }}
            >
              <div />
              {weeks.map((week, wi) => {
                const firstDay = week.contributionDays[0];
                const showLabel = firstDay && monthLabels.some((m) => m.col === wi);
                const label = showLabel
                  ? MONTHS[new Date(firstDay.date).getMonth()]
                  : null;
                return (
                  <div key={wi} className="overflow-visible">
                    {label && (
                      <span className="text-[10px] text-muted-foreground/60 font-mono whitespace-nowrap">
                        {label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Heatmap grid — single grid for labels + squares */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`,
                gridTemplateRows: "repeat(7, 1fr)",
                gap: 2,
              }}
            >
              {Array.from({ length: 7 }, (_, dayIndex) => [
                /* Day label */
                <div key={`label-${dayIndex}`} className="flex items-center justify-end pr-0.5">
                  <span className="text-[9px] text-muted-foreground/50 font-mono leading-none">
                    {DAYS[dayIndex]}
                  </span>
                </div>,
                /* Squares for this day across all weeks */
                ...weeks.map((week, wi) => {
                  const day = week.contributionDays[dayIndex];
                  if (!day) return <div key={`${wi}-${dayIndex}`} />;
                  const level = getLevel(day.contributionCount);
                  return (
                    <div
                      key={`${wi}-${dayIndex}`}
                      className={`aspect-square w-full rounded-[2px] ${LEVEL_COLORS[level]}`}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                    />
                  );
                }),
              ])}
            </div>

            {/* Footer: activity count + legend */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground/50 font-mono">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {total} contributions in the last year
              </a>
              <div className="flex items-center gap-1">
                <span>Less</span>
                {LEVEL_COLORS.map((color, i) => (
                  <div key={i} className={`h-[11px] w-[11px] rounded-[2px] ${color}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="font-mono text-xs text-muted-foreground">
              Contribution graph requires a{" "}
              <code className="rounded bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5">GITHUB_TOKEN</code>{" "}
              env variable
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
