import { Pool } from "pg"
import { validateDatabaseEnv, type DatabaseConfig } from "./env"

// Waliduj zmienne środowiskowe przy pierwszym imporcie
const dbConfig: DatabaseConfig = validateDatabaseEnv()

// Ensure a single pool across hot reloads in Next.js dev
let globalPool: Pool | undefined = (global as any).pgPool

if (!globalPool) {
    globalPool = new Pool({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        ssl: { rejectUnauthorized: false },
        // Optional: tune as needed
        max: 5,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 10_000,
    })
        ; (global as any).pgPool = globalPool
}

export const db = {
    query: (text: string, params?: any[]) => globalPool!.query(text, params),
    pool: globalPool!,
}

export type DbClient = Pool