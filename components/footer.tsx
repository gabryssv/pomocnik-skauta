"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getAllFunctions, type FunctionRecord } from "@/lib/functions"
import { ExternalLink } from "@/components/external-link"

export default function Footer() {
    const [functions, setFunctions] = useState<FunctionRecord[]>([])

    useEffect(() => {
        async function loadFunctions() {
            try {
                const data = await getAllFunctions()
                setFunctions(data)
            } catch (error) {
                console.error('Error loading functions in footer:', error)
            }
        }
        loadFunctions()
    }, [])

    return (
        <footer className="bg-black border-t border-neutral-800 py-12 mt-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
                    {/* Logo i opis */}
                    <div className="md:col-span-2 mb-8 md:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/croix-agse.png" alt="Logo Skautów Europy" width={32} height={32} className="h-8 w-8" />
                            <span className="text-lg font-semibold text-white">Pomocnik Skauta</span>
                        </div>
                        <p className="text-neutral-400 text-sm max-w-md">
                            Kompletny przewodnik po umiejętnościach harcerskich. Poznaj wymagania każdej funkcji i rozwijaj się systematycznie.
                        </p>
                        <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2">
                            <div className="text-xs text-neutral-500">
                                © 2025 Pomocnik Skauta. Wszystkie prawa zastrzeżone.
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                <span>Autor:</span>
                                <a
                                    href="https://gabryssv.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-white transition-colors underline decoration-transparent hover:decoration-current"
                                >
                                    Gabriel Kossakowski
                                </a>
                                <span className="text-neutral-600">|</span>
                                <a
                                    href="https://www.facebook.com/1grybowskafse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-white transition-colors underline decoration-transparent hover:decoration-current"
                                >
                                    1. DG
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Funkcje */}
                    <div>
                        <h3 className="text-white font-medium mb-4">Funkcje</h3>
                        <div className="space-y-2">
                            {functions.map((func) => (
                                <Link
                                    key={func.id}
                                    href={`/${func.id}`}
                                    className="block text-sm text-neutral-400 hover:text-white transition-colors"
                                >
                                    {func.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Informacje */}
                    <div>
                        <h3 className="text-white font-medium mb-4">Informacje</h3>
                        <div className="space-y-2">
                            <Link href="/" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Strona główna
                            </Link>
                            <Link href="/wkrotce" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Dla zastępowych
                            </Link>
                            <Link href="/wkrotce" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Panel
                            </Link>
                            <a href="https://gabryssv.tech" target="_blank" rel="noopener noreferrer" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Kontakt
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}