import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, PenIcon } from "@/components/ui/icons";
import type { Lang } from "@/lib/language";

// ─────────────────────────────────────────────────────────
//  RESUME DATA — Edit this file to customize your portfolio.
//  All personal info, experience, projects, etc. live here.
//  Bilingual: every text field uses { en: "...", tr: "..." }.
// ─────────────────────────────────────────────────────────

type Bilingual<T> = { en: T; tr: T };
function i18n<T>(data: Bilingual<T>) { return data; }

// ─── Profile ─────────────────────────────────────────────
export const profile = {
  name: "Kaan Demir",
  title: i18n({ en: "Full Stack Developer", tr: "Full Stack Geliştirici" }),
  age: 24,
  avatars: ["/pp1.jpg", "/pp2.jpg", "/pp3.jpg"],
  views: "9,441",
  githubUsername: "buzzkaan",
  footer: {
    copyright: "© 2026 buzzkaan",
    tagline: i18n({ en: "Built with love, LLMs and Coffee", tr: "Sevgiyle, LLM'lerle ve kahveyle yapıldı" }),
  },
} as const;

// ─── About ───────────────────────────────────────────────
export const about = i18n({
  en: [
    "Full Stack Developer who reads other people's code for a living and occasionally writes some of his own. Builds tools that quietly get out of the way so users can focus on what actually matters.",
    "Spent the last two years teaching AI to write better code — results inconclusive, productivity undeniable. Thrives at the intersection of clean architecture and mild confusion.",
    "Tends to name variables like they have feelings.",
  ],
  tr: [
    "Başkalarının kodunu okuyarak geçimini sağlayan, ara sıra kendi kodunu da yazan bir Full Stack Developer. Kullanıcıların asıl önemli olan şeye odaklanabilmesi için sessizce aradan çekilen araçlar geliştiriyor.",
    "Son iki yılını AI'a daha iyi kod yazmayı öğretmekle geçirdi — sonuçlar tartışmalı, verimlilik tartışmasız. Temiz mimari ile hafif kafa karışıklığının kesişim noktasında gelişiyor.",
    "Değişkenlere sanki duyguları varmış gibi isim verme eğiliminde.",
  ],
});

