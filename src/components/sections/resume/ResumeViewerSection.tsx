"use client";

import { CornerCross } from "@/components/decorative/Decorative";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionLabels } from "@/data/resume-data";
import { useLang } from "@/lib/language";

export function ResumeViewerSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <section className="screen-line-before screen-line-after pixel-copy relative border-x border-edge">
      <CornerCross position="top-left" />
      <CornerCross position="top-right" />

      <SectionHeading>{labels.resume}</SectionHeading>

      <div className="p-4">
        <iframe
          src="/resume.pdf"
          title="Resume"
          className="h-[80vh] w-full border border-edge"
        />
      </div>

      <div className="px-4 pb-4">
        <LinkButton href="/resume.pdf" download className="gap-2 px-4 py-2">
          {labels.download}
        </LinkButton>
      </div>

      <CornerCross position="bottom-left" />
      <CornerCross position="bottom-right" />
    </section>
  );
}
