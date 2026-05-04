"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { shuffleIndices, getThemeColor, drawPixelTiles } from "@/lib/pixelAnimation";

const GRID = 12;
const DURATION = 700;
const REVEAL_DURATION = 900;

export function PixelTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animating = useRef(false);
  const mounted = useRef(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  const setup = useCallback(() => {
    const canvas = canvasRef.current!;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d")!;
    const cols = Math.ceil(w / GRID);
    const rows = Math.ceil(h / GRID);
    const total = cols * rows;
    return { canvas, ctx, cols, rows, total, indices: shuffleIndices(total), w, h };
  }, []);

  // Initial page load — start fully covered, then reveal
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    animating.current = true;

    const { ctx, cols, total, indices, w, h } = setup();
    const color = getThemeColor();

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);

    let start: number | null = null;

    function reveal(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / REVEAL_DURATION, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const remaining = total - Math.floor(eased * total);

      ctx.clearRect(0, 0, w, h);
      drawPixelTiles(ctx, indices, remaining, cols, GRID, color);

      if (progress < 1) {
        requestAnimationFrame(reveal);
      } else {
        ctx.clearRect(0, 0, w, h);
        canvas!.style.display = "none";
        animating.current = false;
      }
    }

    requestAnimationFrame(reveal);
  }, [setup]);

  // Theme / navigation transition — fill then clear
  const runTransition = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || animating.current) return;
    animating.current = true;

    const { ctx, cols, total, indices, w, h } = setup();
    const color = getThemeColor();
    const half = DURATION / 2;
    let start: number | null = null;

    function frame(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;

      if (elapsed < half) {
        const count = Math.floor((elapsed / half) * total);
        drawPixelTiles(ctx, indices, count, cols, GRID, color);
      } else {
        const remaining = total - Math.floor(((elapsed - half) / half) * total);
        ctx.clearRect(0, 0, w, h);
        drawPixelTiles(ctx, indices, remaining, cols, GRID, color);
      }

      if (elapsed < DURATION) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
        canvas!.style.display = "none";
        animating.current = false;
      }
    }

    requestAnimationFrame(frame);
  }, [setup]);

  // Listen for theme toggle
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class") runTransition();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [runTransition]);

  // Listen for page navigation
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      runTransition();
    }
  }, [pathname, runTransition]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ display: "block" }}
    />
  );
}
