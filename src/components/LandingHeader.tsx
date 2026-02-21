"use client";

import { LANGS, LANG_LABELS, NAV_ITEMS, getFlagUrl, type Lang } from "@/lib/constants";
import { useRouter, usePathname } from "next/navigation";

const PROMO_TEXT: Record<Lang, { title: string; desc: string }> = {
  ko: { title: "AI 활용법 강의 보러가기", desc: "선배가 만든 AI 활용 강의로 대학생활을 더 스마트하게!" },
  en: { title: "Learn to use AI effectively", desc: "A course by a Handong senior on leveraging AI!" },
  ja: { title: "AI活用講座を見る", desc: "先輩が作ったAI活用講座で大学生活をスマートに！" },
  zh: { title: "AI活用课程", desc: "学长制作的AI课程，让大学生活更高效！" },
  mn: { title: "AI ашиглах сургалт", desc: "Ахлах оюутан бүтээсэн AI сургалт!" },
  ru: { title: "Курс по использованию AI", desc: "Курс от старшекурсника по AI!" },
  ne: { title: "AI सिक्नुहोस्", desc: "दाइले बनाएको AI कोर्स!" },
  id: { title: "Belajar pakai AI", desc: "Kursus AI dari kakak tingkat!" },
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
        <span className="text-2xl">🚀</span>
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
