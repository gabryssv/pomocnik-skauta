import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFunctionById, countSkills } from "@/lib/functions"
import { getIconComponent } from "@/lib/icons"

export default async function FunctionPage({ params }: { params: { functionId: string } }) {
    const func = await getFunctionById(params.functionId)
    if (!func) return notFound()

    const Icon = getIconComponent(func.icon || undefined)
    const totalSkills = countSkills(func.skills)

    const colorBg = func.color_background || "bg-neutral-700/10"
    const colorText = func.color_text || "text-neutral-300"
    const colorBorder = func.color_border || "border-neutral-700/20"

    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-neutral-900 mb-4 rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Powrót do wyboru funkcji
                        </Button>
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${colorBg} ${colorText} ${colorBorder} border`}>
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
                    {/* Left - shows first category preview for symmetry with previous UI */}
                    <div className="space-y-4">
                        {func.skills && func.skills[0] && (
                            <Card className="bg-neutral-950 border-neutral-800">
                                <CardHeader className="px-7 py-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-xl text-white">{func.skills[0].category}</CardTitle>
                                        </div>
                                        <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-neutral-800">
                                            {Array.isArray(func.skills[0].items) ? func.skills[0].items.length : 0} umiejętności
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 pl-7 pr-7 flex-1">
                                    <div className="space-y-3 pl-0">
                                        {(func.skills[0].items || []).map((skill, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-neutral-300 py-1.5">
                                                <div className={`w-2 h-2 rounded-full ${colorText} flex-shrink-0`} />
                                                <span>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right - list all categories */}
                    <div className="flex flex-col gap-4 w-full h-full">
                        {(func.skills || []).map((group, index) => (
                            <Card key={index} className="bg-neutral-950 border-neutral-800 hover:bg-neutral-900 transition-colors duration-300">
                                <CardHeader className="px-7 py-7 h-full flex items-center justify-center">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <ChevronRight className="h-5 w-5 text-neutral-400" />
                                            <CardTitle className="text-xl text-white">{group.category}</CardTitle>
                                        </div>
                                        <Badge variant="secondary" className="hidden md:flex text-neutral-300 bg-neutral-900 border-neutral-800">
                                            {Array.isArray(group.items) ? group.items.length : 0} umiejętności
                                        </Badge>
                                    </div>
                                </CardHeader>
                                {Array.isArray(group.items) && group.items.length > 0 && (
                                    <CardContent className="pt-0 pl-7 pr-7 pb-7">
                                        <div className="space-y-2">
                                            {group.items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 text-neutral-300 py-1.5">
                                                    <div className={`w-2 h-2 rounded-full ${colorText} flex-shrink-0`} />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Card className="bg-neutral-950 border-neutral-800 max-w-2xl mx-auto">
                        <CardContent className="pt-6">
                            <p className="text-neutral-400 mb-4">
                                {/* extra copy can be stored later in DB if needed */}
                            </p>
                            <Link href="/">
                                <Button variant="outline" className="text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Wybierz inną funkcję
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}