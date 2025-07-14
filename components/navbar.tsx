"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const navLinks = [
    { href: "/", label: "Strona główna" },
    { href: "/wkrotce", label: "Dla zastępowych" },
    { href: "/wkrotce", label: "Funkcje" },
    { href: "/dev/panel", label: "Panel" },
  ]

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 py-0 px-4 lg:max-w-6xl lg:mx-auto">
        <nav className="flex items-center justify-between px-4 py-3 text-white bg-black/50 backdrop-blur-lg rounded-full border border-white/10 shadow-lg max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            <Link draggable="false" href="/" className="flex items-center gap-2 ml-1.5" onClick={() => setIsMenuOpen(false)}>
              <img draggable="false" src="/croix-agse.png" alt="Logo Skautów Europy" className="h-7 w-7" />
              <span className="text-lg font-medium">Pomocnik Skauta</span>
            </Link>
          </div>

          {/* Center Links for Desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-5 text-sm">
            {navLinks.map((link) => (
              <Link draggable="false" key={link.label} href={link.href} className="text-neutral-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions for Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {status === "authenticated" ? (
              <>
                <Avatar className="w-[34px] h-[34px]">
                  <AvatarImage draggable="false" src={session.user?.image || undefined} />
                  <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <Button onClick={() => signOut({ callbackUrl: '/dev/login' })} variant="outline" className="rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                  Wyloguj się
                </Button>
              </>
            ) : (
              <>
                <Link draggable="false" href="/dev/login" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5">Zarejestruj się</Link>
                <Button asChild variant="default" className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                  <Link draggable="false" href="/dev/login">Zaloguj się</Link>
                </Button>
              </>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 rounded-full w-[34px] h-[34px]"
              aria-label="Otwórz menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 left-0 w-full h-screen bg-black z-40 flex flex-col items-center justify-center md:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className={`flex flex-col items-center gap-5 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {navLinks.map((link) => (
              <Link
                draggable="false"
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-1/2 h-[1px] bg-white/10 my-3"></div>
            <div className="flex flex-col items-center gap-5">
              {status === "authenticated" ? (
                <>
                  <Avatar className="w-[34px] h-[34px]">
                    <AvatarImage draggable="false" src={session.user?.image || undefined} />
                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <Button onClick={() => { signOut({ callbackUrl: '/dev/login' }); setIsMenuOpen(false); }} variant="outline" className="rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                    Wyloguj się
                  </Button>
                </>
              ) : (
                <>
                  <Link draggable="false" href="/dev/login" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5" onClick={() => setIsMenuOpen(false)}>
                    Zarejestruj się
                  </Link>
                  <Button asChild variant="default" className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                    <Link draggable="false" href="/dev/login" onClick={() => setIsMenuOpen(false)}>Zaloguj się</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
    </>
  )
}
