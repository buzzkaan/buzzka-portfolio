"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SpotifyIcon } from "@/components/ui/icons";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useLang } from "@/lib/language";
import { cn } from "@/lib/utils";
import { about, sectionLabels } from "@/data/resume-data";
import type { SpotifyTrack } from "@/lib/spotify";

export function AboutSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        if (data.title) setTrack(data);
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    }
    fetchTrack();
    const interval = setInterval(fetchTrack, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper heading={labels.about}>
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6">
        <div className="max-w-none">
          <ul className="ui-text-body flex list-disc flex-col gap-3 pl-5 marker:text-muted-foreground/60">
            {about[lang].map((paragraph, i) => (
              <li key={i}>{paragraph}</li>
            ))}
          </ul>
        </div>

        {/* Spotify now playing card */}
        {loading && (
          <div className="mx-auto w-full max-w-sm animate-pulse">
            <div className="flex items-center gap-3 border border-edge bg-background px-4 py-3">
              <div className="size-16 shrink-0 bg-muted-foreground/10" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="h-2.5 w-20 rounded bg-muted-foreground/10" />
                <div className="h-4 w-36 rounded bg-muted-foreground/15" />
                <div className="h-3 w-24 rounded bg-muted-foreground/10" />
              </div>
              <div className="size-6 shrink-0 rounded-full bg-muted-foreground/10" />
            </div>
          </div>
        )}
        {!loading && track && (
          <div className="mx-auto w-full max-w-sm">
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-edge bg-background px-4 py-3 shadow-sm ui-transition hover:bg-muted/50 hover:shadow-md active:translate-y-px"
            >
              <div className="relative size-16 shrink-0">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-950 shadow-xl" />
                    <div className="absolute inset-[5px] overflow-hidden bg-muted" />
                    <div className="absolute inset-0 ring-1 ring-foreground/20" />
                  </>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 leading-tight">
                <span className="ui-text-caption flex items-center gap-1.5">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      track.isPlaying ? "animate-pulse bg-green-500" : "bg-muted-foreground/60",
                    )}
                  />
                  <span>{track.isPlaying ? labels.nowPlaying : labels.lastPlayed}</span>
                </span>
                <div className="ui-text-title overflow-hidden">
                  <span className="block truncate">{track.title}</span>
                </div>
                <div className="ui-text-meta overflow-hidden">
                  <span className="block truncate">{track.artist}</span>
                </div>
              </div>
              <SpotifyIcon size={24} className="shrink-0 text-muted-foreground ui-transition-color hover:text-green-500 dark:hover:text-green-400" />
            </a>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
