"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { VerifiedBadge } from "./icons";
import { CornerCross } from "./Decorative";
import { LiveStatus } from "./LiveStatus";
import { useLang } from "@/lib/language";
import { profile } from "@/data/resume-data";

export function HeroSection() {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % profile.avatars.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen-line-after relative flex border-x border-edge">
      <CornerCross position="top-left" />
      <CornerCross position="top-right" />

      {/* Avatar */}
      <div className="w-[35%] shrink-0 p-2 sm:w-auto sm:shrink-0 sm:p-5">
        <div className="relative aspect-square h-auto w-full overflow-hidden border border-border p-1 sm:size-32">
          {profile.avatars.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={profile.name}
              width={130}
              height={130}
              className={`absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
              priority={i === 0}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-center gap-1 pl-2 sm:pl-4">
        <div className="flex items-center justify-between pr-2 sm:pr-4">
          <span className="text-muted-foreground text-xs">{"\u24D8"}</span>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Eye size={14} />
            <span>{profile.views}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2 pb-2">
          <h1 className="font-pixel text-2xl font-black leading-none sm:text-4xl text-foreground tracking-wider">
            {profile.name}
          </h1>
          <VerifiedBadge size={18} />
        </div>

        <p className="font-mono text-sm leading-snug text-muted-foreground">
          {profile.age} &bull; {profile.title[lang]}
        </p>

        <LiveStatus />
      </div>
    </div>
  );
}
