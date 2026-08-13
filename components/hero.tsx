import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[48px_48px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Disponible pour une alternance
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
            Développeur
            <br />
            <span className="text-primary">Web Full Stack.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Je conçois des applications web modernes, performantes
            et pensées pour offrir une expérience utilisateur simple
            et efficace.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              Découvrir mes projets
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#contact"
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-medium transition-colors hover:bg-white/10"
            >
              Me contacter
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <Link
              href="https://github.com/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
            </Link>

            <Link
              href="https://linkedin.com/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
            </Link>
          </div>
        </div>

        <ArrowDown className="absolute bottom-8 left-1/2 h-5 w-5 -translate-x-1/2 animate-bounce text-muted-foreground" />
      </div>
    </section>
  )
}