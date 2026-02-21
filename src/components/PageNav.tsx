import Link from "next/link";
import { NAV_ITEMS, type Lang, type Slug } from "@/lib/constants";

export default function PageNav({ lang, slug }: { lang: Lang; slug: Slug }) {
  const items = NAV_ITEMS[lang];
  const currentIndex = items.findIndex((item) => item.slug === slug);
  const prev = currentIndex > 0 ? items[currentIndex - 1] : null;
  const next = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  const getHref = (s: Slug) => (s === "hub" ? `/${lang}` : `/${lang}/${s}`);

  return (
    <div className="flex items-stretch gap-3 mt-10 mb-4 not-prose">
      {prev ? (
        <Link
          href={getHref(prev.slug)}
          className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] transition-all group text-left"
        >
          <svg className="w-4 h-4 shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div className="min-w-0">
            <div className="text-xs text-[var(--muted)]">
              {lang === "ko" ? "이전" : "Previous"}
            </div>
            <div className="text-sm font-medium truncate group-hover:text-[var(--primary)] transition-colors">
              {prev.icon} {prev.label}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={getHref(next.slug)}
          className="flex-1 flex items-center justify-end gap-2 px-4 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] transition-all group text-right"
        >
          <div className="min-w-0">
            <div className="text-xs text-[var(--muted)]">
              {lang === "ko" ? "다음" : "Next"}
            </div>
            <div className="text-sm font-medium truncate group-hover:text-[var(--primary)] transition-colors">
              {next.icon} {next.label}
            </div>
          </div>
          <svg className="w-4 h-4 shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
