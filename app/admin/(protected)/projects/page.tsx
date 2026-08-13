import Link from "next/link"

import { getAllProjects } from "@/src/lib/queries/projects"
import { DeleteProjectButton } from "@/components/admin/delete-project-button"

export default async function AdminProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-primary">
              PORTFOLIO
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Projets
            </h1>
          </div>

          <Link
            href="/admin/projects/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            + Nouveau
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <div className="divide-y divide-white/10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold">
                      {project.title}
                    </h2>

                    {project.published && (
                      <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">
                        Publié
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.category}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
                  >
                    Modifier
                  </Link>

                  <DeleteProjectButton
                    id={project.id}
                  />
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="p-10 text-center text-muted-foreground">
                Aucun projet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}