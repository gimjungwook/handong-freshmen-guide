"use client";

import { usePathname, useRouter } from "next/navigation";
import { LANGS, LANG_LABELS, getFlagUrl, type Lang } from "@/lib/constants";
import { useState, useRef, useEffect } from "react";

export default function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = (LANGS.find((l) => pathname.startsWith(`/${l}`)) || "en") as Lang;
  const current = LANG_LABELS[currentLang];

  const switchTo = (lang: Lang) => {
    if (lang === currentLang) {
      setOpen(false);
      return;
    }
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${lang}`);
    localStorage.setItem("preferred-lang", lang);
    router.push(newPath);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium
                   hover:bg-[var(--sidebar-hover)] transition-colors text-[var(--foreground)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={getFlagUrl(current.flag, 20)} alt="" className="w-5 h-auto rounded-sm" />
        {current.name}
        <svg className={`w-3 h-3 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-1 bg-[var(--background)] border border-[var(--border)] rounded-md shadow-lg py-1 min-w-[150px] z-50">
          {LANGS.map((lang) => {
            const l = LANG_LABELS[lang];
            return (
              <button
                key={lang}
                onClick={() => switchTo(lang)}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-xs transition-colors ${
                  lang === currentLang
                    ? "bg-[var(--sidebar-active)] font-medium text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--foreground)]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getFlagUrl(l.flag, 20)} alt="" className="w-5 h-auto rounded-sm" />
                {l.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
