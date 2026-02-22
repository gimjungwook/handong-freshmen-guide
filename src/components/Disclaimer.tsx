import type { Lang } from "@/lib/constants";

const DISCLAIMERS: Record<Lang, string> = {
  ko: "이 가이드는 <strong>Claude Opus 4.6</strong>의 도움을 받아 작성되었습니다. 오류가 있다면 알려주세요!",
  en: 'This guide was written with the help of <strong>Claude Opus 4.6</strong>. This guide is also available in <a href="/">other languages</a>, but translations may contain inaccuracies — when in doubt, refer to this English version or the <a href="/ko">한국어</a> version.',
  ja: 'このガイドは <strong>Claude Opus 4.6</strong> によって翻訳されました。韓国語・英語以外の翻訳には不正確な箇所がある場合があります。違和感がある場合は <a href="/en">English</a> または <a href="/ko">한국어</a> バージョンをご参照ください。',
  mn: 'Энэ гарын авлагыг <strong>Claude Opus 4.6</strong> орчуулсан. Солонгос, англи хэлээс бусад орчуулга дутуу буюу алдаатай байж болно. Эргэлзвэл <a href="/en">English</a> эсвэл <a href="/ko">한국어</a> хувилбарыг харна уу.',
  ru: 'Это руководство переведено <strong>Claude Opus 4.6</strong>. Переводы на языки, кроме корейского и английского, могут содержать неточности. В случае сомнений обращайтесь к <a href="/en">English</a> или <a href="/ko">한국어</a> версии.',
  ne: 'यो गाइड <strong>Claude Opus 4.6</strong> द्वारा अनुवाद गरिएको हो। कोरियाली र अंग्रेजी बाहेकका अनुवादमा अशुद्धता हुन सक्छ। शंका लागेमा <a href="/en">English</a> वा <a href="/ko">한국어</a> संस्करण हेर्नुहोस्।',
  id: 'Panduan ini diterjemahkan oleh <strong>Claude Opus 4.6</strong>. Terjemahan selain bahasa Korea dan Inggris mungkin mengandung ketidakakuratan. Jika ragu, silakan merujuk ke versi <a href="/en">English</a> atau <a href="/ko">한국어</a>.',
  zh: '本指南由 <strong>Claude Opus 4.6</strong> 翻译。韩语和英语以外的翻译可能存在不准确之处。如有疑问，请参阅 <a href="/en">English</a> 或 <a href="/ko">한국어</a> 版本。',
};

export default function Disclaimer({ lang }: { lang: Lang }) {
  return (
    <p
      className="mt-8 mb-4 text-xs text-gray-400 dark:text-gray-500 text-center [&_a]:underline [&_a]:text-gray-400 dark:[&_a]:text-gray-500 hover:[&_a]:text-gray-600 dark:hover:[&_a]:text-gray-300"
      dangerouslySetInnerHTML={{ __html: DISCLAIMERS[lang] }}
    />
  );
}
