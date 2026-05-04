import { type ReactNode } from "react";
import { AccordionItem } from "@/components/ui/AccordionItem";

interface TimelineAccordionItemProps {
  children: ReactNode;
  icon: ReactNode;
  isOpen: boolean;
  marker: ReactNode;
  onToggle: () => void;
  staticContent?: ReactNode;
  title: string;
  maxHeight?: string;
}

export function TimelineAccordionItem({
  children,
  icon,
  isOpen,
  marker,
  onToggle,
  staticContent,
  title,
  maxHeight,
}: TimelineAccordionItemProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="size-1.5 flex-shrink-0 rounded-full bg-muted-foreground/50" />
        <div className="min-w-0 flex-1">{marker}</div>
      </div>

      <AccordionItem
        icon={icon}
        title={title}
        isOpen={isOpen}
        onToggle={onToggle}
        staticContent={staticContent}
        maxHeight={maxHeight}
      >
        {children}
      </AccordionItem>
    </div>
  );
}
