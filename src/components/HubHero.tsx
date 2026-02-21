import Link from "next/link";
import { NAV_ITEMS, type Lang } from "@/lib/constants";

const HERO: Record<string, { title: string; subtitle: string; why: string; cta: string; note: string }> = {
  ko: {
    title: "2026 봄학기 수강신청 가이드",
    subtitle: "한동대 신입생을 위한 수강신청 완벽 가이드",
    why: "대학 수강신청은 고등학교와 완전히 다릅니다. 여러분이 직접 과목, 분반, 학점을 모두 결정해야 해요. 이건 단순한 절차가 아니라 — 앞으로 4년을 설계하는 첫 번째 의사결정입니다.",
    cta: "가이드 읽기 시작 →",
    note: "시간표는 꼭 직접 짜보세요. 고민하는 과정에서 자신이 뭘 좋아하는지 알게 됩니다.",
  },
  en: {
    title: "Spring 2026 Registration Guide",
    subtitle: "Your complete course registration companion at Handong",
    why: "University registration is nothing like high school. You choose your own courses, sections, and credits. This isn't just admin work — it's the first big decision that shapes your next four years.",
    cta: "Start reading →",
    note: "Build your timetable yourself. The process of choosing teaches you what you actually care about.",
  },
  ne: {
    title: "२०२६ वसन्त सेमेस्टर दर्ता गाइड",
    subtitle: "Handong का नयाँ विद्यार्थीहरूको लागि पूर्ण दर्ता सहायक",
    why: "विश्वविद्यालयको दर्ता हाई स्कूल जस्तो होइन। तपाईंले आफ्नो विषय, खण्ड र क्रेडिट सबै आफैं छनौट गर्नुपर्छ। यो केवल प्रशासनिक काम होइन — यो तपाईंको आगामी चार वर्ष आकार दिने पहिलो ठूलो निर्णय हो।",
    cta: "गाइड पढ्न सुरु गर्नुहोस् →",
    note: "आफ्नो समयतालिका आफैं बनाउनुहोस्। छनौट गर्ने प्रक्रियाले तपाईंलाई वास्तवमा के मन पर्छ भनेर सिकाउँछ।",
  },
  id: {
    title: "Panduan Pendaftaran Semester Musim Semi 2026",
    subtitle: "Panduan lengkap pendaftaran mata kuliah di Handong",
    why: "Pendaftaran di universitas sangat berbeda dari SMA. Kamu memilih sendiri mata kuliah, kelas, dan SKS. Ini bukan sekadar urusan administrasi — ini keputusan besar pertama yang membentuk empat tahun ke depanmu.",
    cta: "Mulai membaca →",
    note: "Susunlah jadwalmu sendiri. Proses memilih akan mengajarkanmu apa yang benar-benar kamu minati.",
  },
  ja: {
    title: "2026年春学期 履修登録ガイド",
    subtitle: "Handong新入生のための履修登録完全ガイド",
    why: "大学の履修登録は高校とはまったく違います。科目、クラス、単位をすべて自分で決めなければなりません。これは単なる事務手続きではなく、これからの4年間を形づくる最初の大きな決断です。",
    cta: "ガイドを読み始める →",
    note: "時間割は必ず自分で組んでみてください。選ぶ過程で、自分が本当に何に興味があるのかが見えてきます。",
  },
  mn: {
    title: "2026 хаврын улирлын бүртгэлийн гарын авлага",
    subtitle: "Handong-ийн шинэ оюутнуудад зориулсан бүртгэлийн бүрэн гарын авлага",
    why: "Их сургуулийн бүртгэл нь ахлах сургуулиас огт өөр юм. Та хичээл, бүлэг, кредитээ бүгдийг өөрөө сонгоно. Энэ бол зүгээр нэг бичиг хэргийн ажил биш — ирээдүйн дөрвөн жилийг тань тодорхойлох анхны чухал шийдвэр юм.",
    cta: "Гарын авлагыг унших →",
    note: "Хуваарийг заавал өөрөө зохиогоорой. Сонголт хийх явцад та юунд дуртайгаа мэдэж авна.",
  },
  ru: {
    title: "Гид по регистрации на весенний семестр 2026",
    subtitle: "Полное руководство по регистрации на курсы в Handong",
    why: "Регистрация в университете совсем не похожа на школу. Вы сами выбираете предметы, секции и кредиты. Это не просто формальность — это первое важное решение, которое определит ваши следующие четыре года.",
    cta: "Начать читать →",
    note: "Составьте расписание сами. В процессе выбора вы поймёте, что вам действительно интересно.",
  },
  zh: {
    title: "2026春季学期选课指南",
    subtitle: "Handong新生选课完全指南",
    why: "大学选课和高中完全不同。你需要自己选择课程、班级和学分。这不仅仅是一个行政流程——而是决定你未来四年方向的第一个重要决定。",
    cta: "开始阅读 →",
    note: "一定要自己排课表。在选择的过程中，你会发现自己真正感兴趣的是什么。",
  },
};