// ─── Connect Links ───────────────────────────────────────
export const connectLinks = [
  { label: "GitHub", href: "https://github.com/buzzkaan", Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/buzzka/", Icon: LinkedInIcon, external: true },
  { label: "Mail", href: "mailto:kaanazife1@gmail.com", Icon: Mail, external: false },
  { label: i18n({ en: "Resume", tr: "CV" }), href: "/resume", Icon: PenIcon, external: false },
] as const;

// ─── Nav Links (More dropdown) ───────────────────────────
export const navMoreLinks = [
  { label: "GitHub", href: "https://github.com/buzzkaan", external: true },
  { label: i18n({ en: "Resume", tr: "CV" }), href: "/resume", external: false },
] as const;

// ─── Section Labels ─────────────────────────────────────
export const sectionLabels = i18n({
  en: {
    about: "About",
    connect: "Connect",
    experience: "Experience",
    education: "Education",
    certifications: "Certifications",
    projects: "Projects",
    resume: "Resume",
    home: "Home",
    more: "More",
    nowPlaying: "Now playing",
    lastPlayed: "Last played",
    download: "Download PDF",
  },
  tr: {
    about: "Hakkımda",
    connect: "İletişim",
    experience: "Deneyim",
    education: "Eğitim",
    certifications: "Sertifikalar",
    projects: "Projeler",
    resume: "CV",
    home: "Ana Sayfa",
    more: "Diğer",
    nowPlaying: "Şu an çalıyor",
    lastPlayed: "Son dinlenen",
    download: "PDF İndir",
  },
});

// ─── Experience ──────────────────────────────────────────
export interface ExperienceEntry {
  company: string;
  companyUrl: string;
  title: string;
  type: Bilingual<string>;
  startDate: string;
  endDate: string;
  tags: string[];
  description: Bilingual<string>;
  bullets?: Bilingual<string[]>;
}

export const experience: ExperienceEntry[] = [
  {
    company: "UnivestHub",
    companyUrl: "https://univesthub.com",
    title: "Full Stack Developer Intern",
    type: i18n({ en: "Internship", tr: "Staj" }),
    startDate: "03.2025",
    endDate: "06.2025",
    tags: ["Next.js", "TypeScript", "GraphQL", "Web3", "Redux Toolkit", "Zustand", "React Hook Form", "Zod"],
    description: i18n({
      en: "Built decentralized web applications with Next.js and TypeScript. Integrated RESTful and GraphQL APIs, visualized token data, and interacted with smart contracts using Web3 libraries.",
      tr: "Next.js ve TypeScript ile merkeziyetsiz web uygulamaları geliştirdi. RESTful ve GraphQL API'lerini entegre etti, token verilerini görselleştirdi ve Web3 kütüphaneleriyle akıllı sözleşmelerle etkileşim kurdu.",
    }),
    bullets: i18n({
      en: [
        "Developed responsive user interfaces and optimized performance through refactoring",
        "Implemented complex forms with React Hook Form and Zod validation",
        "Managed global state using Redux Toolkit, Zustand, and Context API",
      ],
      tr: [
        "Responsive kullanıcı arayüzleri geliştirdi ve refactoring ile performansı optimize etti",
        "React Hook Form ve Zod validasyonu ile karmaşık formlar uyguladı",
        "Redux Toolkit, Zustand ve Context API ile global state yönetimi yaptı",
      ],
    }),
  },
  {
    company: "Yedaş",
    companyUrl: "https://yedas.com",
    title: "Intern",
    type: i18n({ en: "Mandatory Internship", tr: "Zorunlu Staj" }),
    startDate: "03.2024",
    endDate: "08.2024",
    tags: ["Node-RED", "Bootstrap", "HTML", "CSS", "JavaScript", "jQuery", "ABAP"],
    description: i18n({
      en: "Completed a 3-month compulsory workplace training developing internal web tools and working with ABAP enterprise systems.",
      tr: "3 aylık zorunlu işyeri eğitimini tamamladı, dahili web araçları geliştirdi ve ABAP kurumsal sistemleriyle çalıştı.",
    }),
    bullets: i18n({
      en: [
        "Developed internal web tools with Node-RED, Bootstrap, and jQuery",
        "Contributed to responsive UI development",
        "Collaborated in an Agile, sprint-based team environment",
      ],
      tr: [
        "Node-RED, Bootstrap ve jQuery ile dahili web araçları geliştirdi",
        "Responsive UI geliştirmeye katkıda bulundu",
        "Agile, sprint tabanlı ekip ortamında çalıştı",
      ],
    }),
  },
  {
    company: "TrueFeedBack Inc",
    companyUrl: "https://truefeedback.io",
    title: "Full Stack Developer",
    type: i18n({ en: "Part-time", tr: "Yarı Zamanlı" }),
    startDate: "06.2022",
    endDate: "03.2024",
    tags: ["React", "TypeScript", "HTML5", "CSS3", "REST API", "SQL", "Figma"],
    description: i18n({
      en: "Worked part-time for 2 years, initially as a volunteer and later in a paid role, contributing to both frontend and backend development.",
      tr: "2 yıl boyunca önce gönüllü, ardından ücretli olarak yarı zamanlı çalıştı, hem frontend hem backend geliştirmeye katkıda bulundu.",
    }),
    bullets: i18n({
      en: [
        "Built responsive web interfaces using React, TypeScript, and integrated RESTful APIs",
        "Collaborated with senior developers to improve platform performance and ensure data consistency through SQL analysis",
        "Developed features based on UI/UX principles using Figma designs",
      ],
      tr: [
        "React, TypeScript kullanarak responsive web arayüzleri oluşturdu ve RESTful API'leri entegre etti",
        "Kıdemli geliştiricilerle iş birliği yaparak platform performansını artırdı ve SQL analizi ile veri tutarlılığını sağladı",
        "Figma tasarımlarını kullanarak UI/UX prensiplerine dayalı özellikler geliştirdi",
      ],
    }),
  },
];

// ─── Education ───────────────────────────────────────────
export interface EducationEntry {
  institution: string;
  degree: Bilingual<string>;
  startYear: string;
  endYear: string;
  description: Bilingual<string>;
  highlights?: string[];
}

export const education: EducationEntry[] = [
  {
    institution: "Selcuk University",
    degree: i18n({
      en: "Bachelor of Science · Computer Engineering",
      tr: "Lisans · Bilgisayar Mühendisliği",
    }),
    startYear: "2020",
    endYear: "2025",
    description: i18n({
      en: "Konya, Turkey. Focused on software engineering, data structures, algorithms, and full-stack web development.",
      tr: "Konya, Türkiye. Yazılım mühendisliği, veri yapıları, algoritmalar ve full-stack web geliştirme odaklı.",
    }),
    highlights: ["GPA: 2.98 / 4.0"],
  },
];

// ─── Certifications ─────────────────────────────────────
export interface CertificationEntry {
  title: string;
  provider: string;
  description: string;
}

export const certifications: CertificationEntry[] = [
  { title: "Meta Front-End Developer Certificate", provider: "Coursera", description: "React, HTML/CSS, UI/UX" },
  { title: "Google UX Design Certificate", provider: "Coursera", description: "UX Research, Figma, Prototyping" },
  { title: "JavaScript Algorithms & Data Structures", provider: "freeCodeCamp", description: "Algorithms, Problem Solving" },
  { title: "Test Engineering", provider: "BTK Akademi", description: "Software Testing, QA, Test Automation" },
  { title: "Object-Oriented Programming", provider: "BTK Akademi", description: "OOP, SOLID, Design Patterns" },
  { title: "Data Structures", provider: "BTK Akademi", description: "Arrays, Trees, Graphs, Sorting" },
];

// ─── Projects ────────────────────────────────────────────
export interface ProjectEntry {
  title: string;
  date: string;
  description: Bilingual<string>;
  tags: string[];
  links: { label: string; url: string; type: "live" | "github" | "model" }[];
  color: string;
  media?: { type: "iframe" | "video"; url: string };
}

export const projects: ProjectEntry[] = [
  {
    title: "Buildfy",
    date: "2025",
    description: i18n({
      en: "A Lovable-style AI-powered web app builder clone. A platform that lets users create web applications using natural language, powered by a prompt-to-code approach.",
      tr: "Lovable tarzı bir AI-powered web app builder clone'u. Kullanıcıların doğal dil ile web uygulamaları oluşturmasını sağlayan, prompt-to-code yaklaşımıyla çalışan bir platform.",
    }),
    tags: ["Next.js", "TypeScript", "AI", "Tailwind CSS", "Vercel"],
    links: [
      { label: "Live", url: "https://buildfyv2.vercel.app/", type: "live" },
      { label: "GitHub", url: "https://github.com/buzzkaan/buildfyv2", type: "github" },
    ],
    color: "from-violet-500/20 to-purple-600/20 dark:from-violet-500/10 dark:to-purple-600/10",
    media: { type: "iframe", url: "https://buildfyv2.vercel.app/" },
  },
  {
    title: "StudyWMe",
    date: "2025",
    description: i18n({
      en: "An online study platform where users can work together. Equipped with real-time session management, user authentication, and statistics tracking.",
      tr: "Kullanıcıların birlikte çalışabileceği bir online çalışma platformu. Gerçek zamanlı oturum yönetimi, kullanıcı kimlik doğrulama ve istatistik takibi ile donatılmış.",
    }),
    tags: ["Next.js", "React", "Prisma", "Neon", "Clerk", "Tailwind CSS", "Recharts"],
    links: [
      { label: "Live", url: "https://studywme.vercel.app/", type: "live" },
      { label: "GitHub", url: "https://github.com/buzzkaan/yksapp", type: "github" },
    ],
    color: "from-cyan-500/20 to-blue-600/20 dark:from-cyan-500/10 dark:to-blue-600/10",
    media: { type: "iframe", url: "https://studywme.vercel.app/" },
  },
  {
    title: "BookBlog Ophelia",
    date: "2025",
    description: i18n({
      en: "A book blog platform powered by rich text editor (TipTap), 3D visualizations (Three.js), Framer Motion animations, and Supabase backend.",
      tr: "Zengin metin editörü (TipTap), 3D görselleştirmeler (Three.js), Framer Motion animasyonları ve Supabase backend ile güçlendirilmiş bir kitap blog platformu.",
    }),
    tags: ["Next.js", "Supabase", "Three.js", "Framer Motion", "GSAP", "TipTap", "Zod"],
    links: [
      { label: "Live", url: "https://book-blog-ophelia-46hz.vercel.app", type: "live" },
      { label: "GitHub", url: "https://github.com/buzzkaan/BookBlog-Ophelia", type: "github" },
    ],
    color: "from-amber-500/20 to-orange-600/20 dark:from-amber-500/10 dark:to-orange-600/10",
    media: { type: "iframe", url: "https://book-blog-ophelia-46hz.vercel.app" },
  },
  {
    title: "Pretext Example",
    date: "2025",
    description: i18n({
      en: "A demo that calculates text measurement and layout using pure TypeScript without touching the browser. Deterministically computes line breaks, text widths, and bounding boxes. A critical architectural shift for generative UI and AI-driven interfaces.",
      tr: "Tarayıcıya dokunmadan saf TypeScript ile text measurement ve layout hesaplayan bir demo. Satır kırılımları, metin genişlikleri ve bounding box'ları deterministik şekilde hesaplıyor. Generative UI ve AI-driven arayüzler için kritik bir mimari değişim.",
    }),
    tags: ["TypeScript", "Text Layout", "AI UI"],
    links: [
      { label: "GitHub", url: "https://github.com/buzzkaan/pretext-example", type: "github" },
    ],
    color: "from-emerald-500/20 to-teal-600/20 dark:from-emerald-500/10 dark:to-teal-600/10",
    media: { type: "video", url: "https://www.youtube.com/embed/swW3u52Da1s" },
  },
];

// ─── Quotes ──────────────────────────────────────────────
export const quotes = [
  { text: "The only ones who should kill are those who are prepared to be killed.", author: "Lelouch Vi Britannia" },
  { text: "If you begin to regret, you'll dull your future decisions and let others make your choices for you. All that's left for you then is to die. Nobody can foretell the outcome. Each decision you make holds meaning only by affecting your next decision.", author: "Erwin Smith" },
  { text: "Sometimes a single Thank You is better than saying a thousand sorrys.", author: "Emilia" },
  { text: "I see now that the circumstances of one's birth are irrelevant. It is what you do with the gift of life that determines who you are.", author: "Mewtwo" },
  { text: "If we do it now, we'll never run out of time.", author: "Unknown" },
  { text: "Another flaw in the human character is that everyone wants to build and nobody wants to do maintenance.", author: "Kurt Vonnegut" },
  { text: "I was not born with a whole lot of natural talent... but I work hard and I never give up.", author: "Rock Lee" },
] as const;

// ─── Search Items ────────────────────────────────────────
export interface SearchItem {
  label: string;
  href: string;
  desc: string;
}

export const searchItems = {
  en: [
    { label: sectionLabels.en.home, href: "/", desc: "Back to homepage" },
    { label: sectionLabels.en.projects, href: "/projects", desc: "View all projects" },
    { label: sectionLabels.en.about, href: "/#about", desc: "Jump to section" },
    { label: sectionLabels.en.experience, href: "/#experience", desc: "Jump to section" },
    { label: sectionLabels.en.education, href: "/#education", desc: "Jump to section" },
    { label: sectionLabels.en.connect, href: "/#connect", desc: "Jump to section" },
  ] as SearchItem[],
  tr: [
    { label: sectionLabels.tr.home, href: "/", desc: "Ana sayfaya dön" },
    { label: sectionLabels.tr.projects, href: "/projects", desc: "Tüm projeleri gör" },
    { label: sectionLabels.tr.about, href: "/#about", desc: "Bölüme git" },
    { label: sectionLabels.tr.experience, href: "/#experience", desc: "Bölüme git" },
    { label: sectionLabels.tr.education, href: "/#education", desc: "Bölüme git" },
    { label: sectionLabels.tr.connect, href: "/#connect", desc: "Bölüme git" },
  ] as SearchItem[],
};

// ─── Projects Page Intro ─────────────────────────────────
export const projectsIntro = i18n({
  en: "Projects I've built along the way — tools, experiments, and things that quietly get out of the way so users can focus on what actually matters.",
  tr: "Yol boyunca geliştirdiğim projeler — araçlar, denemeler ve kullanıcıların asıl önemli olana odaklanabilmesi için sessizce aradan çekilen şeyler.",
});

// ─── Helper to resolve bilingual values ─────────────────
export function resolve<T>(value: Bilingual<T> | T, lang: Lang): T {
  if (value && typeof value === "object" && "en" in value && "tr" in value) {
    return (value as Bilingual<T>)[lang];
  }
  return value as T;
}
