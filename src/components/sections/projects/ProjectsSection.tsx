"use client";

import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { projects, projectsIntro, sectionLabels } from "@/data/resume-data";
import { useLang } from "@/lib/language";

export function ProjectsSection() {
  const { lang } = useLang();
  const labels = sectionLabels[lang];

  return (
    <SectionWrapper heading={labels.projects} withCorners>
      <div className="px-4 pt-4 pb-2 sm:px-6">
        <p className="ui-text-body">
          {projectsIntro[lang]}
        </p>
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3 pb-4 sm:px-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} lang={lang} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
