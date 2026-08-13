import { asc, eq } from "drizzle-orm"

import { db } from "@/src/db"
import {
  projects,
  projectTechnologies,
} from "@/src/db/schema"

export async function getPublishedProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(asc(projects.sortOrder))
}

export async function getFeaturedProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(asc(projects.sortOrder))
}

export async function getAllProjects() {
  return db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder))
}

export async function getProjectById(id: number) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1)

  return result[0] ?? null
}

export async function getProjectBySlug(slug: string) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1)

  return result[0] ?? null
}

export async function getProjectTechnologies(
  projectId: number
) {
  return db
    .select()
    .from(projectTechnologies)
    .where(
      eq(projectTechnologies.projectId, projectId)
    )
}