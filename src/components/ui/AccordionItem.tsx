import { type ReactNode } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
        className="ml-4 flex w-[calc(100%-1rem)] cursor-pointer items-center justify-between gap-2 px-1 py-0.5 ui-transition hover:bg-muted/50 active:translate-y-px"
      >
        <div className="flex min-w-0 items-center gap-2">
          {icon}
          <span className="ui-text-title min-w-0 truncate text-left">
            {title}
          </span>
        </div>
        <ChevronsUpDown
          size={14}
          className={cn(
            "flex-shrink-0 text-muted-foreground ui-transition",
            isOpen && "rotate-180 text-muted-foreground",
          )}
        />
      </button>
      {staticContent}
      <div
        className={cn(
          "ml-4 min-w-0 flex flex-col gap-2 overflow-hidden pl-7 transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? `${maxHeight} opacity-100` : "max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </>
  );
}
