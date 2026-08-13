import Link from "next/link"

import { getFeaturedProjects } from "@/src/lib/queries/projects"
import { ProjectCard } from "./project-card"

export async function Projects() {
  const projects = await getFeaturedProjects()

  return (
    <section
      id="projects"
      className="border-t border-white/10 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Projets
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Ce que j&apos;ai construit.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        <Link
          href="/projects"
          className="mt-10 inline-block text-sm hover:text-primary"
        >
          Voir tous les projets →
        </Link>
      </div>
    </section>
  )
}