const TRACKS: Record<string, { stem: string; hum: string; exp: string; stemDesc: string; humDesc: string; expDesc: string; unsure: string }> = {
  ko: {
    stem: "이공계", hum: "인문사회", exp: "탐색형",
    stemDesc: "공학, 컴퓨터, AI, 자연과학",
    humDesc: "경영, 경제, 법, 국제관계, 심리",
    expDesc: "아직 모르겠거나 여러 분야 탐색",
    unsure: "뭘 읽어야 할지 모르겠다면? → 탐색형 가이드를 추천합니다",
  },
  en: {
    stem: "STEM", hum: "Humanities", exp: "Exploratory",
    stemDesc: "Engineering, CS, AI, Natural Sciences",
    humDesc: "Business, Economics, Law, IR, Psychology",
    expDesc: "Undecided or exploring multiple fields",
    unsure: "Not sure which to pick? → Start with the Exploratory guide",
  },
  ne: {
    stem: "विज्ञान/प्रविधि", hum: "मानविकी", exp: "अन्वेषण",
    stemDesc: "इन्जिनियरिङ, कम्प्युटर, AI, प्राकृतिक विज्ञान",
    humDesc: "व्यवसाय, अर्थशास्त्र, कानून, अन्तर्राष्ट्रिय सम्बन्ध, मनोविज्ञान",
    expDesc: "अझै निर्णय गरेको छैन वा धेरै क्षेत्र अन्वेषण गर्दै",
    unsure: "कुन छान्ने थाहा छैन? → अन्वेषण गाइडबाट सुरु गर्नुहोस्",
  },
  id: {
    stem: "STEM", hum: "Humaniora", exp: "Eksploratif",
    stemDesc: "Teknik, Ilmu Komputer, AI, Ilmu Alam",
    humDesc: "Bisnis, Ekonomi, Hukum, Hubungan Internasional, Psikologi",
    expDesc: "Belum yakin atau ingin menjelajahi berbagai bidang",
    unsure: "Bingung mau pilih yang mana? → Mulai dengan panduan Eksploratif",
  },
  ja: {
    stem: "理工系", hum: "人文社会", exp: "探索型",
    stemDesc: "工学、コンピュータサイエンス、AI、自然科学",
    humDesc: "経営、経済、法学、国際関係、心理学",
    expDesc: "まだ決まっていない、または複数の分野を探索中",
    unsure: "どれを選べばいいかわからない？ → 探索型ガイドがおすすめです",
  },
  mn: {
    stem: "STEM", hum: "Нийгмийн ухаан", exp: "Судалгааны",
    stemDesc: "Инженерчлэл, Компьютер, AI, Байгалийн шинжлэх ухаан",
    humDesc: "Бизнес, Эдийн засаг, Хууль, Олон улсын харилцаа, Сэтгэл судлал",
    expDesc: "Хараахан шийдээгүй эсвэл олон чиглэлийг судалж байгаа",
    unsure: "Алийг нь сонгохоо мэдэхгүй байна уу? → Судалгааны гарын авлагаас эхлээрэй",
  },
  ru: {
    stem: "STEM", hum: "Гуманитарные", exp: "Исследовательский",
    stemDesc: "Инженерия, информатика, AI, естественные науки",
    humDesc: "Бизнес, экономика, право, международные отношения, психология",
    expDesc: "Ещё не определились или изучаете разные направления",
    unsure: "Не знаете, что выбрать? → Начните с исследовательского гида",
  },
  zh: {
    stem: "理工科", hum: "人文社科", exp: "探索型",
    stemDesc: "工程、计算机、AI、自然科学",
    humDesc: "商学、经济、法学、国际关系、心理学",
    expDesc: "还没决定，或正在探索多个领域",
    unsure: "不知道该选哪个？ → 推荐从探索型指南开始",
  },
};

function getI18n(lang: string) {
  return {
    hero: HERO[lang] || HERO.en,
    tracks: TRACKS[lang] || TRACKS.en,
  };
}

export default function HubHero({ lang }: { lang: Lang }) {
  const { hero, tracks } = getI18n(lang);
  const items = NAV_ITEMS[lang];
  const stemItem = items.find(i => i.slug === "stem");
  const humItem = items.find(i => i.slug === "humanities");
  const expItem = items.find(i => i.slug === "exploratory");

  const trackCards = [
    { item: stemItem, desc: tracks.stemDesc, color: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20", border: "hover:border-blue-400", icon: "🔬" },
    { item: humItem, desc: tracks.humDesc, color: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20", border: "hover:border-amber-400", icon: "📚" },
    { item: expItem, desc: tracks.expDesc, color: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20", border: "hover:border-emerald-400", icon: "🧭" },
  ];

  return (
    <div className="not-prose mb-10">
      {/* Hero */}
      <div className="text-center mb-8 pt-2">
        <div className="text-4xl mb-3">🎓</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[var(--foreground)]">
          {hero.title}
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-lg mx-auto">
          {hero.subtitle}
        </p>
      </div>

      {/* Why callout */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 mb-6">
        <p className="text-sm leading-relaxed text-[var(--foreground)]">
          {hero.why}
        </p>
      </div>

      {/* Quick nav - main sections */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {items.filter(i => ["required", "tips", "strategy"].includes(i.slug)).map((item) => (
          <Link
            key={item.slug}
            href={`/${lang}/${item.slug}`}
            className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] transition-all text-center group"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Track cards */}
      <div className="space-y-2 mb-4">
        {trackCards.map(({ item, desc, color, border, icon }) => item && (
          <Link
            key={item.slug}
            href={`/${lang}/${item.slug}`}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl border border-[var(--border)] ${border} bg-gradient-to-r ${color} transition-all group`}
          >
            <span className="text-3xl">{icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                {item.label}
              </div>
              <div className="text-xs text-[var(--muted)] mt-0.5">
                {desc}
              </div>
            </div>
            <svg className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--primary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      <p className="text-xs text-[var(--muted)] text-center mb-6">
        {tracks.unsure}
      </p>

      {/* Note */}
      <div className="rounded-xl border border-dashed border-[var(--border)] px-5 py-3 text-center">
        <p className="text-xs text-[var(--muted)] italic leading-relaxed">
          💬 {hero.note}
        </p>
      </div>
    </div>
  );
}
