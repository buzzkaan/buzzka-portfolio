"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SpotifyIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "@/lib/language";
import { about, sectionLabels } from "@/data/resume-data";
import type { SpotifyTrack } from "@/lib/spotify";

export function AboutSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        if (data.title) setTrack(data);
      } catch {
        /* silent */
      }
    }
    fetchTrack();
    const interval = setInterval(fetchTrack, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section data-slot="panel" className="screen-line-before screen-line-after border-x border-edge">
      <SectionHeading>{labels.about}</SectionHeading>
      <div data-slot="panel-body" className="p-4 space-y-4">
        <div className="max-w-none font-mono text-sm leading-relaxed text-foreground/80">
          <ul className="list-disc space-y-3 pl-5 marker:text-muted-foreground/50">
            {about[lang].map((paragraph, i) => (
              <li key={i}>{paragraph}</li>
            ))}
          </ul>
        </div>

        {/* Spotify now playing card — only shown when API returns data */}
        {track && (
          <div className="mx-auto w-full max-w-sm">
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-edge bg-background px-4 py-3 text-sm shadow-sm transition-all duration-300 hover:bg-muted/50 hover:shadow-md"
            >
              <div className="relative h-16 w-16 shrink-0">
                {track.albumImageUrl ? (
                  <Image
                    src={track.albumImageUrl}
                    alt={track.title}
                    width={64}
                    height={64}
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black shadow-xl" />
                    <div className="absolute inset-[5px] overflow-hidden bg-muted" />
                    <div className="absolute inset-0 ring-1 ring-black/50" />
                  </>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 leading-tight">
                <span className="flex items-center gap-1.5 font-mono text-xs leading-none text-muted-foreground">
                  <span className={`h-1.5 w-1.5 rounded-full ${track.isPlaying ? "bg-green-500 animate-pulse" : "bg-neutral-400"}`} />
                  <span>{track.isPlaying ? labels.nowPlaying : labels.lastPlayed}</span>
                </span>
                <div className="overflow-hidden font-mono text-[15px] leading-snug font-semibold">
                  <span className="block truncate">{track.title}</span>
                </div>
                <div className="overflow-hidden font-mono text-xs leading-none text-muted-foreground">
                  <span className="block truncate">{track.artist}</span>
                </div>
              </div>
              <SpotifyIcon size={24} className="shrink-0 text-neutral-400 hover:text-green-500 dark:text-neutral-500 dark:hover:text-green-400 transition-all duration-200" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
