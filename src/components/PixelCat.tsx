"use client";

import { useState, useCallback, useEffect } from "react";

type Mood = "sleeping" | "idle" | "excited" | "dancing" | "rolling";

const REACTIONS: Mood[] = ["excited", "dancing", "rolling"];

const BUBBLES: Record<string, string[]> = {
  excited: ["♥", ":3", "meow!"],
  dancing: ["♪♫", "~♪~", "la la~"],
  rolling: ["whee!", "woo!", "^_^"],
};

function SpeechBubble({ mood, clickCount }: { mood: Mood; clickCount: number }) {
  if (mood === "sleeping" || mood === "idle") return null;
  const options = BUBBLES[mood];
  const text = options[clickCount % options.length];

  return (
    <span
      className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover border border-border px-1.5 py-0.5 font-mono text-[8px] text-foreground shadow-sm"
      style={{ animation: "heart-pop 0.8s ease-out forwards" }}
    >
      {text}
    </span>
  );
}

function FerretAwake({ mood }: { mood: Mood }) {
  const isRolling = mood === "rolling";
  const isDancing = mood === "dancing";
  const tailAnim = mood === "excited" || isDancing;

  return (
    <svg
      viewBox="0 0 28 18"
      width="56"
      height="36"
      style={{
        imageRendering: "pixelated",
        animation: isRolling ? "ferret-roll 0.6s ease-in-out" : isDancing ? "ferret-bounce 0.4s ease-in-out infinite" : "none",
      }}
    >
      {/* === EARS === */}
      <rect x="3" y="0" width="2" height="1" fill="#e0dbd4" />
      <rect x="7" y="0" width="2" height="1" fill="#e0dbd4" />
      <rect x="3" y="1" width="2" height="1" fill="#f0ede8" />
      <rect x="7" y="1" width="2" height="1" fill="#f0ede8" />
      <rect x="4" y="1" width="1" height="1" fill="#e8a0b5" />
      <rect x="7" y="1" width="1" height="1" fill="#e8a0b5" />

      {/* === HEAD === */}
      <rect x="2" y="2" width="8" height="6" fill="#f0ede8" />
      <rect x="1" y="3" width="1" height="4" fill="#f0ede8" />
      <rect x="10" y="3" width="1" height="4" fill="#f0ede8" />

      {/* face mask */}
      <rect x="2" y="3" width="8" height="3" fill="#d4cfc8" />

      {/* eyes */}
      <rect x="4" y="4" width="1" height="1" fill="#111" />
      <rect x="7" y="4" width="1" height="1" fill="#111" />

      {/* snout */}
      <rect x="3" y="6" width="6" height="2" fill="#faf8f5" />
      {/* nose */}
      <rect x="5" y="6" width="2" height="1" fill="#e8a0b5" />
      {/* mouth - smile when excited */}
      {mood === "excited" || isDancing ? (
        <>
          <rect x="4" y="7" width="1" height="1" fill="#e0dbd4" />
          <rect x="5" y="8" width="2" height="1" fill="#e0dbd4" />
          <rect x="7" y="7" width="1" height="1" fill="#e0dbd4" />
        </>
      ) : (
        <>
          <rect x="5" y="7" width="1" height="1" fill="#e0dbd4" />
          <rect x="6" y="7" width="1" height="1" fill="#e0dbd4" />
        </>
      )}
      {/* whiskers */}
      <rect x="1" y="6" width="2" height="1" fill="#faf8f5" opacity="0.5" />
      <rect x="9" y="6" width="2" height="1" fill="#faf8f5" opacity="0.5" />

      {/* === NECK === */}
      <rect x="9" y="5" width="3" height="4" fill="#f0ede8" />
      <rect x="9" y="7" width="3" height="2" fill="#faf8f5" />

      {/* === BODY === */}
      <rect x="11" y="4" width="11" height="6" fill="#f0ede8" />
      <rect x="12" y="8" width="9" height="2" fill="#faf8f5" />
      <rect x="12" y="4" width="9" height="1" fill="#e0dbd4" />

      {/* === FRONT LEGS === */}
      <g style={{
        transformOrigin: "12px 10px",
        animation: isDancing ? "leg-kick 0.2s ease-in-out infinite alternate" : "none",
      }}>
        <rect x="11" y="10" width="2" height="4" fill="#f0ede8" />
        <rect x="11" y="14" width="2" height="1" fill="#faf8f5" />
        <rect x="11" y="14" width="1" height="1" fill="#e8a0b5" />
      </g>

      {/* === BACK LEGS === */}
      <g style={{
        transformOrigin: "20px 10px",
        animation: isDancing ? "leg-kick 0.2s ease-in-out infinite alternate-reverse" : "none",
      }}>
        <rect x="19" y="10" width="2" height="4" fill="#f0ede8" />
        <rect x="19" y="14" width="2" height="1" fill="#faf8f5" />
        <rect x="20" y="14" width="1" height="1" fill="#e8a0b5" />
      </g>

      {/* === TAIL === */}
      <g style={{
        transformOrigin: "22px 6px",
        animation: tailAnim ? "tail-wag 0.3s ease-in-out infinite" : "none",
      }}>
        <rect x="22" y="4" width="2" height="1" fill="#f0ede8" />
        <rect x="23" y="3" width="2" height="2" fill="#f0ede8" />
        <rect x="25" y="2" width="2" height="2" fill="#e0dbd4" />
        <rect x="26" y="1" width="2" height="2" fill="#d4cfc8" />
      </g>
    </svg>
  );
}

