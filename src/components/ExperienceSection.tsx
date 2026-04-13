"use client";

import { SectionWrapper } from "./SectionWrapper";
import { AccordionItem } from "./AccordionItem";
import { Tag } from "./Tag";
import { BulletItem } from "./BulletItem";
import { useAccordion } from "@/hooks/useAccordion";
import { useLang } from "@/lib/language";
import { experience, sectionLabels } from "@/data/resume-data";

function RoleIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground flex-shrink-0">
      ⟨/⟩
    </span>
  );
}

export function ExperienceSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];
  const { openIndex, toggle } = useAccordion();

  return (
    <SectionWrapper heading={labels.experience}>
      <div className="p-4 space-y-8">
        {experience.map((entry, i) => (
          <div key={i} className="space-y-2">
            {/* Company name with bullet */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-medium text-foreground hover:underline"
              >
                {entry.company}
              </a>
            </div>

            <AccordionItem
              icon={<RoleIcon />}
              title={entry.title}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              staticContent={
                <>
                  <div className="ml-4 pl-7 font-mono text-xs text-muted-foreground">
                    {entry.type[lang]} | {entry.startDate} – {entry.endDate}
                  </div>
                  <div className="ml-4 pl-7 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </>
              }
              maxHeight="max-h-80"
            >
              <p className="text-sm text-muted-foreground">{entry.description[lang]}</p>
              {entry.bullets && (
                <ul className="space-y-1">
                  {entry.bullets[lang].map((b) => (
                    <BulletItem key={b}>{b}</BulletItem>
                  ))}
                </ul>
              )}
            </AccordionItem>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
