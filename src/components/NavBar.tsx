"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { SearchModal } from "./SearchModal";
import { useLang } from "@/lib/language";
import { useClickOutside } from "@/hooks/useClickOutside";
import { profile, navMoreLinks, sectionLabels, resolve } from "@/data/resume-data";

export function NavBar() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMore = useCallback(() => setMoreOpen(false), []);
  useClickOutside(moreRef, closeMore);

  return (
    <>
      <header className="sticky top-0 z-50 overflow-x-clip bg-background px-2 pt-2">
        <div className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 sm:gap-4 md:max-w-3xl">
          <Link href="/" aria-label="Home">
            <Image src="/icon.svg" alt={profile.name} width={36} height={36} className="h-9 w-9" />
          </Link>

          <div className="flex-1" />

          {/* Desktop nav */}
          <nav className="flex items-center gap-4 max-sm:hidden">
            <Link
              href="/"
              className="font-mono text-sm font-medium text-foreground transition-colors duration-300 hover:text-foreground"
            >
              {labels.home}
            </Link>
            <Link
              href="/projects"
              className="font-mono text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {labels.projects}
            </Link>

            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className="flex items-center gap-1 font-mono text-sm font-medium text-muted-foreground transition-colors duration-300 outline-none hover:text-foreground cursor-pointer"
              >
                {labels.more}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 border border-edge bg-popover py-1 shadow-lg z-50">
                  {navMoreLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="block px-3 py-1.5 font-mono text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      {resolve(link.label, lang)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side: search + theme + mobile menu */}
          <div className="flex items-center">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center justify-center h-8 gap-1.5 border border-input bg-background px-2.5 text-muted-foreground shadow-xs select-none hover:bg-muted/50 dark:bg-input/30 dark:hover:bg-input/30 cursor-pointer mr-2"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
                <path
                  d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-mono text-xs font-medium sm:hidden">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 items-center justify-center gap-1 px-1 font-mono text-[11px] font-normal text-muted-foreground select-none bg-black/5 border border-edge dark:bg-white/10 min-w-5">
                  Ctrl
                </kbd>
                <kbd className="pointer-events-none inline-flex h-5 w-5 min-w-5 items-center justify-center gap-1 px-1 font-mono text-[11px] font-normal text-muted-foreground select-none bg-black/5 border border-edge dark:bg-white/10">
                  K
                </kbd>
              </kbd>
            </button>

            <span className="mx-2 flex h-4 w-px bg-border" />

            <LanguageToggle />

            <span className="mx-1 flex h-4 w-px bg-border" />

            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
