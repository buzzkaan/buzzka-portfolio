"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/language";
import { searchItems } from "@/data/resume-data";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const close = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, open]);

  const items = searchItems[lang];
  const filtered = query
    ? items.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]"
      onClick={close}
    >
      <div className="absolute inset-0 bg-zinc-950/60" />
      <div
        className="relative mx-4 flex max-h-[70dvh] w-full max-w-md flex-col overflow-hidden border border-border bg-popover shadow-2xl ui-transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Search size={14} className="text-muted-foreground flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ui-text-body flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={close}
            className="cursor-pointer text-muted-foreground ui-transition hover:text-foreground active:translate-y-px"
          >
            <X size={14} />
          </button>
        </div>

        <div className="py-2 overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <p className="ui-text-body px-4 py-3">
              No results found.
            </p>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex flex-col gap-0.5 px-4 py-2.5 ui-transition-color hover:bg-accent active:bg-accent"
              >
                <span className="ui-text-label text-foreground">{item.label}</span>
                <span className="ui-text-meta">{item.desc}</span>
              </Link>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-border">
          <span className="ui-text-meta">
            Press <kbd>Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
