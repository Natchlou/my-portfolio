"use client"

import { useTransition } from "react"

import { deleteProject } from "@/src/lib/actions/projects"

export function DeleteProjectButton({
  id,
}: {
  id: number
}) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (
      !confirm(
        "Voulez-vous vraiment supprimer ce projet ?"
      )
    ) {
      return
    }

    startTransition(async () => {
      await deleteProject(id)
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
    >
      {pending ? "Suppression..." : "Supprimer"}
    </button>
  )
}