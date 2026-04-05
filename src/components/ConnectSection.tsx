"use client";

import { SectionHeading } from "./SectionHeading";
import { useLang } from "@/lib/language";
import { connectLinks, sectionLabels, resolve } from "@/data/resume-data";

export function ConnectSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <section className="screen-line-before screen-line-after border-x border-edge">
      <SectionHeading>{labels.connect}</SectionHeading>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-3 overflow-visible pb-1 sm:gap-4">
          {connectLinks.map(({ label, href, Icon, external }) => (
            <a
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="touch-manipulation active:opacity-75"
            >
              <div className="justify-center border transition-all duration-200 border-edge bg-background hover:bg-muted/50 shadow-sm hover:shadow-md h-9 px-3 flex items-center gap-2 whitespace-nowrap select-none">
                <Icon size={14} className="shrink-0 text-neutral-800 dark:text-white/80" />
                <span className="font-mono text-xs font-medium leading-none text-neutral-800 dark:text-white/80">{resolve(label, lang)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
