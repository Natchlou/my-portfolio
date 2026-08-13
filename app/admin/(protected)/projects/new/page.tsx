import Link from "next/link"

import { createProject } from "@/src/lib/actions/projects"
import { ProjectForm } from "@/components/admin/project-form"

export default function NewProjectPage() {
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
          Nouveau projet
        </h1>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/3 p-6 md:p-8">
          <ProjectForm action={createProject} />
        </div>
      </div>
    </div>
  )
}