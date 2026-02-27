import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const interestSchema = z.object({
  toUserId: z.string(),
  message: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toUserId, message } = interestSchema.parse(body)

    // For demo purposes, we'll use a hardcoded fromUserId
    // In a real app, this would come from authentication
    const fromUserId = "demo-user-id"

    // Check if interest already exists
    const existingInterest = await db.interest.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId
        }
      }
    })

    if (existingInterest) {
      return NextResponse.json(
        { error: 'Interest already sent' },
        { status: 400 }
      )
    }

    // Check if users are blocked
    const block = await db.block.findFirst({
      where: {
        OR: [
          { userId: fromUserId, blockedId: toUserId },
          { userId: toUserId, blockedId: fromUserId }
        ]
      }
    })

    if (block) {
      return NextResponse.json(
        { error: 'Cannot send interest' },
        { status: 403 }
      )
    }

    // Create interest
    const interest = await db.interest.create({
      data: {
        fromUserId,
        toUserId,
        message,
        status: 'pending'
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        toUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Interest sent successfully',
      interest
    })

  } catch (error) {
    console.error('Interest error:', error)
    
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
    const status = searchParams.get('status') // 'pending', 'accepted', 'declined'

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    const where: any = {}
    
    if (type === 'sent') {
      where.fromUserId = userId
    } else if (type === 'received') {
      where.toUserId = userId
    } else {
      // Get all interests for this user
      where.OR = [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    }

    if (status) {
      where.status = status
    }

    const interests = await db.interest.findMany({
      where,
      include: {
        fromUser: {
          include: {
            profile: {
              include: {
                photos: {
                  where: { isApproved: true },
                  take: 1
                }
              }
            }
          }
        },
        toUser: {
          include: {
            profile: {
              include: {
                photos: {
                  where: { isApproved: true },
                  take: 1
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ interests })

  } catch (error) {
    console.error('Get interests error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { interestId, status } = body

    if (!['accepted', 'declined', 'withdrawn'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const interest = await db.interest.update({
      where: { id: interestId },
      data: {
        status,
        respondedAt: new Date()
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        toUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      message: `Interest ${status} successfully`,
      interest
    })

  } catch (error) {
    console.error('Update interest error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}