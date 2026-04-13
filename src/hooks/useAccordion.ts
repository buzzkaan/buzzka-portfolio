"use client";

import { useState } from "react";

/** Manages open/close state for a single-open accordion list. */
export function useAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return { openIndex, toggle };
}
