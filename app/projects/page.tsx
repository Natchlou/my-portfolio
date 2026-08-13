import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"
import { getFeaturedProjects } from "@/src/lib/queries/projects"

export default async function ProjectsPage() {

    const projects = await getFeaturedProjects()
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <SectionHeading
        eyebrow="Portfolio"
        title="Tous mes projets."
        description="Découvrez les différents projets sur lesquels j'ai travaillé."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </main>
  )
}