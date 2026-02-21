"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function Sidebar({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-60px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed top-0 right-4 w-56 h-screen overflow-y-auto py-20">
      <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2 px-2">
        {typeof window !== "undefined" && window.location.pathname.startsWith("/en")
          ? "On this page"
          : "목차"}
      </div>
      <ul className="space-y-0.5">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block text-sm py-1 px-2 rounded transition-colors ${
                level === 3 ? "pl-5" : ""
              } ${
                activeId === id
                  ? "toc-active"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              {text.replace(/^[^\w가-힣]+/, "").slice(0, 40)}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
