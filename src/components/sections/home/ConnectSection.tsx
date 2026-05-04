"use client";

import { LinkButton } from "@/components/ui/LinkButton";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useLang } from "@/lib/language";
import { connectLinks, sectionLabels, resolve } from "@/data/resume-data";

export function ConnectSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <SectionWrapper heading={labels.connect}>
      <div className="px-4 py-4 sm:px-6">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4">
          {connectLinks.map(({ label, href, Icon, external }) => (
            <LinkButton
              key={href}
              href={href}
              external={external}
              className="group h-9 justify-center gap-1.5 whitespace-nowrap bg-background px-2 shadow-sm touch-manipulation hover:bg-muted/50 hover:shadow-md sm:gap-2 sm:px-3"
            >
              <Icon size={14} className="shrink-0 text-foreground/80 ui-transition-color group-hover:text-foreground" />
              <span className="ui-text-control ui-transition-color group-hover:text-foreground">
                {resolve(label, lang)}
              </span>
            </LinkButton>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
