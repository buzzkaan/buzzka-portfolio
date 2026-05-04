"use client";

import { Eye, Info } from "lucide-react";
import { CornerCross } from "@/components/decorative/Decorative";
import { PixelAvatar } from "@/components/decorative/PixelAvatar";
import { VerifiedBadge } from "@/components/ui/icons";
import { LiveStatus } from "./LiveStatus";
import { useLang } from "@/lib/language";
import { profile } from "@/data/resume-data";

export function HeroSection() {
  const { lang } = useLang();

  return (
    <div className="screen-line-after pixel-copy relative flex border-x border-edge">
      <CornerCross position="top-left" />
      <CornerCross position="top-right" />

      {/* Avatar */}
      <div className="w-[35%] shrink-0 p-2 sm:w-auto sm:shrink-0 sm:p-5">
        <PixelAvatar srcs={profile.avatars} alt={profile.name} />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-center gap-1 pl-2 sm:pl-4">
        <div className="flex items-center justify-between pr-2 sm:pr-4">
          <Info size={12} className="text-muted-foreground" />
          <span className="ui-text-caption flex items-center gap-1">
            <Eye size={14} />
            <span>{profile.views}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2 pb-2">
          <h1 className="font-pixel text-2xl font-black leading-none text-foreground sm:text-4xl">
            {profile.name}
          </h1>
          <VerifiedBadge size={18} />
        </div>

        <p className="ui-text-body leading-snug">
          {profile.age} &bull; {profile.title[lang]}
        </p>

        <LiveStatus />
      </div>
    </div>
  );
}
