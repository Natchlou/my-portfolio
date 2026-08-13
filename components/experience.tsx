import { experience } from "@/data/experience"
import { SectionHeading } from "./section-heading"

export function Experience() {
  return (
    <section className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Parcours"
          title="Mon parcours."
        />

        <div className="relative border-l border-white/10 pl-8">
          {experience.map((item) => (
            <div key={`${item.date}-${item.title}`} className="relative pb-12 last:pb-0">
              <span className="absolute -left-9.25 top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />

              <p className="text-sm text-primary">{item.date}</p>

              <h3 className="mt-2 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.company}
              </p>

              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}