import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type ProjectCardProps = {
  project: {
    id: number
    title: string
    slug: string
    description: string
    image: string | null
    category: string
  }
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            {project.title}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-primary">
              {project.category}
            </p>

            <h3 className="mt-1 text-xl font-semibold">
              {project.title}
            </h3>
          </div>

          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
      </div>
    </Link>
  )
}