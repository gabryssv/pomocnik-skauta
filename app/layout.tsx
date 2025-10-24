import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans";
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pomocnik Skauta - Funkcje i Umiejętności",
  description: "Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach",
  generator: 'v0.dev',
  metadataBase: new URL('https://pomocnik-skauta.pl'),
  keywords: ['harcerstwo', 'skauci', 'funkcje harcerskie', 'umiejętności', 'zastęp', 'przewodnik skauta'],
  authors: [{ name: 'Skauci Europy' }],
  icons: {
    icon: '/croix-agse.png',
  },
  openGraph: {
    title: 'Pomocnik Skauta - Funkcje i Umiejętności',
    description: 'Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach',
    url: 'https://pomocnik-skauta.pl',
    siteName: 'Pomocnik Skauta',
    images: [
      {
        url: '/croix-agse.png',
        width: 64,
        height: 64,
        alt: 'Logo Skautów Europy',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pomocnik Skauta - Funkcje i Umiejętności',
    description: 'Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach',
    images: ['/croix-agse.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pomocnik Skauta",
    "description": "Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach",
    "url": "https://pomocnik-skauta.pl",
    "inLanguage": "pl",
    "about": {
      "@type": "Organization",
      "name": "Harcerstwo",
      "description": "Skauting i edukacja harcerska"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pomocnik-skauta.pl/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className={`${GeistSans.className} bg-black min-h-screen`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
