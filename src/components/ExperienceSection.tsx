"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="screen-line-before screen-line-after border-x border-edge">
      <SectionHeading>{labels.experience}</SectionHeading>
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

            {/* Role row: icon + title + expand (clickable) */}
            <button
              type="button"
              onClick={() => toggle(i)}
              className="ml-4 flex w-[calc(100%-1rem)] items-center justify-between gap-2 cursor-pointer  px-1 -mx-1 py-0.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <RoleIcon />
                <span className="font-mono text-sm font-semibold text-foreground">{entry.title}</span>
              </div>
              <ChevronsUpDown
                size={14}
                className={`text-muted-foreground/40 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>

            {/* Type + dates + tags - always visible */}
            <div className="ml-4 pl-7 font-mono text-xs text-muted-foreground">
              {entry.type[lang]} | {entry.startDate} – {entry.endDate}
            </div>
            <div className="ml-4 pl-7 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center  border border-edge bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description + bullets - expandable */}
            <div
              className={`ml-4 pl-7 space-y-2 overflow-hidden transition-all duration-200 ${
                openIndex === i ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-muted-foreground">
                {entry.description[lang]}
              </p>
              {entry.bullets && (
                <ul className="space-y-1">
                  {entry.bullets[lang].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
