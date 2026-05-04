import { StripeDivider } from "@/components/decorative/Decorative";
import { SiteShell } from "@/components/layout/SiteShell";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { CertificationsSection } from "@/components/sections/home/CertificationsSection";
import { ConnectSection } from "@/components/sections/home/ConnectSection";
import { EducationSection } from "@/components/sections/home/EducationSection";
import { ExperienceSection } from "@/components/sections/home/ExperienceSection";
import { GitHubActivitySection } from "@/components/sections/home/GitHubActivitySection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { QuoteSection } from "@/components/sections/home/QuoteSection";
import { ViewProjectsCTA } from "@/components/sections/home/ViewProjectsCTA";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <StripeDivider />
      <AboutSection />
      <StripeDivider />
      <ConnectSection />
      <StripeDivider />
      <GitHubActivitySection />
      <StripeDivider />
      <ExperienceSection />
      <StripeDivider />
      <EducationSection />
      <StripeDivider />
      <CertificationsSection />
      <StripeDivider />
      <ViewProjectsCTA />
      <StripeDivider />
      <QuoteSection />
      <StripeDivider />
    </SiteShell>
  );
}
