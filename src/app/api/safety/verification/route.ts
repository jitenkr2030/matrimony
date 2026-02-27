import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const verificationSchema = z.object({
  profileId: z.string(),
  type: z.enum(['aadhaar', 'pan', 'passport', 'photo_id', 'address_proof']),
  docUrl: z.string(),
  docNumber: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profileId, type, docUrl, docNumber } = verificationSchema.parse(body)

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    // Verify profile belongs to user
    const profile = await db.profile.findFirst({
      where: {
        id: profileId,
        userId
      }
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Create verification document
    const verificationDoc = await db.verificationDoc.create({
      data: {
        profileId,
        type,
        docUrl,
        status: 'pending'
      }
    })

    // Simulate AI fraud detection
    const fraudScore = Math.random() * 100
    let adminNotes = ''

    if (fraudScore > 80) {
      adminNotes = 'High fraud risk detected. Manual review required.'
      await db.verificationDoc.update({
        where: { id: verificationDoc.id },
        data: {
          status: 'rejected',
          adminNotes
        }
      })
    } else if (fraudScore > 50) {
      adminNotes = 'Medium risk. Additional verification may be required.'
      await db.verificationDoc.update({
        where: { id: verificationDoc.id },
        data: {
          status: 'pending',
          adminNotes
        }
      })
    } else {
      // Auto-approve for low risk
      await db.verificationDoc.update({
        where: { id: verificationDoc.id },
        data: {
          status: 'approved'
        }
      })

      // Update user verification status
      await db.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
          verificationType: type
        }
      })
    }

    return NextResponse.json({
      message: 'Verification document submitted successfully',
      verificationDoc: {
        ...verificationDoc,
        fraudScore: Math.round(fraudScore),
        adminNotes
      }
    })

  } catch (error) {
    console.error('Verification error:', error)
    
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
    const profileId = searchParams.get('profileId')

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    // Verify profile belongs to user
    const profile = await db.profile.findFirst({
      where: {
        id: profileId,
        userId
      }
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    const verificationDocs = await db.verificationDoc.findMany({
      where: { profileId },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ verificationDocs })

  } catch (error) {
    console.error('Get verification docs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}