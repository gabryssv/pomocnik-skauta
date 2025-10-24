"use client"

import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { ExternalLink } from "@/components/external-link"
import { Progress } from "@/components/ui/progress-loading"
import { useState, useEffect } from "react"
import { getAllFunctions, countSkills, type FunctionRecord } from "../lib/functions"
import { getIconComponent } from "../lib/icons"
import Footer from "@/components/footer"

export default function HomePage() {
  const [functions, setFunctions] = useState<FunctionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    async function loadFunctions() {
      try {
        // Symulacja realistycznego ładowania z progress barem
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) return prev
            return prev + Math.random() * 15
          })
        }, 100)

        const data = await getAllFunctions()

        // Zakończ ładowanie
        setLoadingProgress(100)
        setTimeout(() => {
          setFunctions(data)
          setLoading(false)
          clearInterval(progressInterval)
        }, 300)

      } catch (error) {
        console.error('Error loading functions:', error)
        setLoading(false)
      }
    }
    loadFunctions()
  }, [])

  // Handle scrolling to hash on page load
  useEffect(() => {
    if (!loading && window.location.hash === '#functions-section') {
      setTimeout(() => {
        const functionsSection = document.getElementById('functions-section')
        if (functionsSection) {
          const navbarHeight = 90 // Account for navbar height + padding
          const elementPosition = functionsSection.offsetTop - navbarHeight
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-neutral-950 rounded-3xl p-8 text-center">
            <Image src="/croix-agse.png" alt="Logo Skautów Europy" width={64} height={64} className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Pomocnik Skauta</h2>
            <p className="text-neutral-400 mb-6">Ładowanie funkcji...</p>
            <div className="w-full max-w-sm mx-auto">
              <Progress
                value={loadingProgress}
                size="md"
                color="success"
                showValueLabel={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black select-none" suppressHydrationWarning={true}>
      <Navbar />

      {/* Main container with consistent width */}
      <div className="max-w-6xl mx-auto px-4">

        {/* Section 1: Welcome/Hero section */}
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <Image src="/croix-agse.png" alt="Logo Skautów Europy" width={32} height={32} className="h-8 w-8" />
                <h1 className="text-2xl text-neutral-400">
                  Pomocnik Skauta
                </h1>
              </div>
              <h2 className="text-6xl font-bold text-white mb-4">
                Zostań mistrzem<br />
                w każdej funkcji.
              </h2>
              <p className="text-xl text-neutral-400 max-w-2xl lg:max-w-none mb-8">
                Wybierz funkcję, aby poznać wymagania i umiejętności potrzebne do jej pełnienia w zastępie
              </p>
            </div>

            {/* Right Column - Function Buttons */}
            <div className="hidden md:flex justify-center lg:justify-end">
              <div className="flex flex-wrap justify-center gap-6 max-w-sm">
                {functions.map((func) => {
                  const IconComponent = getIconComponent(func.icon || undefined)
                  const colorBackground = func.color_background || "bg-neutral-800"
                  const colorText = func.color_text || "text-neutral-300"
                  return (
                    <Link key={func.id} href={`/${func.id}`}>
                      <div className="relative group">
                        <div
                          className={`p-4 rounded-full ${colorBackground} hover:opacity-80 transition-opacity cursor-pointer`}
                          aria-label={func.name}
                        >
                          <IconComponent className={`h-8 w-8 ${colorText}`} />
                        </div>
                        {/* Custom Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-lg border border-white/10 rounded-full text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          {func.name}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Function cards */}
        <div id="functions-section" className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {functions.map((func) => {
              const IconComponent = getIconComponent(func.icon || undefined)
              const colorBackground = func.color_background || "bg-neutral-800"
              const colorText = func.color_text || "text-neutral-300"
              const skillCount = countSkills(func.skills)
              return (
                <Link key={func.id} href={`/${func.id}`} className="h-full">
                  <Card className="bg-neutral-950 border-neutral-800 hover:bg-neutral-900 transition-all duration-300 hover:scale-[1.02] cursor-pointer group h-full flex flex-col" style={{ borderRadius: '29.095px' }}>
                    <CardHeader className="pb-4 flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-3 rounded-full ${colorBackground}`}>
                          <IconComponent className={`h-6 w-6 ${colorText}`} />
                        </div>
                        <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-neutral-800">
                          {skillCount} umiejętności
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
        </div>

      </div>

      <Footer />
    </div>
  )
}
