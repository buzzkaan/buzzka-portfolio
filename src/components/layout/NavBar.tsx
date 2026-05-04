"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { SearchModal } from "@/components/modals/SearchModal";
import { useLang } from "@/lib/language";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { navMoreLinks, sectionLabels, resolve } from "@/data/resume-data";

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
        <div className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 sm:px-5 sm:gap-4 md:max-w-3xl">
          <Link href="/" aria-label="Home" className="text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 9" fill="none" width="36" height="18" aria-hidden="true">
              <g fill="currentColor">
                <rect x="0" y="0" width="2" height="9"/><rect x="4" y="0" width="2" height="2"/><rect x="3" y="2" width="2" height="1"/><rect x="2" y="3" width="2" height="1"/><rect x="2" y="4" width="3" height="1"/><rect x="3" y="5" width="2" height="1"/><rect x="4" y="6" width="2" height="1"/><rect x="5" y="7" width="2" height="2"/>
                <rect x="9" y="0" width="2" height="9"/><rect x="11" y="0" width="3" height="2"/><rect x="14" y="1" width="2" height="2"/><rect x="15" y="3" width="2" height="3"/><rect x="14" y="6" width="2" height="2"/><rect x="11" y="7" width="3" height="2"/>
              </g>
            </svg>
          </Link>

          <div className="flex-1" />

          {/* Desktop nav */}
          <nav className="flex items-center gap-4 max-sm:hidden">
            <Link
              href="/"
              className="ui-text-label text-foreground ui-transition-color hover:text-muted-foreground"
            >
              {labels.home}
            </Link>
            <Link
              href="/projects"
              className="ui-text-label text-muted-foreground ui-transition-color hover:text-foreground"
            >
              {labels.projects}
            </Link>

            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className="ui-text-label flex cursor-pointer items-center gap-1 text-muted-foreground outline-none ui-transition hover:text-foreground active:translate-y-px"
              >
                {labels.more}
                <ChevronDown
                  size={12}
                  className={cn("ui-transition", moreOpen && "rotate-180")}
                />
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 z-50 mt-1 w-40 border border-edge bg-popover py-1 shadow-lg">
                  {navMoreLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="ui-text-label block px-3 py-1.5 text-muted-foreground ui-transition-color hover:bg-accent hover:text-foreground"
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
              className="mr-2 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 border border-input bg-background px-2.5 text-muted-foreground shadow-xs select-none ui-transition hover:bg-muted/50 hover:text-foreground active:translate-y-px dark:bg-input/30 dark:hover:bg-input/30"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
                <path
                  d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ui-text-control sm:hidden">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-1">
                <kbd className="ui-text-caption pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 border border-edge bg-foreground/5 px-1 font-normal text-muted-foreground select-none dark:bg-foreground/10">
                  Ctrl
                </kbd>
                <kbd className="ui-text-caption pointer-events-none inline-flex size-5 min-w-5 items-center justify-center gap-1 border border-edge bg-foreground/5 px-1 font-normal text-muted-foreground select-none dark:bg-foreground/10">
                  K
                </kbd>
              </kbd>
            </button>

            <span className="mx-2 flex h-4 min-w-px bg-border" />

            <LanguageToggle />

            <span className="mx-1 flex h-4 min-w-px bg-border" />

            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
