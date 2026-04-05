import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Kaan Demir — tools, experiments, and AI-powered applications built with Next.js, TypeScript, and modern web technologies.",
  openGraph: {
    title: "Projects | Kaan Demir",
    description:
      "Projects by Kaan Demir — tools, experiments, and AI-powered applications built with Next.js, TypeScript, and modern web technologies.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
