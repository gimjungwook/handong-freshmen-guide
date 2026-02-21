"use client";

import { LANGS, LANG_LABELS, getFlagUrl, type Lang } from "@/lib/constants";
import { useRouter } from "next/navigation";

const PROMO_TEXT: Record<Lang, { title: string; desc: string; badge: string }> = {
  ko: { title: "🔥 새내기 필수! AI 활용법 알아보기", desc: "과제, 시간표, 공부 — AI로 대학생활 한 단계 업그레이드", badge: "💬 이 가이드 만든 선배가 직접 만든 플랫폼이에요" },
  en: { title: "🔥 Freshman must-know: AI skills for uni life", desc: "Assignments, schedules, studying — level up with AI", badge: "💬 Built by the same 선배 who made this guide" },
  ja: { title: "🔥 新入生必見！AI活用スキル", desc: "課題、時間割、勉強 — AIで大学生活をレベルアップ", badge: "💬 このガイドを作った先輩が直接作ったプラットフォームです" },
  zh: { title: "🔥 新生必看！AI 技能速成", desc: "作业、课表、学习 — 用AI让大学生活升级", badge: "💬 这个指南的制作者亲手打造的平台" },
  mn: { title: "🔥 Шинэ оюутны заавал мэдэх AI ур чадвар", desc: "Даалгавар, хуваарь, суралцах — AI-аар дараагийн түвшинд", badge: "💬 Энэ гарын авлагыг бүтээсэн ахлах оюутны платформ" },
  ru: { title: "🔥 Первокурснику: AI-навыки для учёбы", desc: "Задания, расписание, учёба — прокачайся с помощью AI", badge: "💬 Платформа от создателя этого гайда" },
  ne: { title: "🔥 नयाँ विद्यार्थीको लागि AI सीप", desc: "Assignment, तालिका, पढाइ — AI ले level up गर", badge: "💬 यो गाइड बनाउने दाइले नै बनाएको प्लाटफर्म हो" },
  id: { title: "🔥 Wajib buat maba: skill AI untuk kuliah", desc: "Tugas, jadwal, belajar — upgrade kehidupan kampus dengan AI", badge: "💬 Dibuat oleh kakak yang sama yang bikin guide ini" },
};

export default function LandingHeader({ lang }: { lang: Lang }) {
  const router = useRouter();
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
          <div className="text-[10px] text-[var(--muted)] mt-1 opacity-70">
            {promo.badge}
          </div>
        </div>
      </a>
    </div>
  );
}
