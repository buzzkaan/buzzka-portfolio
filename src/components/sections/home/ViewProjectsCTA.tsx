"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useLang } from "@/lib/language";

export function ViewProjectsCTA() {
  const { lang } = useLang();

  return (
    <section className="screen-line-before screen-line-after pixel-copy border-x border-edge">
      <Link
        href="/projects"
        className="group flex flex-col items-center justify-center gap-2 py-8 ui-transition hover:bg-muted/30 active:translate-y-px"
      >
        <span className="ui-text-control ui-transition-color group-hover:text-foreground">
          {lang === "tr" ? "Projelerimi Gör" : "View My Projects"}
        </span>
        <ArrowDown className="h-5 w-5 animate-bounce text-muted-foreground/60 ui-transition-color group-hover:text-foreground" />
      </Link>
    </section>
  );
}
