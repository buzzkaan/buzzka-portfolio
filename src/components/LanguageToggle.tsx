"use client";

import { useLang } from "@/lib/language";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "tr" : "en")}
      className="inline-flex h-8 w-8 items-center justify-center border border-input bg-background text-xs font-mono font-semibold text-muted-foreground shadow-xs select-none hover:bg-accent hover:text-foreground dark:bg-input/30 dark:hover:bg-input/30 cursor-pointer transition-colors"
      aria-label="Toggle language"
    >
      {lang === "en" ? "TR" : "EN"}
    </button>
  );
}
