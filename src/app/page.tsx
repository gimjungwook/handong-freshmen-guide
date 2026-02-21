"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LANGS, LANG_LABELS, NAV_ITEMS, getFlagUrl, type Lang } from "@/lib/constants";

export default function LandingPage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<Lang | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("preferred-lang") as Lang | null;
    if (saved && LANGS.includes(saved as Lang)) {
      setSelectedLang(saved);
    }
  }, []);

  const handleLangSelect = (lang: Lang) => {
    setSelectedLang(lang);
    localStorage.setItem("preferred-lang", lang);
  };

  const handleStart = () => {
    if (selectedLang) {
      router.push(`/${selectedLang}`);
    }
  };

  const items = selectedLang ? NAV_ITEMS[selectedLang] : NAV_ITEMS["en"];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-10 max-w-2xl">
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Handong Freshman Guide
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          2026 Spring Course Registration Guide
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">
          한동대학교 새내기 수강신청 가이드
        </p>
      </div>

      {/* Language Selection */}
      <div className="w-full max-w-lg mb-8">
        <p className="text-sm text-[var(--muted)] text-center mb-3">
          Select your language
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LANGS.map((lang) => {
            const { flag, name } = LANG_LABELS[lang];
            const isSelected = selectedLang === lang;
            return (
              <button
                key={lang}
                onClick={() => handleLangSelect(lang)}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                    : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <img
                  src={getFlagUrl(flag, 20)}
                  alt={name}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span>{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course Cards */}
      {selectedLang && (
        <div className="w-full max-w-lg mb-8 animate-in fade-in duration-300">
          <p className="text-sm text-[var(--muted)] text-center mb-3">
            {selectedLang === "ko" ? "읽고 싶은 섹션을 선택하세요" : "Choose a section to read"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item) => {
              const href = item.slug === "hub" ? `/${selectedLang}` : `/${selectedLang}/${item.slug}`;
              return (
                <a
                  key={item.slug}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] transition-all group"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={!selectedLang}
        className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
          selectedLang
            ? "bg-[var(--primary)] text-white hover:opacity-90 cursor-pointer"
            : "bg-[var(--surface)] text-[var(--muted)] cursor-not-allowed"
        }`}
      >
        {selectedLang === "ko" ? "가이드 시작하기 →" : "Start Guide →"}
      </button>

      {/* Footer credits */}
      <p className="mt-12 text-xs text-[var(--muted)] text-center">
        Built by <strong>Jungwook Kim</strong> & <strong>Claude Opus 4.6</strong>
      </p>
    </div>
  );
}
