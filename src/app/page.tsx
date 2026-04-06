import { NavBar } from "@/components/NavBar";
import { DottedPattern, StripeDivider } from "@/components/Decorative";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ConnectSection } from "@/components/ConnectSection";
import { GitHubActivitySection } from "@/components/GitHubActivitySection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { QuoteSection } from "@/components/QuoteSection";
import { ViewProjectsCTA } from "@/components/ViewProjectsCTA";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="max-w-screen overflow-x-hidden px-2">
        <div className="mx-auto md:max-w-3xl">
          <DottedPattern />
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
