import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Navbar } from "@/components/navbar"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nathan Jullien — Développeur Web Full Stack",
  description:
    "Portfolio de Nathan Jullien, développeur web full stack.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}