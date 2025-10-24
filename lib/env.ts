/**
 * Walidacja i typy zmiennych środowiskowych
 * Zapewnia że wszystkie wymagane zmienne są ustawione przy starcie aplikacji
 */

export interface DatabaseConfig {
    host: string
    user: string
    password: string
    database: string
}

/**
 * Waliduje czy wszystkie wymagane zmienne środowiskowe są ustawione
 * @throws Error jeśli brakuje którejś zmiennej
 * @returns Obiekt z walidowanymi zmiennymi
 */
export function validateDatabaseEnv(): DatabaseConfig {
    const requiredEnvVars = [
        'DATABASE_HOST',
        'DATABASE_USER',
        'DATABASE_PASSWORD',
        'DATABASE_NAME'
    ] as const

    const missing = requiredEnvVars.filter(envVar => !process.env[envVar])

    if (missing.length > 0) {
        throw new Error(
            `❌ Missing required environment variables: ${missing.join(', ')}\n` +
            `Please check your .env file and ensure all database variables are set.`
        )
    }

    // Teraz TypeScript wie że te zmienne na pewno istnieją
    return {
        host: process.env.DATABASE_HOST!,
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_NAME!,
    }
}

/**
 * Sprawdza czy aplikacja działa w środowisku development
 */
export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
}

/**
 * Sprawdza czy aplikacja działa w środowisku production
 */
export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
}