"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/language";

const ALL_ITEMS = {
  en: [
    { label: "Home", href: "/", desc: "Back to homepage" },
    { label: "Projects", href: "/projects", desc: "View all projects" },
    { label: "About", href: "/#about", desc: "Jump to section" },
    { label: "Experience", href: "/#experience", desc: "Jump to section" },
    { label: "Education", href: "/#education", desc: "Jump to section" },
    { label: "Connect", href: "/#connect", desc: "Jump to section" },
  ],
  tr: [
    { label: "Ana Sayfa", href: "/", desc: "Ana sayfaya dön" },
    { label: "Projeler", href: "/projects", desc: "Tüm projeleri gör" },
    { label: "Hakkımda", href: "/#about", desc: "Bölüme git" },
    { label: "Deneyim", href: "/#experience", desc: "Bölüme git" },
    { label: "Eğitim", href: "/#education", desc: "Bölüme git" },
    { label: "İletişim", href: "/#connect", desc: "Bölüme git" },
  ],
};

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { lang } = useLang();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const items = ALL_ITEMS[lang];
  const filtered = query
    ? items.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-md mx-4 max-h-[70dvh] flex flex-col border border-border bg-popover shadow-2xl overflow-hidden"
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
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <div className="py-2 overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              No results found.
            </p>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-accent active:bg-accent transition-colors duration-100"
              >
                <span className="text-sm text-foreground">{item.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{item.desc}</span>
              </Link>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground">
            Press <kbd>Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
