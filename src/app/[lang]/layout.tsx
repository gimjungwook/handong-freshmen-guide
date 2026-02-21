import Navbar from "@/components/Navbar";
import ChatButton from "@/components/ChatButton";
import { LANGS, type Lang } from "@/lib/constants";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang as Lang} />
      <div className="notion-main">
        {children}
      </div>
      <ChatButton />
    </>
  );
}
