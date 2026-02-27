import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const profileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  bloodGroup: z.string().optional(),
  complexion: z.string().optional(),
  physicalStatus: z.string().optional(),
  maritalStatus: z.string().optional(),
  children: z.number().optional(),
  childrenLiving: z.number().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  willingToRelocate: z.boolean().optional(),
  preferredCountries: z.string().optional(),
  religion: z.string().optional(),
  caste: z.string().optional(),
  subCaste: z.string().optional(),
  motherTongue: z.string().optional(),
  canSpeakLanguages: z.string().optional(),
  vegetarian: z.boolean().optional(),
  drinking: z.string().optional(),
  smoking: z.string().optional(),
  education: z.string().optional(),
  educationField: z.string().optional(),
  occupation: z.string().optional(),
  occupationType: z.string().optional(),
  company: z.string().optional(),
  income: z.string().optional(),
  workLocation: z.string().optional(),
  familyType: z.string().optional(),
  familyValues: z.string().optional(),
  familyStatus: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherOccupation: z.string().optional(),
  brothers: z.number().optional(),
  sisters: z.number().optional(),
  marriedBrothers: z.number().optional(),
  marriedSisters: z.number().optional(),
  preferredAgeMin: z.number().optional(),
  preferredAgeMax: z.number().optional(),
  preferredHeightMin: z.number().optional(),
  preferredHeightMax: z.number().optional(),
  preferredReligion: z.string().optional(),
  preferredCaste: z.string().optional(),
  preferredEducation: z.string().optional(),
  preferredOccupation: z.string().optional(),
  preferredIncome: z.string().optional(),
  preferredLocation: z.string().optional(),
  maritalStatusPref: z.string().optional(),
  aboutMe: z.string().optional(),
  hobbies: z.string().optional(),
  interests: z.string().optional(),
  lifestyle: z.string().optional(),
  diet: z.string().optional(),
  exercise: z.string().optional(),
  showPhone: z.boolean().optional(),
  showEmail: z.boolean().optional(),
  showIncome: z.boolean().optional(),
  photoPrivacy: z.string().optional(),
  contactPrivacy: z.string().optional()
})

// GET profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('id')

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    let profile

    if (profileId) {
      // Get specific profile (for viewing other profiles)
      profile = await db.profile.findUnique({
        where: { id: profileId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              isVerified: true,
              createdAt: true
            }
          },
          photos: {
            where: { isApproved: true },
            orderBy: { order: 'asc' }
          },
          videos: {
            where: { isApproved: true },
            orderBy: { createdAt: 'desc' }
          },
          verificationDocs: {
            select: {
              type: true,
              status: true
            }
          },
          _count: {
            select: {
              photos: true,
              profileViews: true
            }
          }
        }
      })

      if (!profile) {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        )
      }

      // Record profile view
      if (profile.userId !== userId) {
        await db.profileView.create({
          data: {
            profileId: profile.id,
            viewerId: userId
          }
        })
      }

    } else {
      // Get current user's profile
      profile = await db.profile.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              isVerified: true,
              verificationType: true,
              createdAt: true
            }
          },
          photos: {
            orderBy: { order: 'asc' }
          },
          videos: {
            orderBy: { createdAt: 'desc' }
          },
          verificationDocs: true,
          _count: {
            select: {
              photos: true,
              profileViews: true
            }
          }
        }
      })
    }

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile })

  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT update profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = profileUpdateSchema.parse(body)

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    // Calculate age if dateOfBirth is provided
    let age
    if (validatedData.dateOfBirth) {
      const birthDate = new Date(validatedData.dateOfBirth)
      const today = new Date()
      age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
    }

    // Calculate profile strength
    const profile = await db.profile.findUnique({
      where: { userId }
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    let strength = profile.profileStrength
    const updatedFields = Object.keys(validatedData).filter(key => validatedData[key as keyof typeof validatedData] !== undefined)
    strength += updatedFields.length * 2 // Add 2 points for each updated field
    strength = Math.min(strength, 100) // Cap at 100

    const updatedProfile = await db.profile.update({
      where: { userId },
      data: {
        ...validatedData,
        ...(age && { age }),
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : undefined,
        profileStrength: strength
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isVerified: true
          }
        },
        photos: {
          orderBy: { order: 'asc' }
        }
      }
    })

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    })

  } catch (error) {
    console.error('Update profile error:', error)
    
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