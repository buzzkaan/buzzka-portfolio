"use client";

import { SectionWrapper } from "./SectionWrapper";
import { useLang } from "@/lib/language";
import { certifications, sectionLabels } from "@/data/resume-data";

export function CertificationsSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <SectionWrapper heading={labels.certifications}>
      <div className="p-4 space-y-4">
        {certifications.map((cert) => (
          <div key={cert.title} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
            <div className="space-y-0.5">
              <span className="font-mono text-sm font-medium text-foreground">{cert.title}</span>
              <div className="font-mono text-xs text-muted-foreground">
                {cert.provider} — {cert.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
