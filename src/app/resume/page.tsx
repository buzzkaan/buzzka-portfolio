import { StripeDivider } from "@/components/decorative/Decorative";
import { SiteShell } from "@/components/layout/SiteShell";
import { ResumeViewerSection } from "@/components/sections/resume/ResumeViewerSection";

export default function ResumePage() {
  return (
    <SiteShell>
      <StripeDivider />
      <ResumeViewerSection />
      <StripeDivider />
    </SiteShell>
  );
}
