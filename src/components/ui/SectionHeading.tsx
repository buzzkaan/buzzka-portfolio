export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <header data-slot="panel-header" className="screen-line-after relative px-4 py-3 sm:px-6">
      <span
        className="absolute top-1/2 left-1 -translate-y-1/2 font-pixel text-xs text-muted-foreground/40 select-none sm:left-3"
        aria-hidden
      >
        {">"}
      </span>
      <h2 className="ui-text-heading">{children}</h2>
    </header>
  );
}
