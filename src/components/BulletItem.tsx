import { type ReactNode } from "react";

/** A single <li> with the project's dot-bullet style. */
export function BulletItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
      {children}
    </li>
  );
}
