"use client";

import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { DottedPattern, StripeDivider, CornerCross } from "@/components/Decorative";
import { SectionHeading } from "@/components/SectionHeading";
import { FooterSection } from "@/components/FooterSection";
import { GitHubIcon } from "@/components/icons";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/lib/language";
import { projects, projectsIntro, sectionLabels } from "@/data/resume-data";
import type { ProjectEntry } from "@/data/resume-data";
import type { Lang } from "@/lib/language";

function LinkIcon({ type }: { type: "live" | "github" | "model" }) {
  if (type === "github") return <GitHubIcon size={14} />;
  return <ExternalLink size={14} />;
}

function ProjectCard({ project, lang }: { project: ProjectEntry; lang: Lang }) {
  return (
    <div className="space-y-4">
      {/* Media: iframe / video / fallback */}
      <div
        className={`aspect-video w-full overflow-hidden  border border-edge bg-gradient-to-br ${project.color}`}
      >
        {project.media?.type === "iframe" ? (
          <iframe
            src={project.media.url}
            title={project.title}
            className="h-full w-full pointer-events-none"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : project.media?.type === "video" ? (
          <iframe
            src={project.media.url}
            title={project.title}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-pixel text-2xl text-foreground/20 select-none sm:text-3xl">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <span className="font-mono text-xs text-muted-foreground">{project.date}</span>
        <h3 className="font-pixel text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/70">{project.description[lang]}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center  border border-edge bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5  border border-edge bg-muted/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              <LinkIcon type={link.type} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <>
      <NavBar />
      <main className="max-w-screen overflow-x-hidden px-2">
        <div className="mx-auto md:max-w-3xl">
          <DottedPattern />
          <StripeDivider />

          <section className="screen-line-before screen-line-after relative border-x border-edge">
            <CornerCross position="top-left" />
            <CornerCross position="top-right" />

            <SectionHeading>{labels.projects}</SectionHeading>
            <div className="p-4 pb-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {projectsIntro[lang]}
              </p>
            </div>

            <div className="space-y-10 p-4 pt-4">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} lang={lang} />
              ))}
            </div>

            <CornerCross position="bottom-left" />
            <CornerCross position="bottom-right" />
          </section>

          <StripeDivider />
        </div>
      </main>
      <footer className="max-w-screen px-2">
        <FooterSection />
        <div className="mx-auto md:max-w-3xl">
          <DottedPattern />
        </div>
      </footer>
    </>
  );
}
