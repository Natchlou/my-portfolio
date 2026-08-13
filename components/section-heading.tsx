type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 leading-7 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}