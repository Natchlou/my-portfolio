import Link from "next/link"
import { getCurrentUser } from "@/src/lib/auth/session"
import { LogoutButton } from "./logout-button"

export async function Sidebar() {
  const user = await getCurrentUser()

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-[#080808] md:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 p-6">
          <Link href="/admin">
            <span className="font-bold">
              Nathan<span className="text-primary">.</span>
            </span>

            <span className="ml-2 text-xs text-muted-foreground">
              ADMIN
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/admin"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-white/5"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/projects"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-white/5"
          >
            Projets
          </Link>

          <Link
            href="/"
            target="_blank"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-white/5"
          >
            Voir le portfolio
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate px-2 text-xs text-muted-foreground">
            {user?.email}
          </p>

          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}