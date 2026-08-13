"use client"

import { redirect } from "next/navigation"

export function LogoutButton() {
  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    })

    redirect('/admin/login')
  }

  return (
    <button
      onClick={logout}
      className="mt-3 w-full rounded-lg px-4 py-3 text-left text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
    >
      Se déconnecter
    </button>
  )
}