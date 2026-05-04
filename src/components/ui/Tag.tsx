import { type ReactNode } from "react";
import { getTechIcon } from "@/lib/techIcons";
import { cn } from "@/lib/utils";

/** Inline mono badge used for skill/tech tags. Automatically shows a tech icon when available. */
export function Tag({ children }: { children: ReactNode }) {
  const label = typeof children === "string" ? children : null;
  const entry = label ? getTechIcon(label) : null;

  return (
    <span className="ui-text-tag inline-flex items-center gap-1 border border-edge bg-muted/30 px-2 py-0.5">
      {entry && (
        <entry.Icon
          size={12}
          className={cn("shrink-0", entry.invert && "dark:invert")}
        />
      )}
      {children}
    </span>
  );
}
