import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const blockSchema = z.object({
  blockedId: z.string(),
  reason: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blockedId, reason } = blockSchema.parse(body)

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    // Check if already blocked
    const existingBlock = await db.block.findFirst({
      where: {
        userId,
        blockedId
      }
    })

    if (existingBlock) {
      return NextResponse.json(
        { error: 'User is already blocked' },
        { status: 400 }
      )
    }

    // Create block
    const block = await db.block.create({
      data: {
        userId,
        blockedId,
        reason
      }
    })

    // Remove any existing interests between users
    await db.interest.deleteMany({
      where: {
        OR: [
          { fromUserId: userId, toUserId: blockedId },
          { fromUserId: blockedId, toUserId: userId }
        ]
      }
    })

    return NextResponse.json({
      message: 'User blocked successfully',
      block
    })

  } catch (error) {
    console.error('Block error:', error)
    
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
    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    const blocks = await db.block.findMany({
      where: { userId },
      include: {
        // We would include blocked user info here
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ blocks })

  } catch (error) {
    console.error('Get blocks error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const blockedId = searchParams.get('blockedId')

    if (!blockedId) {
      return NextResponse.json(
        { error: 'blockedId is required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    const deletedBlock = await db.block.deleteMany({
      where: {
        userId,
        blockedId
      }
    })

    if (deletedBlock.count === 0) {
      return NextResponse.json(
        { error: 'Block not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'User unblocked successfully'
    })

  } catch (error) {
    console.error('Unblock error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}