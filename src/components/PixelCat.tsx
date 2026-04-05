"use client";

import { useState, useCallback, useEffect } from "react";

type Mood = "sleeping" | "idle" | "excited" | "dancing" | "rolling";

const REACTIONS: Mood[] = ["excited", "dancing", "rolling"];

function FerretAwake({ mood }: { mood: Mood }) {
  const isRolling = mood === "rolling";
  const isDancing = mood === "dancing";
  const tailAnim = mood === "excited" || isDancing;

  return (
    <svg
      viewBox="0 0 28 18"
      width="84"
      height="54"
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
      width="84"
      height="30"
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

function HeartFloat({ delay, x }: { delay: number; x: number }) {
  return (
    <span
      className="absolute text-sm select-none pointer-events-none"
      style={{
        left: x,
        bottom: 50,
        animation: `heart-pop 0.8s ease-out ${delay}s forwards`,
      }}
    >
      ❤
    </span>
  );
}

function StarFloat({ delay, x }: { delay: number; x: number }) {
  return (
    <span
      className="absolute text-xs select-none pointer-events-none"
      style={{
        left: x,
        bottom: 50,
        animation: `heart-pop 0.9s ease-out ${delay}s forwards`,
      }}
    >
      ✨
    </span>
  );
}

function NoteFloat({ delay, x }: { delay: number; x: number }) {
  return (
    <span
      className="absolute text-xs select-none pointer-events-none"
      style={{
        left: x,
        bottom: 50,
        animation: `heart-pop 1s ease-out ${delay}s forwards`,
      }}
    >
      ♪
    </span>
  );
}

function ZFloat({ delay, x }: { delay: number; x: number }) {
  return (
    <span
      className="absolute text-[10px] font-mono text-muted-foreground/60 select-none pointer-events-none"
      style={{
        left: x,
        bottom: 50,
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
        <HeartFloat delay={0} x={10} />
        <HeartFloat delay={0.15} x={30} />
        <HeartFloat delay={0.3} x={50} />
      </>
    );
  }
  if (mood === "dancing") {
    return (
      <>
        <NoteFloat delay={0} x={5} />
        <NoteFloat delay={0.2} x={25} />
        <NoteFloat delay={0.4} x={45} />
        <NoteFloat delay={0.6} x={60} />
      </>
    );
  }
  if (mood === "rolling") {
    return (
      <>
        <StarFloat delay={0} x={10} />
        <StarFloat delay={0.2} x={35} />
        <StarFloat delay={0.4} x={55} />
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
      className="select-none cursor-pointer"
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
        {mood === "sleeping" && (
          <>
            <ZFloat delay={0} x={12} />
            <ZFloat delay={0.7} x={28} />
            <ZFloat delay={1.4} x={20} />
          </>
        )}
        <Particles mood={mood} />
        <FerretSvg mood={mood} />
        {clickCount > 0 && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/50">
            x{clickCount}
          </span>
        )}
      </div>
    </div>
  );
}
