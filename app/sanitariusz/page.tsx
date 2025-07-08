"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, ChevronRight } from "lucide-react"

const skills = [
  {
    category: "Bezpieczeństwo",
    items: ["jak bezpieczne używać siekiery, piły i innych narzędzi!"],
  },
  {
    category: "Pierwsza pomoc - podstawy",
    items: [
      "podstawowe zasady pierwszej pomocy",
      "podstawowe opatrunki rany",
      "jak unieruchomić kończynę",
      "rko",
      "pierwsza pomoc w przypadku oparzenia",
      "pierwsza pomoc w przypadku przecięcia palca",
    ],
  },
  {
    category: "Apteczka i wyposażenie",
    items: [
      "jak przygotować apteczkę? Co mamy w swojej? Jak korzystać z każdej rzeczy w niej?",
      "budowa prowizorycznych noszy",
    ],
  },
  {
    category: "Problemy zdrowotne",
    items: [
      "jak pozbyć się kleszcza i nauka o kleszczach",
      "krew z nosa",
      "omdlenia",
      "co w przypadku hipotermii",
      "co w przypadku upałów, czyli jak sobie z nimi radzić i co w razie udaru",
    ],
  },
  {
    category: "Higiena i woda",
    items: ["jak filtrować wodę w lesie", "budowa filtra na wodę"],
  },
]

export default function SanitariuszPage() {
  const [selectedSection, setSelectedSection] = useState<number>(0)

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
            <div className="p-3 rounded-lg bg-pink-500/10 text-pink-500 border border-pink-500/20">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Sanitariusz</h1>
              <p className="text-neutral-400">Pierwsza pomoc, bezpieczeństwo i opieka zdrowotna</p>
            </div>
          </div>

          <Badge variant="secondary" className="text-neutral-300 border-neutral-700 bg-neutral-900">
            16 umiejętności do opanowania
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
          {/* Left Column - Selected Category Preview */}
          <div className="space-y-4">
            <Card
              className="bg-neutral-950 border-neutral-800 hover:bg-neutral-900 transition-colors duration-300"
            >
              <CardHeader className="px-7 py-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl text-white">{skills[selectedSection].category}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-neutral-800">
                    {skills[selectedSection].items.length} umiejętności
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pl-7 pr-7 flex-1">
                <div className="space-y-3 pl-0">
                  {skills[selectedSection].items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-3 text-neutral-300 py-1.5">
                      <div className="w-2 h-2 rounded-full bg-pink-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - All Categories */}
          <div
            className="flex flex-col gap-4 w-full h-full"
          >
            {skills.map((skillGroup, index) => (
              <Card
                key={index}
                className={`bg-neutral-950 border-neutral-800 hover:bg-neutral-900 transition-colors duration-300 ${
                  index === selectedSection ? "ring-2 ring-pink-500/50" : ""
                }`}
              >
                <CardHeader
                  className="cursor-pointer px-7 py-7 h-full flex items-center justify-center"
                  onClick={() => setSelectedSection(index)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-neutral-400" />
                      <CardTitle className="text-xl text-white">{skillGroup.category}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="hidden md:flex text-neutral-300 bg-neutral-900 border-neutral-800">
                      {skillGroup.items.length} umiejętności
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-neutral-950 border-neutral-800 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-neutral-400 mb-4">
                Sanitariusz to strażnik zdrowia i bezpieczeństwa zastępu, gotowy do udzielenia pomocy w każdej sytuacji
                i zapewnienia bezpiecznych warunków obozowania.
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
