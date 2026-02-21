export const LANGS = ["en", "ko", "ne", "id", "ja", "mn", "ru", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, { flag: string; name: string }> = {
  en: { flag: "us", name: "English" },
  ko: { flag: "kr", name: "한국어" },
  ne: { flag: "np", name: "नेपाली" },
  id: { flag: "id", name: "Indonesia" },
  ja: { flag: "jp", name: "日本語" },
  mn: { flag: "mn", name: "Монгол" },
  ru: { flag: "ru", name: "Русский" },
  zh: { flag: "cn", name: "中文" },
};

/** Get flag image URL from flagcdn.com */
export function getFlagUrl(countryCode: string, size = 20): string {
  return `https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${countryCode}.png`;
}

export const SLUGS = ["hub", "required", "tips", "strategy", "stem", "humanities", "exploratory", "schedule"] as const;
export type Slug = (typeof SLUGS)[number];

export type NavItem = { slug: Slug; label: string; icon: string; divider?: boolean };

export const NAV_ITEMS: Record<Lang, NavItem[]> = {
  en: [
    { slug: "hub", label: "Main Guide", icon: "📋" },
    { slug: "required", label: "Required Courses", icon: "✅" },
    { slug: "tips", label: "Course Design Tips", icon: "💡" },
    { slug: "strategy", label: "Registration Strategy", icon: "⚔️" },
    { slug: "stem", label: "STEM", icon: "🔬", divider: true },
    { slug: "humanities", label: "Humanities", icon: "📚" },
    { slug: "exploratory", label: "Exploratory", icon: "🧭" },
    { slug: "schedule", label: "Schedule", icon: "📅" },
  ],
  ko: [
    { slug: "hub", label: "메인 가이드", icon: "📋" },
    { slug: "required", label: "필수과목", icon: "✅" },
    { slug: "tips", label: "수업설계 팁", icon: "💡" },
    { slug: "strategy", label: "수강신청 전략", icon: "⚔️" },
    { slug: "stem", label: "이공계", icon: "🔬", divider: true },
    { slug: "humanities", label: "인문사회", icon: "📚" },
    { slug: "exploratory", label: "탐색형", icon: "🧭" },
    { slug: "schedule", label: "일정", icon: "📅" },
  ],
  ne: [
    { slug: "hub", label: "मुख्य गाइड", icon: "📋" },
    { slug: "required", label: "अनिवार्य विषय", icon: "✅" },
    { slug: "tips", label: "कक्षा डिजाइन टिप्स", icon: "💡" },
    { slug: "strategy", label: "दर्ता रणनीति", icon: "⚔️" },
    { slug: "stem", label: "STEM", icon: "🔬", divider: true },
    { slug: "humanities", label: "Humanities", icon: "📚" },
    { slug: "exploratory", label: "Exploratory", icon: "🧭" },
    { slug: "schedule", label: "तालिका", icon: "📅" },
  ],
  id: [
    { slug: "hub", label: "Panduan Utama", icon: "📋" },
    { slug: "required", label: "Mata Kuliah Wajib", icon: "✅" },
    { slug: "tips", label: "Tips Desain Kuliah", icon: "💡" },
    { slug: "strategy", label: "Strategi Pendaftaran", icon: "⚔️" },
    { slug: "stem", label: "STEM", icon: "🔬", divider: true },
    { slug: "humanities", label: "Humanities", icon: "📚" },
    { slug: "exploratory", label: "Exploratory", icon: "🧭" },
    { slug: "schedule", label: "Jadwal", icon: "📅" },
  ],
  ja: [
    { slug: "hub", label: "メインガイド", icon: "📋" },
    { slug: "required", label: "必修科目", icon: "✅" },
    { slug: "tips", label: "履修設計のコツ", icon: "💡" },
    { slug: "strategy", label: "履修登録戦略", icon: "⚔️" },
    { slug: "stem", label: "理工系", icon: "🔬", divider: true },
    { slug: "humanities", label: "人文社会", icon: "📚" },
    { slug: "exploratory", label: "探索型", icon: "🧭" },
    { slug: "schedule", label: "スケジュール", icon: "📅" },
  ],
  mn: [
    { slug: "hub", label: "Гарын авлага", icon: "📋" },
    { slug: "required", label: "Заавал хичээл", icon: "✅" },
    { slug: "tips", label: "Хичээлийн зөвлөгөө", icon: "💡" },
    { slug: "strategy", label: "Бүртгэлийн стратеги", icon: "⚔️" },
    { slug: "stem", label: "STEM", icon: "🔬", divider: true },
    { slug: "humanities", label: "Humanities", icon: "📚" },
    { slug: "exploratory", label: "Exploratory", icon: "🧭" },
    { slug: "schedule", label: "Хуваарь", icon: "📅" },
  ],
  ru: [
    { slug: "hub", label: "Гид", icon: "📋" },
    { slug: "required", label: "Обязательные курсы", icon: "✅" },
    { slug: "tips", label: "Советы по расписанию", icon: "💡" },
    { slug: "strategy", label: "Стратегия регистрации", icon: "⚔️" },
    { slug: "stem", label: "STEM", icon: "🔬", divider: true },
    { slug: "humanities", label: "Humanities", icon: "📚" },
    { slug: "exploratory", label: "Exploratory", icon: "🧭" },
    { slug: "schedule", label: "Расписание", icon: "📅" },
  ],
  zh: [
    { slug: "hub", label: "主指南", icon: "📋" },
    { slug: "required", label: "必修课程", icon: "✅" },
    { slug: "tips", label: "选课设计技巧", icon: "💡" },
    { slug: "strategy", label: "选课策略", icon: "⚔️" },
    { slug: "stem", label: "理工科", icon: "🔬", divider: true },
    { slug: "humanities", label: "人文社科", icon: "📚" },
    { slug: "exploratory", label: "探索型", icon: "🧭" },
    { slug: "schedule", label: "日程", icon: "📅" },
  ],
};

// Wiki-link target → { lang, slug } mapping
const WIKI_LINK_MAP: Record<string, { lang: Lang; slug: Slug }> = {
  "Spring 2026 Freshman Registration Guide": { lang: "en", slug: "hub" },
  "STEM Freshman Guide": { lang: "en", slug: "stem" },
  "Humanities & Social Science Guide": { lang: "en", slug: "humanities" },
  "Exploratory Freshman Guide": { lang: "en", slug: "exploratory" },
  "Registration Schedule": { lang: "en", slug: "schedule" },
  "2026-1 새내기 수강신청 가이드 Hub": { lang: "ko", slug: "hub" },
  "2026-1 새내기 수강신청 가이드": { lang: "ko", slug: "hub" },
  "이공계 신입생 가이드": { lang: "ko", slug: "stem" },
  "인문사회 신입생 가이드": { lang: "ko", slug: "humanities" },
  "탐색형 신입생 가이드": { lang: "ko", slug: "exploratory" },
  "수강신청 일정": { lang: "ko", slug: "schedule" },
};

export function resolveWikiLink(target: string, currentLang: Lang): string {
  const entry = WIKI_LINK_MAP[target];
  if (entry) {
    const slug = entry.slug === "hub" ? "" : `/${entry.slug}`;
    const lang = entry.lang === currentLang ? currentLang : entry.lang;
    return `/${lang}${slug}`;
  }
  return "#";
}
