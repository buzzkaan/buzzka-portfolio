"use client";

import { SectionWrapper } from "./SectionWrapper";
import { AccordionItem } from "./AccordionItem";
import { BulletItem } from "./BulletItem";
import { useAccordion } from "@/hooks/useAccordion";
import { useLang } from "@/lib/language";
import { education, sectionLabels } from "@/data/resume-data";

function EducationIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground flex-shrink-0">
      🎓
    </span>
  );
}

export function EducationSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];
  const { openIndex, toggle } = useAccordion();

  return (
    <SectionWrapper heading={labels.education}>
      <div className="p-4 space-y-8">
        {education.map((entry, i) => (
          <div key={i} className="space-y-2">
            {/* Institution with bullet */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
              <span className="font-mono text-sm font-medium text-foreground">
                {entry.institution}
              </span>
            </div>

            <AccordionItem
              icon={<EducationIcon />}
              title={entry.degree[lang]}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              staticContent={
                <>
                  <div className="ml-4 pl-7 font-mono text-xs text-muted-foreground">
                    {entry.startYear} – {entry.endYear}
                  </div>
                  {entry.highlights && (
                    <ul className="ml-4 pl-7 space-y-1">
                      {entry.highlights.map((h) => (
                        <BulletItem key={h}>{h}</BulletItem>
                      ))}
                    </ul>
                  )}
                </>
              }
              maxHeight="max-h-40"
            >
              <p className="text-sm text-muted-foreground">{entry.description[lang]}</p>
            </AccordionItem>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
