"use client";

import { CodeXml } from "lucide-react";
import { BulletItem } from "@/components/ui/BulletItem";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Tag } from "@/components/ui/Tag";
import { TimelineAccordionItem } from "@/components/ui/TimelineAccordionItem";
import { useAccordion } from "@/hooks/useAccordion";
import { useLang } from "@/lib/language";
import { experience, sectionLabels } from "@/data/resume-data";

function RoleIcon() {
  return (
    <span className="flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <CodeXml size={12} strokeWidth={1.75} />
    </span>
  );
}

export function ExperienceSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];
  const { openIndex, toggle } = useAccordion();

  return (
    <SectionWrapper heading={labels.experience}>
      <div className="flex flex-col gap-8 px-4 py-4 sm:px-6">
        {experience.map((entry, i) => (
          <TimelineAccordionItem
            key={`${entry.company}-${entry.title}`}
            icon={<RoleIcon />}
            title={entry.title}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
            marker={
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-text-label block truncate underline-offset-2 ui-transition-color hover:text-muted-foreground hover:underline"
              >
                {entry.company}
              </a>
            }
            staticContent={
              <>
                <div className="ui-text-meta ml-4 min-w-0 pl-7">
                  {entry.type[lang]} | {entry.startDate} - {entry.endDate}
                </div>
                <div className="ml-4 flex min-w-0 flex-wrap gap-1.5 pl-7">
                  {entry.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </>
            }
            maxHeight="max-h-80"
          >
            <p className="ui-text-body">{entry.description[lang]}</p>
            {entry.bullets && (
              <ul className="flex flex-col gap-1">
                {entry.bullets[lang].map((bullet) => (
                  <BulletItem key={bullet}>{bullet}</BulletItem>
                ))}
              </ul>
            )}
          </TimelineAccordionItem>
        ))}
      </div>
    </SectionWrapper>
  );
}
