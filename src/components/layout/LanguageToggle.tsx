"use client";

import { useLang } from "@/lib/language";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "tr" : "en")}
      className="ui-text-control inline-flex size-8 cursor-pointer items-center justify-center border border-input bg-background font-semibold text-muted-foreground shadow-xs select-none ui-transition hover:bg-accent hover:text-foreground active:translate-y-px dark:bg-input/30 dark:hover:bg-input/30"
      aria-label="Toggle language"
    >
      {lang === "en" ? "TR" : "EN"}
    </button>
  );
}
