import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans";
import "./globals.css"

export const metadata: Metadata = {
  title: "Skauci Europy - Funkcje i Umiejętności",
  description: "Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={`${GeistSans.className}`}>{children}</body>
    </html>
  )
}
