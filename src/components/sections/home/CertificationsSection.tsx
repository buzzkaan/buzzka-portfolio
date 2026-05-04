"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useLang } from "@/lib/language";
import { certifications, sectionLabels } from "@/data/resume-data";

export function CertificationsSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <SectionWrapper heading={labels.certifications}>
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6">
        {certifications.map((cert) => (
          <div key={cert.title} className="flex items-start gap-2">
            <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-muted-foreground/50" />
            <div className="flex flex-col gap-0.5">
              <span className="ui-text-label">{cert.title}</span>
              <div className="ui-text-meta">
                {cert.provider} — {cert.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
