import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { rating, content, authorName } = await req.json()
    if (!rating || !content) {
      return NextResponse.json({ error: 'rating and content are required' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'rating must be between 1 and 5' }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.create({
      data: { rating, content, authorName, approved: false },
    })

    return NextResponse.json({ data: testimonial }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 })
  }
}

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ data: testimonials }, { status: 200 })
}
