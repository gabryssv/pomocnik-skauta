"use client"

import { signIn } from "next-auth/react"
import Navbar from "@/components/navbar"
import { useState } from "react"

export default function Login() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "zastep.wilk1dg") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Nieprawidłowe hasło")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black pb-12 select-none relative overflow-hidden">
        <Navbar />
        <div className="flex h-screen items-center justify-center text-center" data-aos="fade-in">
          <div className="container mx-auto px-4">
            <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
              <h1 className="text-4xl font-bold text-white mb-4" data-aos="fade-up">
                Wprowadź hasło
              </h1>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-neutral-800 text-white rounded-full px-4 py-2 mb-4 w-64 text-center"
                placeholder="Hasło"
                data-aos="fade-up" data-aos-delay="100"
              />
              <button 
                type="submit"
                className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 inline-block"
                data-aos="fade-up" data-aos-delay="200"
              >
                Zatwierdź
              </button>
              {error && <p className="text-red-500 mt-4" data-aos="fade-up" data-aos-delay="300">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pb-12 select-none relative overflow-hidden">
      <Navbar />
      <div className="flex h-screen items-center justify-center text-center" data-aos="fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white" data-aos="fade-up">
              Panel deweloperski
            </h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-4" data-aos="fade-up" data-aos-delay="100">
            Zaloguj się do panelu używając swojego konta Google.
          </p>
          <button 
            onClick={() => signIn('google', { callbackUrl: '/dev/panel' })} 
            className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 inline-block" 
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            Zaloguj się z Google
          </button>
        </div>
      </div>
    </div>
  )
}