function FerretSleeping() {
  return (
    <svg
      viewBox="0 0 28 10"
      width="56"
      height="20"
      style={{
        imageRendering: "pixelated",
        animation: "ferret-breathe 2.5s ease-in-out infinite",
      }}
    >
      {/* === CURLED UP BODY (lying on side) === */}
      {/* back curve */}
      <rect x="8" y="0" width="12" height="1" fill="#e0dbd4" />
      <rect x="6" y="1" width="16" height="1" fill="#f0ede8" />
      <rect x="5" y="2" width="18" height="2" fill="#f0ede8" />
      <rect x="4" y="4" width="19" height="2" fill="#f0ede8" />
      {/* belly */}
      <rect x="7" y="5" width="12" height="2" fill="#faf8f5" />
      <rect x="9" y="7" width="8" height="1" fill="#faf8f5" />

      {/* === HEAD (resting on paws) === */}
      <rect x="1" y="3" width="5" height="4" fill="#f0ede8" />
      <rect x="0" y="4" width="1" height="2" fill="#f0ede8" />
      {/* face mask */}
      <rect x="1" y="4" width="4" height="2" fill="#d4cfc8" />
      {/* closed eyes (horizontal lines) */}
      <rect x="2" y="5" width="2" height="1" fill="#a8a29e" />
      {/* nose */}
      <rect x="0" y="6" width="2" height="1" fill="#faf8f5" />
      <rect x="1" y="6" width="1" height="1" fill="#e8a0b5" />
      {/* ear */}
      <rect x="3" y="2" width="2" height="1" fill="#e0dbd4" />
      <rect x="4" y="2" width="1" height="1" fill="#e8a0b5" />

      {/* front paws tucked under chin */}
      <rect x="1" y="7" width="3" height="1" fill="#f0ede8" />
      <rect x="1" y="7" width="1" height="1" fill="#e8a0b5" />

      {/* back paws */}
      <rect x="18" y="6" width="3" height="2" fill="#f0ede8" />
      <rect x="19" y="7" width="1" height="1" fill="#e8a0b5" />

      {/* === TAIL curled around body === */}
      <rect x="22" y="3" width="2" height="2" fill="#f0ede8" />
      <rect x="23" y="2" width="2" height="2" fill="#e0dbd4" />
      <rect x="24" y="1" width="3" height="2" fill="#d4cfc8" />
      <rect x="26" y="2" width="2" height="2" fill="#d4cfc8" />
      <rect x="26" y="4" width="2" height="1" fill="#e0dbd4" />
    </svg>
  );
}

