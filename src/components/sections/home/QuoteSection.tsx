"use client";

import { useState, useEffect, useCallback } from "react";
import { quotes } from "@/data/resume-data";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_MS = 8000;

export function QuoteSection() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const next = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % quotes.length);
      setFade(true);
    }, 300);
  }, []);

  useEffect(() => {
    const id = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div
      className="pixel-copy relative flex cursor-pointer flex-col items-center justify-center border-x border-edge px-6 py-12 text-center select-none"
      onClick={next}
      title="Click for next quote"
    >
      {/* Large decorative quote SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        className="mb-6 size-10 text-muted-foreground/20"
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>

      <div
        className="grid w-full place-items-center ui-transition"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {quotes.map((quote, i) => (
          <div
            key={`${quote.author}-${quote.text}`}
            className={cn(
              "col-start-1 row-start-1 flex w-full max-w-2xl flex-col items-center",
              i === index ? "visible" : "invisible",
            )}
            aria-hidden={i !== index}
          >
            <blockquote className="mb-6 w-full font-pixel text-xl font-medium text-foreground/82 italic sm:text-2xl">
              &ldquo;{quote.text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-muted-foreground/20" />
              <span className="ui-text-control uppercase">
                {quote.author}
              </span>
              <div className="h-px w-8 bg-muted-foreground/20" />
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex gap-2">
        {quotes.map((_, i) => (
          <div
            key={i}
            className={cn(
              "size-1.5 rounded-full ui-transition-color",
              i === index ? "bg-foreground/60" : "bg-muted-foreground/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}
