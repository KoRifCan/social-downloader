import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'name, email, subject, and message are required' }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    })

    console.log(`[MOCK EMAIL] Notification sent to admin about new contact from ${email}`)

    return NextResponse.json({ data: { id: contact.id, message: 'Message received' } }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}
