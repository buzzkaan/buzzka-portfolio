"use client";

import { GraduationCap } from "lucide-react";
import { BulletItem } from "@/components/ui/BulletItem";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TimelineAccordionItem } from "@/components/ui/TimelineAccordionItem";
import { useAccordion } from "@/hooks/useAccordion";
import { useLang } from "@/lib/language";
import { education, sectionLabels } from "@/data/resume-data";

function EducationIcon() {
  return (
    <span className="flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <GraduationCap size={12} strokeWidth={1.75} />
    </span>
  );
}

export function EducationSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];
  const { openIndex, toggle } = useAccordion();

  return (
    <SectionWrapper heading={labels.education}>
      <div className="flex flex-col gap-8 px-4 py-4 sm:px-6">
        {education.map((entry, i) => (
          <TimelineAccordionItem
            key={`${entry.institution}-${entry.startYear}`}
            icon={<EducationIcon />}
            title={entry.degree[lang]}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
            marker={
              <span className="ui-text-label block truncate">
                {entry.institution}
              </span>
            }
            staticContent={
              <>
                <div className="ui-text-meta ml-4 min-w-0 pl-7">
                  {entry.startYear} - {entry.endYear}
                </div>
                {entry.highlights && (
                  <ul className="ml-4 flex min-w-0 flex-col gap-1 pl-7">
                    {entry.highlights.map((highlight) => (
                      <BulletItem key={highlight}>{highlight}</BulletItem>
                    ))}
                  </ul>
                )}
              </>
            }
            maxHeight="max-h-40"
          >
            <p className="ui-text-body">{entry.description[lang]}</p>
          </TimelineAccordionItem>
        ))}
      </div>
    </SectionWrapper>
  );
}
