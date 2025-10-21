import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { rows } = await db.query(
            `SELECT id, name, description, icon, color_background, color_text, color_border, skills
       FROM functions WHERE id = $1 LIMIT 1`,
            [params.id]
        )

        if (!rows[0]) {
            return NextResponse.json({ error: 'Function not found' }, { status: 404 })
        }

        const func = {
            id: rows[0].id,
            name: rows[0].name,
            description: rows[0].description ?? null,
            icon: rows[0].icon ?? null,
            color_background: rows[0].color_background ?? null,
            color_text: rows[0].color_text ?? null,
            color_border: rows[0].color_border ?? null,
            skills: rows[0].skills ?? null,
        }

        return NextResponse.json(func)
    } catch (e: any) {
        if (e && e.code === '42P01') {
            return NextResponse.json({ error: 'Function not found' }, { status: 404 })
        }
        console.error('Database error:', e)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}