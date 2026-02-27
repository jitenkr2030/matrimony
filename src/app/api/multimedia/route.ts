import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const videoCallSchema = z.object({
  toUserId: z.string(),
  scheduledTime: z.string().optional(),
  isVirtual: z.boolean().default(true)
})

const virtualGiftSchema = z.object({
  toUserId: z.string(),
  giftId: z.string(),
  message: z.string().optional(),
  isPrivate: z.boolean().default(true)
})

const mediaUploadSchema = z.object({
  type: z.enum(['photo', 'video', 'voice', 'document']),
  fileUrl: z.string(),
  fileName: z.string(),
  fileSize: z.number(),
  mimeType: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    // For demo purposes, we'll use a hardcoded userId
    const userId = "demo-user-id"

    if (type === 'video-call') {
      const validatedData = videoCallSchema.parse(data)
      
      // In a real implementation, you would have a videoCalls table
      const videoCall = {
        id: Date.now().toString(),
        fromUserId: userId,
        toUserId: validatedData.toUserId,
        scheduledTime: validatedData.scheduledTime || new Date().toISOString(),
        isVirtual: validatedData.isVirtual,
        status: 'scheduled',
        meetingLink: `https://meet.jitsi.si/nepalimatrimony/${Date.now()}`,
        createdAt: new Date().toISOString()
      }

      return NextResponse.json({
        message: 'Video call scheduled successfully',
        videoCall
      })
    }

    if (type === 'virtual-gift') {
      const validatedData = virtualGiftSchema.parse(data)
      
      // In a real implementation, you would have a sentGifts table
      const virtualGift = {
        id: Date.now().toString(),
        fromUserId: userId,
        toUserId: validatedData.toUserId,
        giftId: validatedData.giftId,
        message: validatedData.message,
        isPrivate: validatedData.isPrivate,
        createdAt: new Date().toISOString()
      }

      // Simulate gift data
      const gifts = [
        { id: '1', name: 'Rose', icon: '🌹', price: 50, category: 'romantic' },
        { id: '2', name: 'Chocolate', icon: '🍫', price: 30, category: 'romantic' },
        { id: '3', name: 'Teddy Bear', icon: '🧸', price: 100, category: 'fun' },
        { id: '4', name: 'Cake', icon: '🎂', price: 80, category: 'fun' },
        { id: '5', name: 'Ring', icon: '💍', price: 500, category: 'traditional' },
        { id: '6', name: 'Prayer Beads', icon: '📿', price: 150, category: 'traditional' }
      ]

      const giftDetails = gifts.find(g => g.id === validatedData.giftId)

      return NextResponse.json({
        message: 'Virtual gift sent successfully',
        virtualGift: {
          ...virtualGift,
          giftDetails
        }
      })
    }

    if (type === 'media-upload') {
      const validatedData = mediaUploadSchema.parse(data)
      
      // In a real implementation, you would save to cloud storage
      const mediaFile = {
        id: Date.now().toString(),
        userId,
        ...validatedData,
        uploadedAt: new Date().toISOString(),
        isApproved: false // Requires admin approval
      }

      return NextResponse.json({
        message: 'Media uploaded successfully',
        mediaFile
      })
    }

    return NextResponse.json(
      { error: 'Invalid type' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Multimedia API error:', error)
    
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
    const type = searchParams.get('type')

    if (type === 'virtual-gifts') {
      // Simulate available virtual gifts
      const gifts = [
        { id: '1', name: 'Rose', icon: '🌹', price: 50, category: 'romantic', description: 'A beautiful red rose to express love' },
        { id: '2', name: 'Chocolate Box', icon: '🍫', price: 30, category: 'romantic', description: 'Delicious chocolates for your sweetie' },
        { id: '3', name: 'Teddy Bear', icon: '🧸', price: 100, category: 'fun', description: 'Cute teddy bear to show affection' },
        { id: '4', name: 'Birthday Cake', icon: '🎂', price: 80, category: 'fun', description: 'Celebrate with a virtual cake' },
        { id: '5', name: 'Wedding Ring', icon: '💍', price: 500, category: 'traditional', description: 'Traditional wedding ring symbol' },
        { id: '6', name: 'Prayer Beads', icon: '📿', price: 150, category: 'traditional', description: 'Traditional Nepali prayer beads' },
        { id: '7', name: 'Music Box', icon: '🎵', price: 60, category: 'fun', description: 'Musical gift with romantic tune' },
        { id: '8', name: 'Love Letter', icon: '💌', price: 20, category: 'romantic', description: 'Virtual love letter with your message' }
      ]

      return NextResponse.json({ gifts })
    }

    if (type === 'media-gallery') {
      // For demo purposes, we'll use a hardcoded userId
      const userId = "demo-user-id"

      // In a real implementation, you would fetch from photos and videos tables
      const mediaGallery = [
        {
          id: '1',
          type: 'photo',
          url: '/api/placeholder/300/400',
          thumbnail: '/api/placeholder/150/200',
          caption: 'My favorite photo',
          isApproved: true,
          uploadedAt: '2024-01-20'
        },
        {
          id: '2',
          type: 'video',
          url: '/api/placeholder/300/400',
          thumbnail: '/api/placeholder/150/200',
          caption: 'Introduction video',
          duration: 120,
          isApproved: true,
          uploadedAt: '2024-01-18'
        }
      ]

      return NextResponse.json({ mediaGallery })
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Get multimedia data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}