import { type ReactNode } from "react";
import { DottedPattern } from "@/components/decorative/Decorative";
import { FooterSection } from "@/components/layout/FooterSection";
import { NavBar } from "@/components/layout/NavBar";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <NavBar />
      <main className="max-w-screen overflow-x-hidden px-2">
        <div className="mx-auto md:max-w-3xl">
          <DottedPattern />
          {children}
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
