import { MetadataRoute } from 'next'
import { getAllFunctions } from '../lib/functions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const functions = await getAllFunctions()
    const currentDate = new Date().toISOString()

    // Strona główna
    const routes = [
        {
            url: 'https://pomocnik-skauta.pl',
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        }
    ]

    // Dodaj wszystkie strony funkcji
    const functionRoutes = functions.map((func) => ({
        url: `https://pomocnik-skauta.pl/${func.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...routes, ...functionRoutes]
}