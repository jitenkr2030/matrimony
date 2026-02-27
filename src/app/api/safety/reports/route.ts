import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const reportSchema = z.object({
  reportedUserId: z.string(),
  reason: z.enum(['fake_profile', 'inappropriate_content', 'harassment', 'scam', 'spam', 'other']),
  description: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reportedUserId, reason, description } = reportSchema.parse(body)

    // For demo purposes, we'll use a hardcoded reporterId
    // In a real app, this would come from authentication
    const reporterId = "demo-user-id"

    // Check if user already reported this profile
    const existingReport = await db.report.findFirst({
      where: {
        reporterId,
        reportedId: reportedUserId,
        status: 'pending'
      }
    })

    if (existingReport) {
      return NextResponse.json(
        { error: 'You have already reported this user' },
        { status: 400 }
      )
    }

    // Create report
    const report = await db.report.create({
      data: {
        reporterId,
        reportedId: reportedUserId,
        reason,
        description,
        status: 'pending'
      },
      include: {
        reporter: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Auto-flag user if multiple reports
    const reportCount = await db.report.count({
      where: {
        reportedId: reportedUserId,
        status: 'pending'
      }
    })

    if (reportCount >= 3) {
      await db.user.update({
        where: { id: reportedUserId },
        data: { isActive: false }
      })
    }

    return NextResponse.json({
      message: 'Report submitted successfully',
      report
    })

  } catch (error) {
    console.error('Report error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'sent' or 'received'

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    const where: any = {}
    
    if (type === 'sent') {
      where.reporterId = userId
    } else if (type === 'received') {
      where.reportedId = userId
    }

    const reports = await db.report.findMany({
      where,
      include: {
        reporter: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ reports })

  } catch (error) {
    console.error('Get reports error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}