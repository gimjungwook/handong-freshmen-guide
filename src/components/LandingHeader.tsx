"use client";

import { LANGS, LANG_LABELS, NAV_ITEMS, getFlagUrl, type Lang } from "@/lib/constants";
import { useRouter, usePathname } from "next/navigation";

const PROMO_TEXT: Record<Lang, { title: string; desc: string }> = {
  ko: { title: "이 가이드, AI가 만들었다면 믿어지나요?", desc: "이 사이트 만든 선배가 AI 활용법도 가르쳐줍니다 →" },
  en: { title: "This guide was built with AI. Wanna learn how?", desc: "The senior who made this site teaches AI skills too →" },
  ja: { title: "このガイド、AIで作ったって信じる？", desc: "作った先輩がAI活用法も教えてるよ →" },
  zh: { title: "这个指南是用AI做的，信吗？", desc: "做这个网站的学长也教AI技巧 →" },
  mn: { title: "Энэ гарын авлагыг AI-аар хийсэн гэж итгэх үү?", desc: "Үүнийг бүтээсэн ахлах оюутан AI заадаг →" },
  ru: { title: "Этот гайд сделан с помощью AI. Хочешь научиться?", desc: "Автор этого сайта ещё и учит пользоваться AI →" },
  ne: { title: "यो गाइड AI ले बनाएको हो, विश्वास लाग्छ?", desc: "बनाउने दाइले AI पनि सिकाउँछन् →" },
  id: { title: "Guide ini dibuat pakai AI. Mau belajar caranya?", desc: "Kakak yang bikin ini juga ngajarin AI lho →" },
};

export default function LandingHeader({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();
  const items = NAV_ITEMS[lang];
  const promo = PROMO_TEXT[lang];

  const handleLangSwitch = (newLang: Lang) => {
    localStorage.setItem("preferred-lang", newLang);
    router.push(`/${newLang}`);
  };

  return (
    <div className="mb-8">
      {/* Language selector */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        {LANGS.map((l) => {
          const { flag, name } = LANG_LABELS[l];
          const isActive = l === lang;
          return (
            <button
              key={l}
              onClick={() => handleLangSwitch(l)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? "bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/30"
                  : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              }`}
            >
              <img src={getFlagUrl(flag, 16)} alt={name} width={16} height={12} className="rounded-sm" />
              {name}
            </button>
          );
        })}
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {items.map((item) => {
          const href = item.slug === "hub" ? `/${lang}` : `/${lang}/${item.slug}`;
          const isActive = item.slug === "hub"
            ? pathname === `/${lang}`
            : pathname === `/${lang}/${item.slug}`;
          return (
            <a
              key={item.slug}
              href={href}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                isActive
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                  : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </a>
          );
        })}
      </div>

      {/* Get(it)Done promo */}
      <a
        href="https://getitdone-nous.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 transition-all group"
      >
        <span className="text-2xl">👀</span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-[var(--primary)] group-hover:underline">
            {promo.title} →
          </div>
          <div className="text-xs text-[var(--muted)] truncate">
            {promo.desc}
          </div>
        </div>
      </a>
    </div>
  );
}
