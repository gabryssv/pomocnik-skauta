import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFunctionById, countSkills, getAllFunctions } from "../../lib/functions"
import { FunctionPageClient } from "./function-page-client"

// Generowanie dynamicznych metadanych dla SEO
export async function generateMetadata({ params }: { params: Promise<{ functionId: string }> }): Promise<Metadata> {
    const resolvedParams = await params
    const func = await getFunctionById(resolvedParams.functionId)

    if (!func) {
        return {
            title: "Funkcja nie znaleziona - Pomocnik Skauta",
            description: "Funkcja harcerska nie została znaleziona. Wróć do strony głównej aby wybrać dostępną funkcję."
        }
    }

    const totalSkills = countSkills(func.skills)
    const skillCategories = func.skills?.map(skill => skill.category).join(", ") || ""

    const title = `${func.name} - Umiejętności Harcerskie | Pomocnik Skauta`
    const description = `Poznaj wszystkie umiejętności potrzebne do pełnienia funkcji ${func.name} w harcerstwie. ${totalSkills} umiejętności w kategoriach: ${skillCategories}. Kompletny przewodnik dla harcerzy.`

    return {
        title,
        description,
        keywords: [
            func.name,
            "harcerstwo",
            "umiejętności harcerskie",
            "funkcje harcerskie",
            "scouting",
            "ZHP",
            skillCategories,
            "przewodnik harcerski"
        ].filter(Boolean).join(", "),
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://pomocnik-skauta.pl/${resolvedParams.functionId}`,
            siteName: "Pomocnik Skauta",
            locale: "pl_PL",
            images: [
                {
                    url: "https://pomocnik-skauta.pl/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${func.name} - Umiejętności Harcerskie`
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["https://pomocnik-skauta.pl/og-image.jpg"]
        },
        alternates: {
            canonical: `https://pomocnik-skauta.pl/${resolvedParams.functionId}`
        }
    }
}

// Statyczne ścieżki dla lepszego SEO
export async function generateStaticParams() {
    const functions = await getAllFunctions()

    return functions.map((func) => ({
        functionId: func.id
    }))
}

export default async function FunctionPage({ params }: { params: Promise<{ functionId: string }> }) {
    const resolvedParams = await params
    const func = await getFunctionById(resolvedParams.functionId)

    if (!func) {
        notFound()
    }

    return <FunctionPageClient func={func} />
}

