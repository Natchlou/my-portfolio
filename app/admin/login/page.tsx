import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { db } from "@/src/db"
import { users } from "@/src/db/schema"
import { createSession, getCurrentUser } from "@/src/lib/auth/session"
import { verifyPassword } from "@/src/lib/auth/password"

async function login(formData: FormData) {
  "use server"

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()

  const password = String(
    formData.get("password") ?? ""
  )

  if (!email || !password) {
    redirect("/admin/login?error=missing")
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  const user = result[0]

  if (!user) {
    redirect("/admin/login?error=invalid")
  }

  const valid = await verifyPassword(
    password,
    user.passwordHash
  )

  if (!valid) {
    redirect("/admin/login?error=invalid")
  }

  await createSession(user.id)

  redirect("/admin")
}

export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/admin")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">
            ADMIN
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Connexion
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Connectez-vous pour gérer votre portfolio.
          </p>
        </div>

        <form
          action={login}
          className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-6"
        >
          <div>
            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Mot de passe
            </label>

            <input
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  )
}