type ProjectFormProps = {
  action: (formData: FormData) => void
  project?: {
    title: string
    slug: string
    description: string
    content: string
    category: string
    image: string | null
    githubUrl: string | null
    demoUrl: string | null
    featured: boolean
    published: boolean
    sortOrder: number
    technologies: string[]
  }
}

export function ProjectForm({
  action,
  project,
}: ProjectFormProps) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Field
          name="title"
          label="Titre"
          defaultValue={project?.title}
          required
        />

        <Field
          name="slug"
          label="Slug"
          defaultValue={project?.slug}
          required
        />

        <Field
          name="category"
          label="Catégorie"
          defaultValue={project?.category}
          placeholder="Full Stack"
          required
        />

        <Field
          name="sortOrder"
          label="Ordre"
          type="number"
          defaultValue={project?.sortOrder ?? 0}
        />

        <Field
          name="image"
          label="Image"
          defaultValue={project?.image ?? ""}
          placeholder="/projects/beamng.png"
        />

        <Field
          name="githubUrl"
          label="GitHub"
          defaultValue={project?.githubUrl ?? ""}
        />

        <Field
          name="demoUrl"
          label="Démo"
          defaultValue={project?.demoUrl ?? ""}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description courte
        </label>

        <textarea
          name="description"
          required
          defaultValue={project?.description}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Contenu
        </label>

        <textarea
          name="content"
          required
          defaultValue={project?.content}
          rows={12}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm outline-none focus:border-primary"
          placeholder="Décris le projet..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Technologies
        </label>

        <input
          name="technologies"
          defaultValue={project?.technologies.join(", ")}
          placeholder="Next.js, TypeScript, SQLite, Drizzle"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <Checkbox
          name="featured"
          label="Projet mis en avant"
          checked={project?.featured}
        />

        <Checkbox
          name="published"
          label="Projet publié"
          checked={project?.published}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"
      >
        {project ? "Enregistrer les modifications" : "Créer le projet"}
      </button>
    </form>
  )
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  placeholder,
  required,
}: {
  name: string
  label: string
  type?: string
  defaultValue?: string | number
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary"
      />
    </div>
  )
}

function Checkbox({
  name,
  label,
  checked,
}: {
  name: string
  label: string
  checked?: boolean
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input
        name={name}
        type="checkbox"
        defaultChecked={checked}
        className="h-4 w-4 accent-primary"
      />

      {label}
    </label>
  )
}