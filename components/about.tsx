import { SectionHeading } from "./section-heading"

export function About() {
  return (
    <section id="about" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="À propos"
          title="Développer, apprendre et construire."
          description="Quelques mots sur mon parcours et ma manière de travailler."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <p className="leading-8 text-muted-foreground">
              Passionné par le développement web, j&apos;aime concevoir des
              applications de A à Z : de l&apos;interface utilisateur à la
              base de données en passant par les API et la logique
              métier.
            </p>

            <p className="mt-5 leading-8 text-muted-foreground">
              Je travaille principalement avec React, Next.js,
              TypeScript et différentes technologies backend.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <p className="text-sm text-muted-foreground">
              Actuellement
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              À la recherche d&apos;une alternance
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Je recherche une entreprise qui me permettra de continuer
              à progresser en développement web tout en participant à
              des projets concrets.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}