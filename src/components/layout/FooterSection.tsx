"use client";

import { CornerCross } from "@/components/decorative/Decorative";
import { PixelCat } from "@/components/decorative/PixelCat";
import { useLang } from "@/lib/language";
import { profile } from "@/data/resume-data";

export function FooterSection() {
  const { lang } = useLang();

  return (
    <div className="screen-line-before screen-line-after pixel-copy relative mx-auto border-x border-edge pt-0.5 md:max-w-3xl">
      <CornerCross position="bottom-left" />
      <CornerCross position="bottom-right" />

      <div className="flex min-h-16 items-center justify-between px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-1 leading-tight">
          <span className="ui-text-caption text-muted-foreground">{profile.footer.copyright}</span>
          <span className="ui-text-caption text-muted-foreground">{profile.footer.tagline[lang]}</span>
        </div>
        <PixelCat />
      </div>
    </div>
  );
}
