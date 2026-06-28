"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { cn, getAccentClasses } from "@/lib/utils";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div
      className="project-grid"
      style={{ "--active-project": String(activeProject) } as CSSProperties}
      onMouseLeave={() => setActiveProject(0)}
    >
      {projects.map((project, index) => {
        const isActive = activeProject === index;

        return (
          <article
            key={project.title}
            className={cn(
              "project-panel group relative flex min-h-[520px] flex-col overflow-hidden border-[4px] border-ink bg-cream transition-[filter] duration-200 focus-within:z-20 hover:z-20",
              isActive ? "z-10" : "brightness-[0.97]"
            )}
            onMouseEnter={() => setActiveProject(index)}
          >
            <button
              type="button"
              className="flex min-h-full flex-1 flex-col text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-8px] focus-visible:outline-coral"
              onFocus={() => setActiveProject(index)}
              onClick={() => setActiveProject(index)}
              aria-expanded={isActive}
            >
              <div className={cn("flex items-center justify-between border-b-[4px] border-ink p-4", getAccentClasses(project.accent))}>
                <span className="font-mono text-xs uppercase">{project.category}</span>
                <span className="grid size-10 place-items-center border-[3px] border-ink bg-cream shadow-brutal-sm">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8 p-5">
                <div>
                  <p className="mb-4 w-fit border-[3px] border-ink bg-ink px-3 py-2 font-mono text-xs uppercase text-cream">
                    {project.status}
                  </p>
                  <h3 className="max-w-[10ch] font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[0.83]">
                    {project.title}
                  </h3>
                </div>

                <div className="project-details grid gap-3">
                  <Detail label="Problem" copy={project.problem} />
                  <Detail label="Weird" copy={project.weird} />
                  <Detail label="Work" copy={project.work} />
                  <Detail label="Intended result" copy={project.result} />
                </div>
              </div>
            </button>
          </article>
        );
      })}
    </div>
  );
}

function Detail({ label, copy }: { label: string; copy: string }) {
  return (
    <div className="border-[3px] border-ink bg-cream p-3 shadow-brutal-sm">
      <p className="font-mono text-[0.67rem] uppercase">{label}</p>
      <p className="mt-1 text-sm font-bold leading-snug">{copy}</p>
    </div>
  );
}
