import { Pool } from "pg"
import { validateDatabaseEnv, type DatabaseConfig } from "./env"

// Lazy initialization - walidacja tylko gdy rzeczywiście potrzebujemy połączenia
let globalPool: Pool | undefined = (global as any).pgPool
let dbConfig: DatabaseConfig | undefined

function getDbConfig(): DatabaseConfig {
    if (!dbConfig) {
        dbConfig = validateDatabaseEnv()
    }
    return dbConfig
}

function getPool(): Pool {
    if (!globalPool) {
        const config = getDbConfig()
        globalPool = new Pool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            ssl: { rejectUnauthorized: false },
            // Optional: tune as needed
            max: 5,
            idleTimeoutMillis: 30_000,
            connectionTimeoutMillis: 10_000,
        })
        ;(global as any).pgPool = globalPool
    }
    return globalPool
}

export const db = {
    query: (text: string, params?: any[]) => getPool().query(text, params),
    pool: () => getPool(),
}

export type DbClient = Pool