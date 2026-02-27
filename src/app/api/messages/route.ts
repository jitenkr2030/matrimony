import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const messageSchema = z.object({
  toUserId: z.string(),
  content: z.string().min(1),
  type: z.enum(['text', 'image', 'voice', 'video']).default('text'),
  mediaUrl: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toUserId, content, type, mediaUrl } = messageSchema.parse(body)

    // For demo purposes, we'll use a hardcoded fromUserId
    // In a real app, this would come from authentication
    const fromUserId = "demo-user-id"

    // Check if users can message each other
    // This would typically involve checking if they have accepted interests
    const hasAcceptedInterest = await db.interest.findFirst({
      where: {
        OR: [
          {
            fromUserId,
            toUserId,
            status: 'accepted'
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
            status: 'accepted'
          }
        ]
      }
    })

    if (!hasAcceptedInterest) {
      return NextResponse.json(
        { error: 'You can only message users with accepted interests' },
        { status: 403 }
      )
    }

    // Create message
    const message = await db.message.create({
      data: {
        fromUserId,
        toUserId,
        content,
        type,
        mediaUrl,
        isRead: false
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                firstName: true,
                photos: {
                  where: { isApproved: true, isPrimary: true },
                  take: 1
                }
              }
            }
          }
        },
        toUser: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Message sent successfully',
      data: message
    })

  } catch (error) {
    console.error('Message error:', error)
    
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
    const userId = searchParams.get('userId')
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '50'

    // For demo purposes, we'll use a hardcoded currentUserId
    // In a real app, this would come from authentication
    const currentUserId = "demo-user-id"

    if (!userId) {
      // Get conversation list
      const conversations = await db.message.findMany({
        where: {
          OR: [
            { fromUserId: currentUserId },
            { toUserId: currentUserId }
          ]
        },
        include: {
          fromUser: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  firstName: true,
                  photos: {
                    where: { isApproved: true, isPrimary: true },
                    take: 1
                  }
                }
              }
            }
          },
          toUser: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  firstName: true,
                  photos: {
                    where: { isApproved: true, isPrimary: true },
                    take: 1
                  }
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 20
      })

      // Group messages by conversation partner
      const conversationMap = new Map()
      
      conversations.forEach(message => {
        const otherUser = message.fromUserId === currentUserId ? message.toUser : message.fromUser
        const conversationId = otherUser.id
        
        if (!conversationMap.has(conversationId) || 
            message.createdAt > conversationMap.get(conversationId).createdAt) {
          conversationMap.set(conversationId, {
            ...message,
            otherUser,
            unreadCount: message.toUserId === currentUserId && !message.isRead ? 1 : 0
          })
        } else if (message.toUserId === currentUserId && !message.isRead) {
          const existing = conversationMap.get(conversationId)
          existing.unreadCount = (existing.unreadCount || 0) + 1
        }
      })

      const conversationList = Array.from(conversationMap.values())

      return NextResponse.json({
        conversations: conversationList
      })
    } else {
      // Get messages with specific user
      const skip = (parseInt(page) - 1) * parseInt(limit)

      const messages = await db.message.findMany({
        where: {
          OR: [
            {
              fromUserId: currentUserId,
              toUserId: userId
            },
            {
              fromUserId: userId,
              toUserId: currentUserId
            }
          ]
        },
        include: {
          fromUser: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  firstName: true,
                  photos: {
                    where: { isApproved: true, isPrimary: true },
                    take: 1
                  }
                }
              }
            }
          },
          toUser: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  firstName: true,
                  photos: {
                    where: { isApproved: true, isPrimary: true },
                    take: 1
                  }
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: parseInt(limit)
      })

      // Mark messages as read
      await db.message.updateMany({
        where: {
          fromUserId: userId,
          toUserId: currentUserId,
          isRead: false
        },
        data: {
          isRead: true
        }
      })

      return NextResponse.json({
        messages: messages.reverse(), // Show in chronological order
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit)
        }
      })
    }

  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}