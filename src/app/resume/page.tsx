"use client";

import { NavBar } from "@/components/NavBar";
import { DottedPattern, StripeDivider, CornerCross } from "@/components/Decorative";
import { SectionHeading } from "@/components/SectionHeading";
import { FooterSection } from "@/components/FooterSection";
import { useLang } from "@/lib/language";
import { sectionLabels } from "@/data/resume-data";

export default function ResumePage() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <>
      <NavBar />
      <main className="max-w-screen overflow-x-hidden px-2">
        <div className="mx-auto md:max-w-3xl">
          <DottedPattern />
          <StripeDivider />

          <section className="screen-line-before screen-line-after relative border-x border-edge">
            <CornerCross position="top-left" />
            <CornerCross position="top-right" />

            <SectionHeading>{labels.resume}</SectionHeading>

            <div className="p-4">
              <iframe
                src="/resume.pdf"
                title="Resume"
                className="h-[80vh] w-full  border border-edge"
              />
            </div>

            <div className="px-4 pb-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2  border border-edge bg-muted/30 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {labels.download}
              </a>
            </div>

            <CornerCross position="bottom-left" />
            <CornerCross position="bottom-right" />
          </section>

          <StripeDivider />
        </div>
      </main>
      <footer className="max-w-screen px-2">
        <FooterSection />
        <div className="mx-auto md:max-w-3xl">
          <DottedPattern />
        </div>
      </footer>
    </>
  );
}
