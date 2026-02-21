"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, type Lang, type NavItem } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useState, useEffect, useCallback, useRef } from "react";

interface Heading {
  id: string;
  text: string;
}

export default function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const items = NAV_ITEMS[lang];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const currentSlug =
    items.find((item) => {
      const href = item.slug === "hub" ? `/${lang}` : `/${lang}/${item.slug}`;
      return pathname === href;
    })?.slug || null;

  // Extract h2 headings from the page DOM
  const extractHeadings = useCallback(() => {
    const els = document.querySelectorAll(".prose h2");
    const h: Heading[] = [];
    els.forEach((el) => {
      const id = el.id;
      const text = (el.textContent || "")
        .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/u, "")
        .trim();
      if (id && text) h.push({ id, text });
    });
    setHeadings(h);
  }, []);

  // Auto-expand current page and extract headings
  useEffect(() => {
    setExpandedSlug(currentSlug);
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [pathname, currentSlug, extractHeadings]);

  // IntersectionObserver for scroll tracking
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        }
      },
      { rootMargin: "-60px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [headings]);

  const toggleExpand = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden notion-topbar">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-1.5 -ml-1 rounded hover:bg-[var(--surface-hover)] transition-colors"
        >
          <svg className="w-5 h-5 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="ml-2 text-sm font-medium text-[var(--muted)]">
          {items.find((item) => {
            const href = item.slug === "hub" ? `/${lang}` : `/${lang}/${item.slug}`;
            return pathname === href;
          })?.label || (lang === "ko" ? "수강신청 가이드" : "Registration Guide")}
        </span>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="notion-sidebar-overlay lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`notion-sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav className="flex-1 overflow-y-auto px-1.5 pt-3 pb-1">
          {items.map((item) => {
            const href = item.slug === "hub" ? `/${lang}` : `/${lang}/${item.slug}`;
            const isActive = item.slug === currentSlug;
            const isExpanded = expandedSlug === item.slug;
            const showHeadings = isActive && isExpanded && headings.length > 0;

            return (
              <div key={item.slug}>
                {item.divider && (
                  <div className="mx-2 my-1.5 border-t border-[var(--border)]" />
                )}
                <div className="flex items-center mx-0.5">
                  <button
                    onClick={() => toggleExpand(item.slug)}
                    className="p-0.5 rounded hover:bg-[var(--sidebar-hover)] text-[var(--muted)] shrink-0"
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <Link
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2 flex-1 px-1.5 py-1.5 rounded text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--sidebar-active)] font-medium"
                        : "hover:bg-[var(--sidebar-hover)] text-[var(--foreground)]"
                    }`}
                  >
                    <span className="text-base shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </div>

                {/* Collapsible headings with scroll tracking */}
                {showHeadings && (
                  <div className="ml-5 pl-3 border-l border-[var(--border)] my-0.5">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                          setSidebarOpen(false);
                        }}
                        className={`block px-2 py-1 text-xs rounded transition-colors truncate ${
                          activeHeadingId === h.id
                            ? "text-[var(--primary)] font-medium bg-[var(--sidebar-active)]"
                            : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-hover)]"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* AI Chat link */}
        <div className="shrink-0 px-2 pt-2 pb-1">
          <a
            href="https://notebooklm.google.com/notebook/bb775ea3-7895-453b-a664-a3c0371982cd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1.5 rounded text-sm text-[var(--muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0M3.75 20.25V4.125C3.75 3.504 4.254 3 4.875 3h14.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H7.5L3.75 20.25z" />
            </svg>
            {{ en: "Ask AI", ko: "AI에게 질문하기", ne: "AI लाई सोध्नुहोस्", id: "Tanya AI", ja: "AIに質問する", mn: "AI-аас асуух", ru: "Спросить AI", zh: "问AI" }[lang] || "Ask AI"}
          </a>
        </div>

        {/* Bottom controls */}
        <div className="shrink-0 border-t border-[var(--border)] px-2 py-2 flex items-center justify-between">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
