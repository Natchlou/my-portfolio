import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"

import { relations } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  email: text("email").notNull().unique(),

  passwordHash: text("password_hash").notNull(),

  name: text("name"),

  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .$defaultFn(() => new Date()),
})

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),

  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .$defaultFn(() => new Date()),
})

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  slug: text("slug").notNull().unique(),

  description: text("description").notNull(),

  content: text("content").notNull(),

  image: text("image"),

  category: text("category").notNull(),

  githubUrl: text("github_url"),

  demoUrl: text("demo_url"),

  featured: integer("featured", {
    mode: "boolean",
  })
    .notNull()
    .default(false),

  published: integer("published", {
    mode: "boolean",
  })
    .notNull()
    .default(false),

  sortOrder: integer("sort_order").notNull().default(0),

  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .$defaultFn(() => new Date()),

  updatedAt: integer("updated_at", {
    mode: "timestamp",
  })
    .notNull()
    .$defaultFn(() => new Date()),
})

export const projectTechnologies = sqliteTable(
  "project_technologies",
  {
    id: integer("id").primaryKey({
      autoIncrement: true,
    }),

    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),

    technology: text("technology").notNull(),
  }
)

export const projectRelations = relations(projects, ({ many }) => ({
  technologies: many(projectTechnologies),
}))

export const projectTechnologyRelations = relations(
  projectTechnologies,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectTechnologies.projectId],
      references: [projects.id],
    }),
  })
)