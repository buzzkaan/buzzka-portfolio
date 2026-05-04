import { type ReactNode } from "react";

/** A single <li> with the project's dot-bullet style. */
export function BulletItem({ children }: { children: ReactNode }) {
  return (
    <li className="ui-text-meta flex items-center gap-2">
      <span className="size-1 flex-shrink-0 rounded-full bg-muted-foreground/50" />
      {children}
    </li>
  );
}
