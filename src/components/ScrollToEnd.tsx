"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollToEnd({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }, []);

  return (
    <div ref={ref} className={`thin-scrollbar ${className ?? ""}`}>
      {children}
    </div>
  );
}
