import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const searchSchema = z.object({
  ageMin: z.string().optional(),
  ageMax: z.string().optional(),
  religion: z.string().optional(),
  caste: z.string().optional(),
  location: z.string().optional(),
  education: z.string().optional(),
  occupation: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional()
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries())
    
    const {
      ageMin,
      ageMax,
      religion,
      caste,
      location,
      education,
      occupation,
      page = '1',
      limit = '20'
    } = searchSchema.parse(params)

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Build where clause
    const where: any = {
      user: {
        isActive: true
      }
    }

    if (ageMin || ageMax) {
      where.age = {}
      if (ageMin) where.age.gte = parseInt(ageMin)
      if (ageMax) where.age.lte = parseInt(ageMax)
    }

    if (religion) where.religion = religion
    if (caste) where.caste = { contains: caste, mode: 'insensitive' }
    if (education) where.education = { contains: education, mode: 'insensitive' }
    if (occupation) where.occupation = { contains: occupation, mode: 'insensitive' }

    if (location) {
      where.OR = [
        { city: { contains: location, mode: 'insensitive' } },
        { state: { contains: location, mode: 'insensitive' } },
        { country: { contains: location, mode: 'insensitive' } }
      ]
    }

    // Get profiles with photos and user info
    const profiles = await db.profile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            isVerified: true,
            createdAt: true
          }
        },
        photos: {
          where: { isApproved: true },
          orderBy: { order: 'asc' },
          take: 3
        },
        _count: {
          select: {
            photos: true,
            profileViews: true
          }
        }
      },
      orderBy: [
        { profileStrength: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take
    })

    // Get total count for pagination
    const total = await db.profile.count({ where })

    // Calculate compatibility scores (simplified version)
    const profilesWithCompatibility = profiles.map(profile => ({
      ...profile,
      compatibility: Math.floor(Math.random() * 30) + 70 // Random compatibility between 70-100
    }))

    return NextResponse.json({
      profiles: profilesWithCompatibility,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    })

  } catch (error) {
    console.error('Search error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}