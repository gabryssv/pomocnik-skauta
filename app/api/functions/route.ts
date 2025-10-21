import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET() {
    try {
        const { rows } = await db.query(
            `SELECT id, name, description, icon, color_background, color_text, color_border, skills
       FROM functions
       ORDER BY COALESCE(sort_order, 9999), name`
        )

        const functions = rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description ?? null,
            icon: row.icon ?? null,
            color_background: row.color_background ?? null,
            color_text: row.color_text ?? null,
            color_border: row.color_border ?? null,
            skills: row.skills ?? null,
        }))

        return NextResponse.json(functions)
    } catch (e: any) {
        if (e && e.code === '42P01') {
            return NextResponse.json([])
        }
        console.error('Database error:', e)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}