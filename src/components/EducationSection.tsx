"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="screen-line-before screen-line-after border-x border-edge">
      <SectionHeading>{labels.education}</SectionHeading>
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

            {/* Degree row: icon + degree + expand (clickable) */}
            <button
              type="button"
              onClick={() => toggle(i)}
              className="ml-4 flex w-[calc(100%-1rem)] items-center justify-between gap-2 cursor-pointer  px-1 -mx-1 py-0.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <EducationIcon />
                <span className="font-mono text-sm font-semibold text-foreground">{entry.degree[lang]}</span>
              </div>
              <ChevronsUpDown
                size={14}
                className={`text-muted-foreground/40 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dates + highlights - always visible */}
            <div className="ml-4 pl-7 font-mono text-xs text-muted-foreground">
              {entry.startYear} – {entry.endYear}
            </div>
            {entry.highlights && (
              <ul className="ml-4 pl-7 space-y-1">
                {entry.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Description - expandable */}
            <div
              className={`ml-4 pl-7 overflow-hidden transition-all duration-200 ${
                openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-muted-foreground">
                {entry.description[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
