import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "한동대 수강신청 가이드 | Handong Registration Guide",
    template: "%s — 한동대 수강신청 가이드",
  },
  description:
    "2026학년도 1학기 한동대학교 새내기 수강신청 완벽 가이드. 8개 언어 지원 (한국어, English, 日本語, 中文, नेपाली, Indonesia, Монгол, Русский). 필수과목, 시간표 설계 팁, 수강신청 전략까지.",
  keywords: [
    "한동대", "수강신청", "새내기", "가이드", "2026",
    "Handong", "course registration", "freshman guide",
    "한동대학교", "시간표", "수강편람",
  ],
  authors: [{ name: "Handong Global University Community" }],
  creator: "gimjungwook",
  metadataBase: new URL("https://handong-freshmen-guide.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US", "ja_JP", "zh_CN"],
    siteName: "한동대 수강신청 가이드",
    title: "한동대 2026-1 새내기 수강신청 가이드",
    description:
      "전공 선택부터 수강신청 D-Day 전략까지, 한동대 신입생을 위한 모든 것. 8개 언어 지원.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "한동대 수강신청 가이드",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "한동대 2026-1 새내기 수강신청 가이드",
    description:
      "전공 선택부터 수강신청 D-Day 전략까지, 한동대 신입생을 위한 모든 것.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
