"use client";

import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { DottedPattern, StripeDivider } from "@/components/Decorative";
import { SectionWrapper } from "@/components/SectionWrapper";
import { FooterSection } from "@/components/FooterSection";
import { GitHubIcon } from "@/components/icons";
import { Tag } from "@/components/Tag";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/lib/language";
import { projects, projectsIntro, sectionLabels } from "@/data/resume-data";
import type { ProjectEntry } from "@/data/resume-data";
import type { Lang } from "@/lib/language";

function ProjectMedia({ project }: { project: ProjectEntry }) {
  const liveLink = project.links.find((l) => l.type === "live");

  return (
    <div className={`group/media relative aspect-video w-full overflow-hidden border-b border-edge bg-gradient-to-br ${project.color}`}>
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

      {/* Hover overlay */}
      {liveLink && (
        <a
          href={liveLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover/media:opacity-100"
        >
          <span className="flex items-center gap-2 border border-white/30 bg-black/60 px-4 py-2 font-mono text-xs text-white backdrop-blur-sm">
            <ExternalLink size={12} />
            Open Live
          </span>
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, lang, index }: { project: ProjectEntry; lang: Lang; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="group border border-edge bg-background transition-colors duration-200 hover:border-foreground/30">
      {/* Header bar */}
      <div className="flex items-center gap-3 border-b border-edge px-4 py-2.5">
        <span className="font-pixel text-sm text-muted-foreground/40 select-none">{num}</span>
        <h3 className="font-pixel text-base font-semibold text-foreground leading-none">{project.title}</h3>
        <span className="ml-auto font-mono text-xs text-muted-foreground/60 shrink-0">{project.date}</span>
      </div>

      {/* Media */}
      <ProjectMedia project={project} />

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-sm leading-relaxed text-foreground/70">{project.description[lang]}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-edge bg-muted/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              {link.type === "github" ? <GitHubIcon size={13} /> : <ExternalLink size={13} />}
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

          <SectionWrapper heading={labels.projects} withCorners>
            <div className="p-4 pb-2">
              <p className="text-sm leading-relaxed text-muted-foreground">{projectsIntro[lang]}</p>
            </div>

            <div className="p-4 pt-3 space-y-3">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} lang={lang} index={i} />
              ))}
            </div>
          </SectionWrapper>

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
