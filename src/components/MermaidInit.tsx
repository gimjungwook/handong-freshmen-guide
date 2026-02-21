"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function MermaidInit() {
  const { theme } = useTheme();

  useEffect(() => {
    const renderMermaid = async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === "dark" ? "dark" : "neutral",
        fontFamily: "inherit",
      });

      const elements = document.querySelectorAll<HTMLElement>(".mermaid-container");
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const encoded = el.getAttribute("data-chart");
        if (!encoded) continue;
        try {
          const code = atob(encoded);
          const { svg } = await mermaid.render(`mermaid-${i}-${Date.now()}`, code);
          el.innerHTML = svg;
          el.classList.add("mermaid");
        } catch (e) {
          el.textContent = "Diagram rendering failed";
        }
      }
    };

    const timer = setTimeout(renderMermaid, 200);
    return () => clearTimeout(timer);
  }, [theme]);

  return null;
}
