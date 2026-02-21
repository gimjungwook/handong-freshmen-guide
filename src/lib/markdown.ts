import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { resolveWikiLink, type Lang, type Slug } from "./constants";

function convertWikiLinks(content: string, lang: Lang): string {
  return content.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (_, target: string, display?: string) => {
      const href = resolveWikiLink(target.trim(), lang);
      const text = display?.trim() || target.trim();
      return `[${text}](${href})`;
    }
  );
}

function convertMermaidBlocks(content: string): string {
  // Encode mermaid code as base64 data attribute to avoid HTML parsing issues
  return content.replace(
    /```mermaid\n([\s\S]*?)```/g,
    (_, code: string) => {
      const encoded = Buffer.from(code.trim()).toString("base64");
      return `<div class="mermaid-container" data-chart="${encoded}"></div>`;
    }
  );
}

export interface PageData {
  html: string;
  title: string;
  headings: { id: string; text: string; level: number }[];
}

export async function getPageContent(
  lang: Lang,
  slug: Slug
): Promise<PageData> {
  const filePath = path.join(
    process.cwd(),
    "content",
    lang,
    `${slug}.md`
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  // Pre-process
  let processed = convertWikiLinks(content, lang);
  processed = convertMermaidBlocks(processed);
  // Escape tildes in time ranges (e.g., 11:00~12:00) to prevent remark-gfm strikethrough
  processed = processed.replace(/(\d{1,2}:\d{2})~(\d{1,2}:\d{2})/g, "$1\\~$2");

  // Extract headings for TOC
  const headings: PageData["headings"] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(processed)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s가-힣\u3131-\u318E-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ id, level: match[1].length, text });
  }

  // Extract title from first H1
  const titleMatch = processed.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm, { singleTilde: false })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(processed);

  // Wrap tables in scrollable container for mobile
  const html = String(result).replace(
    /<table>/g,
    '<div class="table-wrapper"><table>'
  ).replace(
    /<\/table>/g,
    '</table></div>'
  );

  return {
    html,
    title,
    headings,
  };
}
