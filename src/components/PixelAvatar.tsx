"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { shuffleIndices, getThemeColor, drawPixelTiles } from "@/lib/pixelAnimation";

const GRID = 6;
const DURATION = 500;

export function PixelAvatar({
  srcs,
  alt,
}: {
  srcs: readonly string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const runPixelSwap = useCallback(() => {
    if (animating.current || srcs.length < 2) return;
    animating.current = true;

    const next = (index + 1) % srcs.length;
    setNextIndex(next);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.display = "block";

    const ctx = canvas.getContext("2d")!;
    const cols = Math.ceil(w / GRID);
    const total = Math.ceil(w / GRID) * Math.ceil(h / GRID);
    const indices = shuffleIndices(total);
    const color = getThemeColor();

    const half = DURATION / 2;
    let start: number | null = null;
    let swapped = false;

    function frame(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;

      ctx.clearRect(0, 0, w, h);

      if (elapsed < half) {
        const count = Math.floor((elapsed / half) * total);
        drawPixelTiles(ctx, indices, count, cols, GRID, color);
      } else {
        if (!swapped) {
          swapped = true;
          setIndex(next);
        }
        const remaining = total - Math.floor(((elapsed - half) / half) * total);
        drawPixelTiles(ctx, indices, remaining, cols, GRID, color);
      }

      if (elapsed < DURATION) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
        canvas!.style.display = "none";
        setNextIndex(null);
        animating.current = false;
      }
    }

    requestAnimationFrame(frame);
  }, [index, srcs]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square h-auto w-full overflow-hidden border border-border p-1 sm:size-32 cursor-pointer"
      onClick={runPixelSwap}
    >
      {srcs.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          width={130}
          height={130}
          sizes="(min-width: 640px) 128px, 35vw"
          className={`absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] object-cover transition-opacity duration-0 ${
            i === index || i === nextIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-1 z-10"
        style={{ display: "none" }}
      />
    </div>
  );
}
