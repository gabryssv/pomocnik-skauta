"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import { useState, lazy, Suspense } from "react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { countSkills } from "../../lib/functions"
import { getIconComponent } from "../../lib/icons"
import type { SkillCategory } from "../../lib/functions"

// Lazy load Footer dla lepszej wydajności
const LazyFooter = lazy(() => import("@/components/footer"))

interface FunctionPageClientProps {
    func: any
}

export function FunctionPageClient({ func }: FunctionPageClientProps) {
    const [selectedSection, setSelectedSection] = useState<number>(0)

    const Icon = getIconComponent(func.icon || undefined)
    const totalSkills = countSkills(func.skills)

    const colorBg = func.color_background || "bg-neutral-700/10"
    const colorText = func.color_text || "text-neutral-500"
    const colorBorder = func.color_border || "border-neutral-700/20"

    // Extract color value for ring (remove 'text-' prefix)
    const ringColor = func.color_text?.replace('text-', '') || 'neutral-500'

    // Extract actual color value for the dots
    const dotColor = func.color_text?.replace('text-', '') || 'neutral-500'
    const dotColorClass = `bg-${dotColor}`

    // Create ring class by replacing text- with ring-
    const ringColorClass = `ring-${ringColor}`

    // Dane strukturalne JSON-LD dla funkcji
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": func.name,
        "description": `Poznaj wszystkie umiejętności potrzebne do pełnienia funkcji ${func.name} w harcerstwie`,
        "provider": {
            "@type": "Organization",
            "name": "Pomocnik Skauta",
            "url": "https://pomocnik-skauta.pl"
        },
        "about": {
            "@type": "Thing",
            "name": "Harcerstwo",
            "description": "Umiejętności harcerskie i funkcje w zastępie"
        },
        "educationalLevel": "Beginner",
        "inLanguage": "pl",
        "courseCode": func.id,
        "numberOfCredits": totalSkills,
        "syllabusSections": func.skills?.map((skill: any) => ({
            "@type": "Syllabus",
            "name": skill.category,
            "description": `${skill.items?.length || 0} umiejętności w kategorii ${skill.category}`,
            "timeRequired": "PT30M"
        }))
    }

    return (
        <div className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />
            <Navbar />
            <div className="min-h-screen max-w-6xl mx-auto px-4 py-8 pt-24">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-neutral-900 mb-4 rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Powrót do wyboru funkcji
                        </Button>
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 rounded-full ${colorBg} ${colorText}`}>
                            <Icon className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">{func.name}</h1>
                            <p className="text-neutral-400">{func.description || ""}</p>
                        </div>
                    </div>

                    <Badge variant="secondary" className="text-neutral-300 border-neutral-700 bg-neutral-900">
                        {totalSkills} umiejętności do opanowania
                    </Badge>
                </div>

                {/* Categories and Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
                    {/* Mobile: Card Carousel */}
                    <div className="block md:hidden space-y-4">
                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setSelectedSection(prev => prev > 0 ? prev - 1 : (func.skills?.length - 1) || 0)}
                                className="bg-neutral-900 border-neutral-700 hover:bg-neutral-800"
                            >
                                <ChevronLeft className="h-4 w-4 text-neutral-400" />
                            </Button>

                            <div className="text-center">
                                <p className="text-white font-medium">{func.skills?.[selectedSection]?.category || 'Brak kategorii'}</p>
                                <p className="text-neutral-400 text-sm">
                                    {selectedSection + 1} z {func.skills?.length || 0} ({Array.isArray(func.skills?.[selectedSection]?.items) ? func.skills[selectedSection].items.length : 0} umiejętności)
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setSelectedSection(prev => prev < (func.skills?.length - 1) || 0 ? prev + 1 : 0)}
                                className="bg-neutral-900 border-neutral-700 hover:bg-neutral-800"
                            >
                                <ChevronRight className="h-4 w-4 text-neutral-400" />
                            </Button>
                        </div>

                        {/* Dots indicator */}
                        <div className="flex justify-center gap-2">
                            {(func.skills || []).map((_: SkillCategory, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSection(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === selectedSection ? dotColorClass : 'bg-neutral-600'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Current card */}
                        {func.skills && func.skills[selectedSection] && (
                            <Card className="bg-neutral-950 border-neutral-800">
                                <CardContent className="p-7">
                                    <div className="space-y-3">
                                        {(func.skills[selectedSection].items || []).map((skill: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 text-neutral-300 py-1.5">
                                                <div className={`w-2 h-2 rounded-full ${dotColorClass} flex-shrink-0`} />
                                                <span>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Desktop: Original 2-column layout */}
                    <div className="hidden md:block space-y-4">
                        {func.skills && func.skills[selectedSection] && (
                            <Card className="bg-neutral-950 border-neutral-800">
                                <CardHeader className="px-7 py-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-xl text-white">{func.skills[selectedSection].category}</CardTitle>
                                        </div>
                                        <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-neutral-800">
                                            {Array.isArray(func.skills[selectedSection].items) ? func.skills[selectedSection].items.length : 0} umiejętności
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 pl-7 pr-7 flex-1">
                                    <div className="space-y-3 pl-0">
                                        {(func.skills[selectedSection].items || []).map((skill: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 text-neutral-300 py-1.5">
                                                <div className={`w-2 h-2 rounded-full ${dotColorClass} flex-shrink-0`} />
                                                <span>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Desktop: Right column (hidden on mobile) */}
                    <div className="hidden md:flex flex-col gap-4 w-full h-full">
                        {(func.skills || []).map((group: SkillCategory, index: number) => (
                            <Card
                                key={index}
                                className={`bg-neutral-950 border-neutral-800 hover:bg-neutral-900 transition-colors duration-300 cursor-pointer ${index === selectedSection ? `ring-2 ${ringColorClass} ring-offset-2 ring-offset-black` : ""}`}
                            >
                                <CardHeader
                                    className="px-7 py-7 h-full flex items-center justify-center"
                                    onClick={() => setSelectedSection(index)}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <ChevronRight className="h-5 w-5 text-neutral-400" />
                                            <CardTitle className="text-xl text-white">{group.category}</CardTitle>
                                        </div>
                                        <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-neutral-800">
                                            {Array.isArray(group.items) ? group.items.length : 0} umiejętności
                                        </Badge>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/">
                        <Button variant="outline" className="text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Wybierz inną funkcję
                        </Button>
                    </Link>
                </div>
            </div>

            <Suspense fallback={<div className="h-32 bg-neutral-900/50 animate-pulse" />}>
                <LazyFooter />
            </Suspense>
        </div>
    )
}