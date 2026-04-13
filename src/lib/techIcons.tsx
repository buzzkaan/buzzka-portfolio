import type { ComponentType } from "react";
import {
  NextJs,
  TypeScript,
  React,
  TailwindCSS,
  GraphQL,
  Redux,
  Zod,
  Bootstrap5,
  JQuery,
  NodeJs,
  HTML5,
  CSS3,
  JavaScript,
  Figma,
  VercelDark,
  Supabase,
  ThreeJsDark,
  FramerDark,
  Prisma,
  Clerk,
} from "developer-icons";

interface IconEntry {
  Icon: ComponentType<{ size?: number; className?: string }>;
  /** Apply dark:invert so black icons stay visible on dark backgrounds. */
  invert?: boolean;
}

const TECH_ICONS: Record<string, IconEntry> = {
  // — Frameworks & runtimes
  "Next.js":        { Icon: NextJs, invert: true },
  "React":          { Icon: React },
  "Node-RED":       { Icon: NodeJs },

  // — Languages
  "TypeScript":     { Icon: TypeScript },
  "JavaScript":     { Icon: JavaScript },
  "HTML":           { Icon: HTML5 },
  "HTML5":          { Icon: HTML5 },
  "CSS":            { Icon: CSS3 },
  "CSS3":           { Icon: CSS3 },

  // — Styling
  "Tailwind CSS":   { Icon: TailwindCSS },
  "Bootstrap":      { Icon: Bootstrap5 },

  // — Libraries & tools
  "GraphQL":        { Icon: GraphQL },
  "Redux Toolkit":  { Icon: Redux },
  "Redux":          { Icon: Redux },
  "Zod":            { Icon: Zod },
  "jQuery":         { Icon: JQuery },
  "Figma":          { Icon: Figma },
  "Framer Motion":  { Icon: FramerDark, invert: true },
  "Three.js":       { Icon: ThreeJsDark, invert: true },

  // — Backend & database
  "Prisma":         { Icon: Prisma },
  "Supabase":       { Icon: Supabase },
  "Clerk":          { Icon: Clerk },

  // — Platform
  "Vercel":         { Icon: VercelDark, invert: true },
};

export function getTechIcon(tag: string): IconEntry | undefined {
  return TECH_ICONS[tag];
}
