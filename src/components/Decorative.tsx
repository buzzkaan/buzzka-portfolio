export function CornerCross({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const posClasses = {
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  };

  return (
    <div className={`absolute z-[2] ${posClasses[position]}`}>
      <div className="relative flex size-3 items-center justify-center">
        <div className="absolute h-[1px] w-full bg-muted-foreground/30" />
        <div className="absolute h-full w-[1px] bg-muted-foreground/30" />
      </div>
    </div>
  );
}

export function DottedPattern() {
  return (
    <div className="border-x border-edge select-none screen-line-before screen-line-after">
      <div className="overflow-hidden p-5">
        <div
          className="h-full min-h-[70px] w-full bg-center px-[5px] sm:min-h-[110px]"
          style={{
            backgroundImage: "radial-gradient(color-mix(in oklab, var(--color-zinc-400) 60%, transparent) 1px, transparent 0)",
            backgroundSize: "10px 10px",
          }}
        />
      </div>
    </div>
  );
}

export function StripeDivider() {
  return (
    <div className="relative flex h-6 w-full border-x border-edge">
      <div
        className="absolute -left-[100vw] -z-10 h-6 w-[200vw]"
        style={{
          backgroundImage: "repeating-linear-gradient(315deg, color-mix(in oklab, var(--color-edge) 55%, transparent) 0, color-mix(in oklab, var(--color-edge) 55%, transparent) 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
}
