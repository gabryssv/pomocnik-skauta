import { db } from "./db"

export type SkillCategory = {
    category: string
    items: string[]
}

export type FunctionRecord = {
    id: string
    name: string
    description: string | null
    icon: string | null
    color_background: string | null
    color_text: string | null
    color_border: string | null
    skills: SkillCategory[] | null
}

export function countSkills(skills: SkillCategory[] | null | undefined): number {
    if (!skills) return 0
    return skills.reduce((sum, cat) => sum + (Array.isArray(cat.items) ? cat.items.length : 0), 0)
}

function normalizeRow(row: any): FunctionRecord {
    let skills: SkillCategory[] | null = null
    try {
        const raw = row.skills
        if (raw == null) skills = null
        else if (typeof raw === "string") skills = JSON.parse(raw)
        else skills = raw
    } catch {
        skills = null
    }
    return {
        id: row.id,
        name: row.name,
        description: row.description ?? null,
        icon: row.icon ?? null,
        color_background: row.color_background ?? null,
        color_text: row.color_text ?? null,
        color_border: row.color_border ?? null,
        skills,
    }
}

export async function getAllFunctions(): Promise<FunctionRecord[]> {
    try {
        const { rows } = await db.query(
            `SELECT id, name, description, icon, color_background, color_text, color_border, skills
             FROM functions
             ORDER BY COALESCE(sort_order, 9999), name`
        )
        return rows.map(normalizeRow)
    } catch (e: any) {
        if (e && e.code === '42P01') {
            // relation "functions" does not exist – return empty until DB is initialized
            return []
        }
        throw e
    }
}

export async function getFunctionById(id: string): Promise<FunctionRecord | null> {
    try {
        const { rows } = await db.query(
            `SELECT id, name, description, icon, color_background, color_text, color_border, skills
             FROM functions WHERE id = $1 LIMIT 1`,
            [id]
        )
        if (!rows[0]) return null
        return normalizeRow(rows[0])
    } catch (e: any) {
        if (e && e.code === '42P01') {
            return null
        }
        throw e
    }
}