import { skills } from "@/data/skills"
import { SectionHeading } from "./section-heading"

export function Skills() {
  return (
    <section id="skills" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Compétences"
          title="Les technologies que j'utilise."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-white/10 bg-white/3 p-6"
            >
              <h3 className="font-semibold">{group.category}</h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-white/5 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}