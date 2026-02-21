"use client";

import MermaidInit from "./MermaidInit";

export default function ContentRenderer({ html }: { html: string }) {
  return (
    <>
      <MermaidInit />
      <article
        className="prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
