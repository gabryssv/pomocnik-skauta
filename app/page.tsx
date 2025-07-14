import Navbar from "@/components/navbar"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Hammer, Radio, Compass, Theater, ChefHat, Heart, ArrowRight   } from "lucide-react" 
import { ExternalLink } from "@/components/external-link"
import { LatinCross } from "@/components/icons/latin-cross"

const functions = [
  {
    id: "pionier",
    name: "Pionier",
    description: "Umiejętności budowlane, węzły, ogniska i praca z narzędziami",
    icon: Hammer,
    colorBackground: "bg-orange-500/10",
    colorText: "text-orange-500",
    colorBorder: "border-orange-500/20",
    skillCount: 17,
  },
  {
    id: "sygnalista",
    name: "Sygnalista",
    description: "Komunikacja, szyfry, sygnalizacja i przekazywanie informacji",
    icon: Radio,
    colorBackground: "bg-blue-500/10",
    colorText: "text-blue-500",
    colorBorder: "border-blue-500/20",
    skillCount: 11,
  },
  {
    id: "topograf",
    name: "Topograf",
    description: "Orientacja w terenie, mapy, kompas i nawigacja",
    icon: Compass,
    colorBackground: "bg-green-500/10",
    colorText: "text-green-500",
    colorBorder: "border-green-500/20",
    skillCount: 11,
  },
  {
    id: "wodzirej",
    name: "Wodzirej",
    description: "Techniki ekspresyjne, prowadzenie ognisk i animacja",
    icon: Theater,
    colorBackground: "bg-purple-500/10",
    colorText: "text-purple-500",
    colorBorder: "border-purple-500/20",
    skillCount: 8,
  },
  {
    id: "kucharz",
    name: "Kucharz",
    description: "Gotowanie, dietetyka, kuchnia polowa i higiena żywności",
    icon: ChefHat,
    colorBackground: "bg-red-500/10",
    colorText: "text-red-500",
    colorBorder: "border-red-500/20",
    skillCount: 12,
  },
  {
    id: "sanitariusz",
    name: "Sanitariusz",
    description: "Pierwsza pomoc, bezpieczeństwo i opieka zdrowotna",
    icon: Heart,
    colorBackground: "bg-pink-500/10",
    colorText: "text-pink-500",
    colorBorder: "border-pink-500/20",
    skillCount: 16,
  },
  {
    id: "liturgista",
    name: "Liturgista",
    description: "Służba liturgiczna, symbole religijne i duchowość",
    icon: LatinCross,
    colorBackground: "bg-yellow-500/10",
    colorText: "text-yellow-500",
    colorBorder: "border-yellow-500/20",
    skillCount: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black select-none flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col gap-[48px]">
      <div className="flex h-screen items-center justify-center text-center">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img draggable="false" src="/croix-agse.png" alt="Logo Skautów Europy" className="h-12 w-12 hidden md:block" />
            <h1 className="text-4xl font-bold text-white">
              Pomocnik Skauta
            </h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
            Wybierz funkcję, aby poznać wymagania i umiejętności potrzebne do jej pełnienia w zastępie
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="200">
            {functions.map((func) => {
              const IconComponent = func.icon
              return (
                <Link draggable="false" key={func.id} href={`/${func.id}`}>
                  <Button variant="outline" className={`${func.colorBackground} ${func.colorBorder} hover:bg-neutral-800 text-white rounded-full text-sm font-medium px-4 py-1.5 h-auto`}>
                    <IconComponent className={`h-5 w-5 mr-2 ${func.colorText}`} />
                    {func.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Second section (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch px-4 lg:max-w-6xl lg:mx-auto">
        {functions.map((func, index) => {
          const IconComponent = func.icon
          return (
            <Link draggable="false" key={func.id} href={`/${func.id}`} className="h-full" data-aos="fade-up" data-aos-delay={index * 100}>
              <Card className="bg-neutral-950 border-neutral-800 hover:bg-neutral-900 transition-all duration-300 hover:scale-[1.02] cursor-pointer group h-full flex flex-col">
                <CardHeader className="pb-4 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-2xl ${func.colorBackground}`}>
                      <IconComponent className={`h-6 w-6 ${func.colorText}`} />
                    </div>
                    <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-neutral-800">
                      {func.skillCount} umiejętności
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{func.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <CardDescription className="text-neutral-400 flex-grow">{func.description}</CardDescription>
                  <Button className="rounded-2xl text-sm font-medium px-4 py-1.5 h-auto mt-4 w-full bg-neutral-800 text-white hover:bg-neutral-700">
                    Wybierz <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
      
      <footer className="text-center text-neutral-500 text-sm pb-12 px-4">
      Wykonanie: <ExternalLink draggable="false" href="https://gabryssv.tech">Gabriel Kossakowski</ExternalLink> - Zastępowy Zastępu WILK - <ExternalLink draggable="false" href="https://www.facebook.com/1grybowskafse">1. DG</ExternalLink>
      </footer>
      </main>

      </div>
  )
}