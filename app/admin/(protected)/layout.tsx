import { redirect } from "next/navigation"
import { getCurrentUser } from "@/src/lib/auth/session"
import { Sidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <Sidebar />

      <main className="md:pl-64">
        {children}
      </main>
    </div>
  )
}