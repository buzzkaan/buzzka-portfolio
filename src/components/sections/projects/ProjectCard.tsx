import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Tag } from "@/components/ui/Tag";
import { ProjectMedia } from "@/components/sections/projects/ProjectMedia";
import type { ProjectEntry } from "@/data/resume-data";
import type { Lang } from "@/lib/language";

interface ProjectCardProps {
  index: number;
  lang: Lang;
  project: ProjectEntry;
}

export function ProjectCard({ index, lang, project }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group border border-edge bg-background ui-transition hover:border-foreground/30 hover:bg-muted/20">
      <div className="flex items-center gap-3 border-b border-edge px-4 py-2.5">
        <span className="ui-text-caption select-none text-muted-foreground/60">{num}</span>
        <h3 className="ui-text-title">
          {project.title}
        </h3>
        <span className="ui-text-meta ml-auto shrink-0">
          {project.date}
        </span>
      </div>

      <ProjectMedia project={project} />

      <div className="flex flex-col gap-3 p-4">
        <p className="ui-text-body">
          {project.description[lang]}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.links.map((link) => (
            <LinkButton key={link.url} href={link.url} external>
              {link.type === "github" ? <GitHubIcon size={13} /> : <ExternalLink size={13} />}
              {link.label}
            </LinkButton>
          ))}
        </div>
      </div>
    </article>
  );
}
