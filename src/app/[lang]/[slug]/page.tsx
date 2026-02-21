import { getPageContent } from "@/lib/markdown";
import ContentRenderer from "@/components/ContentRenderer";
import PageNav from "@/components/PageNav";
import { LANGS, SLUGS, type Lang, type Slug } from "@/lib/constants";

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LANGS) {
    for (const slug of SLUGS) {
      if (slug === "hub") continue;
      params.push({ lang, slug });
    }
  }
  return params;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const { html } = await getPageContent(lang as Lang, slug as Slug);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-16 py-4">
      <ContentRenderer html={html} />
      <PageNav lang={lang as Lang} slug={slug as Slug} />
    </div>
  );
}
