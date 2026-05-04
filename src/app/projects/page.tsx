import { StripeDivider } from "@/components/decorative/Decorative";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";

export default function Projects() {
  return (
    <SiteShell>
      <StripeDivider />
      <ProjectsSection />
      <StripeDivider />
    </SiteShell>
  );
}
