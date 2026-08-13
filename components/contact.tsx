import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { SectionHeading } from "./section-heading"

export function Contact() {
  return (
    <section id="contact" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-8 sm:p-12">
          <SectionHeading
            eyebrow="Contact"
            title="Un projet ? Une opportunité ?"
            description="Je suis actuellement à la recherche d'une alternance en développement web."
          />

          <div className="flex flex-wrap gap-4">
            <Link
              href="mailto:nathan.jullien@proton.me"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              <Mail className="h-4 w-4" />
              Me contacter
            </Link>

            <Link
              href="https://linkedin.com/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 font-medium"
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}