function FerretSvg({ mood }: { mood: Mood }) {
  if (mood === "sleeping") return <FerretSleeping />;
  return <FerretAwake mood={mood} />;
}

function FloatingEmoji({ delay, x, children, duration = 0.8 }: { delay: number; x: number; children: React.ReactNode; duration?: number }) {
  return (
    <span
      className="absolute text-[10px] select-none pointer-events-none"
      style={{
        left: x,
        bottom: 32,
        animation: `heart-pop ${duration}s ease-out ${delay}s forwards`,
      }}
    >
      {children}
    </span>
  );
}

function ZFloat({ delay, x }: { delay: number; x: number }) {
  return (
    <span
      className="absolute text-[8px] font-mono text-muted-foreground/60 select-none pointer-events-none"
      style={{
        left: x,
        bottom: 28,
        animation: `z-float 2.2s ease-in-out ${delay}s infinite`,
      }}
    >
      z
    </span>
  );
}

function Particles({ mood }: { mood: Mood }) {
  if (mood === "excited") {
    return (
      <>
        <FloatingEmoji delay={0} x={6}>❤</FloatingEmoji>
        <FloatingEmoji delay={0.15} x={22}>❤</FloatingEmoji>
        <FloatingEmoji delay={0.3} x={38}>❤</FloatingEmoji>
      </>
    );
  }
  if (mood === "dancing") {
    return (
      <>
        <FloatingEmoji delay={0} x={4} duration={1}>♪</FloatingEmoji>
        <FloatingEmoji delay={0.2} x={18} duration={1}>♪</FloatingEmoji>
        <FloatingEmoji delay={0.4} x={32} duration={1}>♪</FloatingEmoji>
        <FloatingEmoji delay={0.6} x={46} duration={1}>♪</FloatingEmoji>
      </>
    );
  }
  if (mood === "rolling") {
    return (
      <>
        <FloatingEmoji delay={0} x={8} duration={0.9}>✨</FloatingEmoji>
        <FloatingEmoji delay={0.2} x={24} duration={0.9}>✨</FloatingEmoji>
        <FloatingEmoji delay={0.4} x={40} duration={0.9}>✨</FloatingEmoji>
      </>
    );
  }
  return null;
}

export function PixelCat() {
  const [mood, setMood] = useState<Mood>("sleeping");
  const [clickCount, setClickCount] = useState(0);

  // Wake up after 3 seconds, then go back to sleeping after inactivity
  useEffect(() => {
    const wakeTimer = setTimeout(() => {
      if (mood === "sleeping") setMood("idle");
    }, 3000);
    return () => clearTimeout(wakeTimer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mood === "idle" || mood === "sleeping") return;
    const timer = setTimeout(() => setMood("idle"), 1200);
    return () => clearTimeout(timer);
  }, [mood]);

  // Randomly fall asleep if idle for too long
  useEffect(() => {
    if (mood !== "idle") return;
    const sleepTimer = setTimeout(() => setMood("sleeping"), 15000);
    return () => clearTimeout(sleepTimer);
  }, [mood]);

  const handleClick = useCallback(() => {
    if (mood !== "idle" && mood !== "sleeping") return;
    const reaction = REACTIONS[clickCount % REACTIONS.length];
    setMood(reaction);
    setClickCount((c) => c + 1);
  }, [mood, clickCount]);

  return (
    <div
      className="select-none cursor-pointer group transition-transform duration-200 hover:scale-110 active:scale-95"
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label="Pet the ferret"
      role="button"
      tabIndex={0}
    >
      <div
        className="relative inline-block"
        style={{
          animation: mood === "excited" ? "ferret-wiggle 0.5s ease-in-out" : "none",
        }}
      >
        <SpeechBubble mood={mood} clickCount={clickCount} />
        {mood === "sleeping" && (
          <>
            <ZFloat delay={0} x={8} />
            <ZFloat delay={0.7} x={20} />
            <ZFloat delay={1.4} x={14} />
          </>
        )}
        <Particles mood={mood} />
        <FerretSvg mood={mood} />
      </div>
    </div>
  );
}
