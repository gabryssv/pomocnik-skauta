import { Pool } from "pg"

// Ensure a single pool across hot reloads in Next.js dev
let globalPool: Pool | undefined = (global as any).pgPool

if (!globalPool) {
    globalPool = new Pool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
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