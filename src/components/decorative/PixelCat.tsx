"use client";

import { useCallback, useEffect, useState } from "react";

type Mood = "idle" | "excited" | "dancing" | "rolling";

const REACTIONS: Mood[] = ["excited", "dancing", "rolling"];

const BUBBLES: Record<Exclude<Mood, "idle">, string[]> = {
  excited: [":3", "meow", "purr"],
  dancing: ["tap", "la la", "step"],
  rolling: ["spin", "zoom", "ta-da"],
};

function SpeechBubble({ mood, clickCount }: { mood: Mood; clickCount: number }) {
  if (mood === "idle") return null;

  const text = BUBBLES[mood][clickCount % BUBBLES[mood].length];

  return (
    <span
      className="absolute -top-5 right-0 whitespace-nowrap border border-border bg-popover px-1.5 py-0.5 font-pixel text-[8px] text-foreground shadow-sm"
      style={{ animation: "heart-pop 0.8s ease-out forwards" }}
    >
      {text}
    </span>
  );
}

function FloatingPixel({
  delay,
  x,
  children,
  duration = 0.8,
}: {
  delay: number;
  x: number;
  children: React.ReactNode;
  duration?: number;
}) {
  return (
    <span
      className="pointer-events-none absolute select-none font-pixel text-[10px] text-muted-foreground"
      style={{
        left: x,
        bottom: 36,
        animation: `heart-pop ${duration}s ease-out ${delay}s forwards`,
      }}
    >
      {children}
    </span>
  );
}

function Particles({ mood }: { mood: Mood }) {
  if (mood === "idle") return null;

  return (
    <>
      <FloatingPixel delay={0} x={8}>
        *
      </FloatingPixel>
      <FloatingPixel delay={0.18} x={28}>
        +
      </FloatingPixel>
      <FloatingPixel delay={0.36} x={48}>
        *
      </FloatingPixel>
    </>
  );
}

function CatSvg({ mood }: { mood: Mood }) {
  const isRolling = mood === "rolling";
  const isDancing = mood === "dancing";
  const isExcited = mood === "excited";
  const outline = "#25211f";
  const fur = "#f3eee8";
  const shade = "#d8d0c6";
  const light = "#fffaf5";
  const pink = "#e8a0b5";

  return (
    <svg
      viewBox="0 0 32 24"
      width="64"
      height="48"
      role="img"
      aria-label="Pixel cat"
      style={{
        imageRendering: "pixelated",
        animation: isRolling
          ? "ferret-roll 0.6s ease-in-out"
          : isDancing
            ? "ferret-bounce 0.4s ease-in-out infinite"
            : "none",
      }}
    >
      <title>Pixel cat</title>

      {/* Tail */}
      <g
        style={{
          transformOrigin: "24px 15px",
          animation: isExcited || isDancing ? "tail-wag 0.35s ease-in-out infinite" : "none",
        }}
      >
        <rect x="23" y="8" width="3" height="11" fill={outline} />
        <rect x="25" y="5" width="3" height="4" fill={outline} />
        <rect x="27" y="4" width="3" height="3" fill={outline} />
        <rect x="29" y="6" width="2" height="5" fill={outline} />
        <rect x="24" y="9" width="1" height="9" fill={fur} />
        <rect x="25" y="6" width="2" height="3" fill={fur} />
        <rect x="27" y="5" width="2" height="2" fill={shade} />
        <rect x="29" y="7" width="1" height="3" fill={shade} />
      </g>

      {/* Body */}
      <rect x="10" y="10" width="14" height="11" fill={outline} />
      <rect x="9" y="13" width="2" height="7" fill={outline} />
      <rect x="11" y="11" width="11" height="9" fill={fur} />
      <rect x="13" y="13" width="6" height="7" fill={light} />
      <rect x="20" y="12" width="2" height="8" fill={shade} />

      {/* Paws */}
      <rect x="10" y="20" width="5" height="2" fill={outline} />
      <rect x="18" y="20" width="5" height="2" fill={outline} />
      <rect x="11" y="20" width="3" height="1" fill={fur} />
      <rect x="19" y="20" width="3" height="1" fill={fur} />
      <rect x="12" y="21" width="1" height="1" fill={pink} />
      <rect x="20" y="21" width="1" height="1" fill={pink} />

      {/* Ears */}
      <rect x="7" y="2" width="2" height="3" fill={outline} />
      <rect x="8" y="1" width="2" height="3" fill={outline} />
      <rect x="9" y="3" width="2" height="2" fill={outline} />
      <rect x="16" y="3" width="2" height="2" fill={outline} />
      <rect x="17" y="1" width="2" height="3" fill={outline} />
      <rect x="19" y="2" width="2" height="3" fill={outline} />
      <rect x="8" y="3" width="2" height="2" fill={fur} />
      <rect x="9" y="2" width="1" height="1" fill={pink} />
      <rect x="17" y="2" width="1" height="1" fill={pink} />
      <rect x="17" y="3" width="2" height="2" fill={fur} />

      {/* Head */}
      <rect x="6" y="5" width="16" height="10" fill={outline} />
      <rect x="7" y="6" width="14" height="8" fill={fur} />
      <rect x="9" y="10" width="10" height="4" fill={light} />
      <rect x="7" y="6" width="3" height="2" fill={shade} />
      <rect x="18" y="6" width="3" height="2" fill={shade} />

      {/* Face */}
      <rect x="10" y="8" width="2" height="2" fill={outline} />
      <rect x="16" y="8" width="2" height="2" fill={outline} />
      <rect x="13" y="10" width="2" height="1" fill={pink} />
      <rect x="14" y="11" width="1" height="1" fill={outline} />
      <rect x="12" y="12" width="2" height="1" fill={outline} />
      <rect x="15" y="12" width="2" height="1" fill={outline} />
      <rect x="5" y="10" width="4" height="1" fill={outline} />
      <rect x="5" y="12" width="4" height="1" fill={outline} />
      <rect x="19" y="10" width="4" height="1" fill={outline} />
      <rect x="19" y="12" width="4" height="1" fill={outline} />
    </svg>
  );
}

export function PixelCat() {
  const [mood, setMood] = useState<Mood>("idle");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (mood === "idle") return;
    const timer = setTimeout(() => setMood("idle"), 1200);
    return () => clearTimeout(timer);
  }, [mood]);

  const handleClick = useCallback(() => {
    if (mood !== "idle") return;

    const reaction = REACTIONS[clickCount % REACTIONS.length];
    setMood(reaction);
    setClickCount((count) => count + 1);
  }, [clickCount, mood]);

  return (
    <button
      type="button"
      className="group relative flex h-12 w-20 cursor-pointer items-center justify-end overflow-visible bg-transparent p-0 ui-transition hover:scale-105 active:scale-95"
      onClick={handleClick}
      aria-label="Pet the pixel cat"
    >
      <SpeechBubble mood={mood} clickCount={clickCount} />
      <Particles mood={mood} />
      <CatSvg mood={mood} />
    </button>
  );
}
