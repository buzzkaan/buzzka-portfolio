import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://buzzkaan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kaan Demir — Full Stack Developer",
    template: "%s | Kaan Demir",
  },
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and React. Building tools that quietly get out of the way.",
  keywords: [
    "Kaan Demir",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Frontend Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Kaan Demir", url: siteUrl }],
  creator: "Kaan Demir",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "tr_TR",
    url: siteUrl,
    siteName: "Kaan Demir",
    title: "Kaan Demir — Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and React. Building tools that quietly get out of the way.",
    images: [
      {
        url: "/pp1.jpg",
        width: 1125,
        height: 1078,
        alt: "Kaan Demir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaan Demir — Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and React. Building tools that quietly get out of the way.",
    images: ["/pp1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full overflow-x-clip antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}else if(!t||t==='system'){if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.classList.add('dark')}}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-clip">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
