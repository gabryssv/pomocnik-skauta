"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleFunctionsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMenuOpen(false)

    if (pathname === '/') {
      // If on homepage, scroll to functions section with offset for navbar
      const functionsSection = document.getElementById('functions-section')
      if (functionsSection) {
        const navbarHeight = 90 // Account for navbar height + padding
        const elementPosition = functionsSection.offsetTop - navbarHeight
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // If on other page, navigate to homepage with hash
      router.push('/#functions-section')
    }
  }



  const navLinks = [
    { href: "/", label: "Strona główna" },
    { href: "#", label: "Funkcje", onClick: handleFunctionsClick },
    { href: "/wkrotce", label: "Dla zastępowych" },
    { href: "/wkrotce", label: "Panel" },
  ]

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between p-3 text-white bg-black/30 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Image src="/croix-agse.png" alt="Logo Skautów Europy" width={28} height={28} className="h-7 w-7" />
              <span className="text-lg font-medium hidden sm:inline-block">Pomocnik Skauta</span>
            </Link>
          </div>

          {/* Center Links for Desktop */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-5 text-sm">
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </button>
              ) : (
                <Link key={link.label} href={link.href} className="text-neutral-400 hover:text-white transition-colors whitespace-nowrap">
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Actions for Desktop */}
          <div className="hidden xl:flex items-center gap-4">
            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5 whitespace-nowrap">Zarejestruj się</Link>
            <Button variant="default" className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto whitespace-nowrap">
              Zaloguj się
            </Button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="xl:hidden flex items-center size-[1.75rem]">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 rounded-full"
              aria-label="Otwórz menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg z-40 flex flex-col items-center justify-center xl:hidden">
          <nav className="flex flex-col items-center gap-5">
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="w-1/2 h-[1px] bg-white/10 my-3"></div>
            <div className="flex flex-col items-center gap-5">
              <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5 whitespace-nowrap" onClick={() => setIsMenuOpen(false)}>
                Zarejestruj się
              </Link>
              <Button
                variant="default"
                className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                Zaloguj się
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}