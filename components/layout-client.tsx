"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface LayoutClientProps {
    children: React.ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        // Reset loading state on route change
        setIsLoaded(false)

        // Listen for page load completion
        const handleLoad = () => {
            // Additional delay to ensure smooth transition
            setTimeout(() => {
                setIsLoaded(true)
            }, 200)
        }

        // Check if document is already loaded
        if (document.readyState === 'complete') {
            handleLoad()
        } else {
            window.addEventListener('load', handleLoad)
        }

        // Fallback timeout to show navbar/footer even if load event doesn't fire
        const fallbackTimer = setTimeout(() => {
            setIsLoaded(true)
        }, 2000)

        return () => {
            window.removeEventListener('load', handleLoad)
            clearTimeout(fallbackTimer)
        }
    }, [pathname])

    return (
        <>
            {isLoaded && <Navbar />}
            <main className="flex-1">
                {children}
            </main>
            {isLoaded && <Footer />}
        </>
    )
}