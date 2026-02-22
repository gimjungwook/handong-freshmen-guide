import type { Metadata } from "next";
import { getPageContent } from "@/lib/markdown";
import ContentRenderer from "@/components/ContentRenderer";
import PageNav from "@/components/PageNav";
import Disclaimer from "@/components/Disclaimer";
import LandingHeader from "@/components/LandingHeader";
import HubHero from "@/components/HubHero";
import { LANGS, NAV_ITEMS, type Lang } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const navItem = NAV_ITEMS[lang as Lang]?.find((item) => item.slug === "hub");
  const title = navItem ? `${navItem.icon} ${navItem.label}` : "Guide";
  return { title };
}

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { html } = await getPageContent(lang as Lang, "hub");

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-16 py-4">
      <LandingHeader lang={lang as Lang} />
      <HubHero lang={lang as Lang} />
      <ContentRenderer html={html} />
      <PageNav lang={lang as Lang} slug="hub" />
      <Disclaimer lang={lang as Lang} />
    </div>
  );
}
