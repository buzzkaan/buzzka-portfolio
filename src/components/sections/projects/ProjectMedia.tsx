import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectEntry } from "@/data/resume-data";

interface ProjectMediaProps {
  project: ProjectEntry;
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  const liveLink = project.links.find((link) => link.type === "live");

  return (
    <div
      className={cn(
        "group/media relative aspect-video w-full overflow-hidden border-b border-edge bg-gradient-to-br",
        project.color,
      )}
    >
      {project.media?.type === "iframe" ? (
        <iframe
          src={project.media.url}
          title={project.title}
          className="pointer-events-none h-full w-full"
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
          <span className="select-none font-pixel text-2xl text-muted-foreground/55 sm:text-3xl">
            {project.title}
          </span>
        </div>
      )}

      {liveLink && (
        <a
          href={liveLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/55 opacity-0 ui-transition group-hover/media:opacity-100"
        >
          <span className="flex items-center gap-2 border border-white/30 bg-zinc-950/70 px-4 py-2 font-pixel text-xs text-white backdrop-blur-sm">
            <ExternalLink size={12} />
            Open Live
          </span>
        </a>
      )}
    </div>
  );
}
