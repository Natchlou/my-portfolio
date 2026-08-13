import Link from "next/link"
import { count, eq } from "drizzle-orm"

import { db } from "@/src/db"
import { projects } from "@/src/db/schema"

export default async function AdminDashboard() {
  const [{ total }] = await db
    .select({
      total: count(),
    })
    .from(projects)

  const [{ published }] = await db
    .select({
      published: count(),
    })
    .from(projects)
    .where(eq(projects.published, true))

  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm text-primary">
            DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Bienvenue Nathan
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Stat
            label="Projets"
            value={total}
          />

          <Stat
            label="Publiés"
            value={published}
          />

          <Link
            href="/admin/projects/new"
            className="flex min-h-32 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-sm font-medium hover:bg-primary/20"
          >
            + Ajouter un projet
          </Link>
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="min-h-32 rounded-2xl border border-white/10 bg-white/3 p-6">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-4 text-4xl font-bold">
        {value}
      </p>
    </div>
  )
}