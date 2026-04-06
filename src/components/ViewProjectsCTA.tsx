"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useLang } from "@/lib/language";

export function ViewProjectsCTA() {
  const { lang } = useLang();

  return (
    <section className="screen-line-before screen-line-after border-x border-edge">
      <Link
        href="/projects"
        className="group flex flex-col items-center justify-center gap-2 py-8 transition-colors hover:bg-muted/30"
      >
        <span className="font-pixel text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {lang === "tr" ? "Projelerimi Gör" : "View My Projects"}
        </span>
        <ArrowDown className="h-5 w-5 text-muted-foreground/50 group-hover:text-foreground transition-colors animate-bounce" />
      </Link>
    </section>
  );
}
