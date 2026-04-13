import { type ReactNode } from "react";
import { ChevronsUpDown } from "lucide-react";

interface AccordionItemProps {
  icon: ReactNode;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  /** Always-visible content rendered between the button and the expandable panel. */
  staticContent?: ReactNode;
  /** Collapsible content. */
  children: ReactNode;
  /** Tailwind max-height class for the open state, e.g. "max-h-80" or "max-h-40" */
  maxHeight?: string;
}

/** Shared accordion button + collapsible panel used by ExperienceSection and EducationSection. */
export function AccordionItem({
  icon,
  title,
  isOpen,
  onToggle,
  staticContent,
  children,
  maxHeight = "max-h-80",
}: AccordionItemProps) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="ml-4 flex w-[calc(100%-1rem)] items-center justify-between gap-2 cursor-pointer px-1 -mx-1 py-0.5 transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-mono text-sm font-semibold text-foreground">{title}</span>
        </div>
        <ChevronsUpDown
          size={14}
          className={`text-muted-foreground/40 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {staticContent}
      <div
        className={`ml-4 pl-7 space-y-2 overflow-hidden transition-all duration-200 ${
          isOpen ? `${maxHeight} opacity-100` : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
