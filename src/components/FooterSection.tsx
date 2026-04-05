"use client";

import { CornerCross } from "./Decorative";
import { PixelCat } from "./PixelCat";
import { useLang } from "@/lib/language";
import { profile } from "@/data/resume-data";

export function FooterSection() {
  const { lang } = useLang();

  return (
    <div className="screen-line-before screen-line-after relative mx-auto border-x border-edge pt-0.5 md:max-w-3xl">
      <CornerCross position="bottom-left" />
      <CornerCross position="bottom-right" />

      <div className="flex items-center justify-between px-4 pb-4">
        <div className="mt-6 flex flex-col leading-none">
          <span className="font-mono text-[12px] text-muted-foreground">{profile.footer.copyright}</span>
          <span className="font-mono text-[12px] text-muted-foreground">{profile.footer.tagline[lang]}</span>
        </div>
        <PixelCat />
      </div>
    </div>
  );
}
