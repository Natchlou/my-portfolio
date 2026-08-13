import { notFound } from "next/navigation"
import Link from "next/link"

import {
  getProjectById,
  getProjectTechnologies,
} from "@/src/lib/queries/projects"

import { updateProject } from "@/src/lib/actions/projects"
import { ProjectForm } from "@/components/admin/project-form"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditProjectPage({
  params,
}: Props) {
  const { id } = await params

  const projectId = Number(id)

  if (!Number.isInteger(projectId)) {
    notFound()
  }

  const project = await getProjectById(projectId)

  if (!project) {
    notFound()
  }

  const technologies =
    await getProjectTechnologies(projectId)

  const update = updateProject.bind(
    null,
    project.id
  )

  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/projects"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Retour aux projets
        </Link>

        <h1 className="mt-6 text-3xl font-bold">
          Modifier {project.title}
        </h1>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/3 p-6 md:p-8">
          <ProjectForm
            action={update}
            project={{
              ...project,
              technologies: technologies.map(
                (item) => item.technology
              ),
            }}
          />
        </div>
      </div>
    </div>
  )
}