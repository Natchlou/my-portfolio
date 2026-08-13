import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import {
  getProjectBySlug,
  getProjectTechnologies,
} from "@/src/lib/queries/projects"
import Image from "next/image"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({
  params,
}: Props) {
  const { slug } = await params

  const project = await getProjectBySlug(slug)

  if (!project || !project.published) {
    notFound()
  }

  const technologies =
    await getProjectTechnologies(project.id)

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Tous les projets
      </Link>

      <div className="mt-10">
        <p className="text-sm font-medium text-primary">
          {project.category}
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          {project.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2"
            >
              GitHub
            </Link>
          )}

          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Démo
            </Link>
          )}
        </div>
      </div>

      {project.image && (
        <div className="relative mt-16 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_280px]">
        <article className="whitespace-pre-wrap leading-8 text-muted-foreground">
          {project.content}
        </article>

        <aside>
          <h2 className="font-semibold">
            Technologies
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology.id}
                className="rounded-md bg-white/5 px-3 py-2 text-sm text-muted-foreground"
              >
                {technology.technology}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}