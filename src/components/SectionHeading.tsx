export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <header data-slot="panel-header" className="screen-line-after px-4 flex items-center gap-2">
      <span className="font-pixel text-xs text-muted-foreground/40 select-none" aria-hidden>{">"}</span>
      <h2 className="font-pixel text-3xl font-semibold text-foreground">{children}</h2>
      <span className="flex-1 border-b border-dashed border-edge" />
    </header>
  );
}
