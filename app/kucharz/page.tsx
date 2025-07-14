"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChefHat, ChevronRight } from "lucide-react"

const skills = [
	{
		category: "Teoria i dietetyka",
		items: [
			"teoria dietetyki (makroskladniki i kalorie, jakie produkty w co są bogate)",
			"jak jeść zdrowo i czego unikać",
		],
	},
	{
		category: "Kuchnia polowa",
		items: [
			"przedstawienie sposobów na prostą kuchnię w terenie np trójnóg",
			"jak przygotować posiłek traperski",
			"praktyczne sposoby na szybkie zagotowanie wody na ogniu",
			"jak przygotować dobre posiłki jednogarnkowe (zapisanie przepisu w książce zastępu)",
		],
	},
	{
		category: "Higiena i bezpieczeństwo",
		items: ["jak dbać o higienę w kuchni"],
	},
	{
		category: "Techniki kulinarne",
		items: [
			"jak używać przypraw, jakie do czego pasują",
			"jak sprawnie kroić składniki",
			"gotowanie specjalnego dania, nauka zastępu jak go przygotować najlepiej i wspólna praktyka",
			"jak upiec pizzę na ognisku (można połączyć z budową pieca przez pioniera)",
			"jak zrobić marynatę i na czym ona polega",
		],
	},
]

export default function KucharzPage() {
	const [selectedSection, setSelectedSection] = useState<number>(0)

	return (
		<div className="min-h-screen bg-black">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<Link href="/" data-aos="fade-right">
						<Button className="mb-4 rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-neutral-400 transition-colors duration-300 hover:bg-neutral-800">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Powrót do wyboru funkcji
						</Button>
					</Link>

					<div className="mb-4 flex items-center gap-4" data-aos="fade-left">
						<div className="rounded-lg text-red-500 border border-red-500/20 bg-red-500/10 p-3">
							<ChefHat className="h-8 w-8" />
						</div>
						<div>
							<h1 className="text-4xl font-bold text-white">Kucharz</h1>
							<p className="text-neutral-400">
								Gotowanie, dietetyka, kuchnia polowa i higiena żywności
							</p>
						</div>
					</div>

					<Badge className="border-neutral-700 bg-neutral-900 text-neutral-300" variant="secondary" data-aos="fade-in" data-aos-delay="100">
						12 umiejętności do opanowania
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{/* Left Column - Selected Category Preview */}
					<div className="space-y-4" data-aos="fade-up">
						<Card className="border-neutral-800 bg-neutral-950 transition-colors duration-300 hover:bg-neutral-900">
							<CardHeader className="px-7 py-7">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<CardTitle className="text-xl text-white">
											{skills[selectedSection].category}
										</CardTitle>
									</div>
									<Badge className="border-neutral-800 bg-neutral-900 text-neutral-300" variant="secondary">
										{
											skills[selectedSection].items.length
										} umiejętności
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="flex-1 pt-0 pl-7 pr-7">
								<div className="space-y-3 pl-0">
									{skills[selectedSection].items.map((skill, skillIndex) => (
										<div
											key={skillIndex}
											className="flex items-center gap-3 py-1.5 text-neutral-300"
										>
											<div className="flex-shrink-0 h-2 w-2 rounded-full bg-red-500" />
											<span>{skill}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Right Column - All Categories */}
					<div className="flex h-full w-full flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
						{skills.map((skillGroup, index) => (
							<Card
								key={index}
								className={`bg-neutral-950 border-neutral-800 transition-colors duration-300 hover:bg-neutral-900 ${
									index === selectedSection ? "ring-2 ring-red-500/50" : ""
								}`}
							>
								<CardHeader
									className="cursor-pointer px-7 py-7 h-full flex items-center justify-center"
									onClick={() => setSelectedSection(index)}
								>
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-3">
											<ChevronRight className="h-5 w-5 text-neutral-400" />
											<CardTitle className="text-xl text-white">
												{skillGroup.category}
											</CardTitle>
										</div>
										<Badge className="hidden md:flex border-neutral-800 bg-neutral-900 text-neutral-300" variant="secondary">
										{skillGroup.items.length} umiejętności
									</Badge>
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>

				<div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="200">
					<Card className="mx-auto max-w-2xl border-neutral-800 bg-neutral-950">
						<CardContent className="pt-6">
							<p className="mb-4 text-neutral-400">
								Kucharz dba o żywienie zastępu, zapewniając zdrowe, smakowite i
								bezpieczne posiłki w każdych warunkach obozowych.
							</p>
							<Link href="/">
								<Button className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-neutral-400 transition-colors duration-300 hover:bg-neutral-800">
									<ArrowLeft className="mr-2 h-4 w-4" />
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