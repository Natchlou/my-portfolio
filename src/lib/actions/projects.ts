"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { db } from "@/src/db"
import {
  projects,
  projectTechnologies,
} from "@/src/db/schema"

import { requireUser } from "@/src/lib/auth/session"

const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  content: z.string().min(10),
  category: z.string().min(2),
  image: z.string().optional(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number(),
  technologies: z.array(z.string()),
})

function parseProject(formData: FormData) {
  const technologies = String(
    formData.get("technologies") ?? ""
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)

  return projectSchema.parse({
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(
      formData.get("description") ?? ""
    ),
    content: String(formData.get("content") ?? ""),
    category: String(formData.get("category") ?? ""),
    image: String(formData.get("image") ?? "") || undefined,
    githubUrl:
      String(formData.get("githubUrl") ?? "") || undefined,
    demoUrl:
      String(formData.get("demoUrl") ?? "") || undefined,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    technologies,
  })
}

export async function createProject(formData: FormData) {
  await requireUser()

  const data = parseProject(formData)

  const [project] = await db
    .insert(projects)
    .values({
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category: data.category,
      image: data.image,
      githubUrl: data.githubUrl,
      demoUrl: data.demoUrl,
      featured: data.featured,
      published: data.published,
      sortOrder: data.sortOrder,
    })
    .returning()

  if (data.technologies.length > 0) {
    await db.insert(projectTechnologies).values(
      data.technologies.map((technology) => ({
        projectId: project.id,
        technology,
      }))
    )
  }

  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/projects")

  redirect("/admin/projects")
}

export async function updateProject(
  id: number,
  formData: FormData
) {
  await requireUser()

  const data = parseProject(formData)

  await db
    .update(projects)
    .set({
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category: data.category,
      image: data.image,
      githubUrl: data.githubUrl,
      demoUrl: data.demoUrl,
      featured: data.featured,
      published: data.published,
      sortOrder: data.sortOrder,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))

  await db
    .delete(projectTechnologies)
    .where(eq(projectTechnologies.projectId, id))

  if (data.technologies.length > 0) {
    await db.insert(projectTechnologies).values(
      data.technologies.map((technology) => ({
        projectId: id,
        technology,
      }))
    )
  }

  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  revalidatePath(`/projects/${data.slug}`)

  redirect("/admin/projects")
}

export async function deleteProject(id: number) {
  await requireUser()

  await db
    .delete(projects)
    .where(eq(projects.id, id))

  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
}