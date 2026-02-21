"use client";

import { usePathname } from "next/navigation";
import { LANGS, type Lang } from "@/lib/constants";

const NOTEBOOK_URL =
  "https://notebooklm.google.com/notebook/bb775ea3-7895-453b-a664-a3c0371982cd";

const LABELS: Record<Lang, string> = {
  en: "Ask AI",
  ko: "AI에게 질문",
  ne: "AI लाई सोध्नुहोस्",
  id: "Tanya AI",
  ja: "AIに質問",
  mn: "AI-аас асуух",
  ru: "Спросить AI",
  zh: "问AI",
};

export default function ChatButton() {
  const pathname = usePathname();
  const lang = (LANGS.find((l) => pathname.startsWith(`/${l}`)) || "en") as Lang;

  return (
    <a
      href={NOTEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 pl-3.5 pr-4 py-2.5
                 bg-[var(--primary)] text-white rounded-full shadow-lg
                 hover:shadow-xl hover:scale-105 transition-all text-sm font-medium"
      title={LABELS[lang]}
    >
      {/* Robot icon */}
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <line x1="12" y1="7" x2="12" y2="11" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
        <line x1="1" y1="15" x2="3" y2="15" />
        <line x1="21" y1="15" x2="23" y2="15" />
      </svg>
      <span className="hidden sm:inline">{LABELS[lang]}</span>
    </a>
  );
}
