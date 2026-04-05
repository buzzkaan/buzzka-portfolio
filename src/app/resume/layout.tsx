import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Kaan Demir — Full Stack Developer with experience in Next.js, TypeScript, React, and Web3 development.",
  openGraph: {
    title: "Resume | Kaan Demir",
    description:
      "Resume of Kaan Demir — Full Stack Developer with experience in Next.js, TypeScript, React, and Web3 development.",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
