"use client"

import Navbar from "@/components/navbar"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { ExternalLink } from "@/components/external-link"
import { Progress } from "@/components/ui/progress-loading"
import { useState, useEffect } from "react"
import { getAllFunctions, countSkills, type FunctionRecord } from "../lib/functions"
import { getIconComponent } from "../lib/icons"

export default function HomePage() {
  const [functions, setFunctions] = useState<FunctionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    async function loadFunctions() {
      try {
        // Simulate realistic loading progress
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) return prev
            return prev + Math.random() * 15
          })
        }, 100)

        const data = await getAllFunctions()

        // Complete loading
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
      <div className="min-h-screen bg-black flex items-center justify-center" suppressHydrationWarning={true}>
        <div className="max-w-md w-full px-4" suppressHydrationWarning={true}>
          <div className="text-center mb-6" suppressHydrationWarning={true}>
            <img src="/croix-agse.png" alt="Logo Skautów Europy" className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Pomocnik Skauta</h2>
            <p className="text-neutral-400">Ładowanie funkcji...</p>
          </div>
          <Progress
            value={loadingProgress}
            color="success"
            showValueLabel={true}
            size="md"
            className="max-w-md"
          />
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
        <div className="flex min-h-screen items-center justify-center text-center">
          <div className="w-full">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/croix-agse.png" alt="Logo Skautów Europy" className="h-12 w-12" />
              <h1 className="text-4xl font-bold text-white">
                Pomocnik Skauta
              </h1>
            </div>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
              Wybierz funkcję, aby poznać wymagania i umiejętności potrzebne do jej pełnienia w zastępie
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {functions.map((func) => {
                const IconComponent = getIconComponent(func.icon || undefined)
                const colorBackground = func.color_background || "bg-neutral-800"
                const colorText = func.color_text || "text-neutral-300"
                const colorBorder = func.color_border || "border-neutral-700"
                return (
                  <Link key={func.id} href={`/${func.id}`}>
                    <Button variant="outline" className={`${colorBackground} ${colorBorder} hover:bg-neutral-800 text-white rounded-full text-sm font-medium px-4 py-1.5 h-auto`}>
                      <IconComponent className={`h-5 w-5 mr-2 ${colorText}`} />
                      {func.name}
                    </Button>
                  </Link>
                )
              })}
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

        {/* Section 3: Footer */}
        <div className="text-center py-16">
          <p className="text-neutral-500 text-sm">Wykonanie: <ExternalLink href="https://gabryssv.tech">Gabriel Kossakowski</ExternalLink> - Zastępowy Zastępu WILK - <ExternalLink href="https://www.facebook.com/1grybowskafse">1. DG</ExternalLink></p>
        </div>

      </div>
    </div>
  )
}
