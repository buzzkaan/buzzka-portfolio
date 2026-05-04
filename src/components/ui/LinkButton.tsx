import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  download?: boolean;
  external?: boolean;
}

const baseClassName =
  "ui-text-control inline-flex items-center gap-1.5 border border-edge bg-muted/30 px-3 py-1.5 ui-transition hover:bg-muted hover:text-foreground active:translate-y-px";

export function LinkButton({
  href,
  children,
  className,
  download,
  external,
}: LinkButtonProps) {
  const isInternal = href.startsWith("/") && !download && !external;
  const mergedClassName = cn(baseClassName, className);

  if (isInternal) {
    return (
      <Link href={href} className={mergedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={mergedClassName}
    >
      {children}
    </a>
  );
}
