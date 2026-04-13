import { type ReactNode } from "react";
import { getTechIcon } from "@/lib/techIcons";

/** Inline mono badge used for skill/tech tags. Automatically shows a tech icon when available. */
export function Tag({ children }: { children: ReactNode }) {
  const label = typeof children === "string" ? children : null;
  const entry = label ? getTechIcon(label) : null;

  return (
    <span className="inline-flex items-center gap-1 border border-edge bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground font-mono">
      {entry && (
        <entry.Icon
          size={12}
          className={entry.invert ? "dark:invert shrink-0" : "shrink-0"}
        />
      )}
      {children}
    </span>
  );
}
