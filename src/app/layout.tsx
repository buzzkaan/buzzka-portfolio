import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaan Demir",
  description: "24 • Full Stack Developer. Building tools that quietly get out of the way.",
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
      className={`${geistSans.variable} h-full antialiased`}
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
