import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  phone: z.string().optional(),
  gender: z.enum(['male', 'female', 'other'])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, gender } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        isActive: true,
        isVerified: false
      }
    })

    // Create basic profile
    const profile = await db.profile.create({
      data: {
        userId: user.id,
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ')[1] || '',
        gender,
        dateOfBirth: new Date(), // Will be updated later
        age: 0, // Will be calculated later
        country: 'India', // Default
        state: '',
        city: '',
        religion: '',
        motherTongue: '',
        maritalStatus: 'never_married',
        incomeCurrency: 'INR',
        photoPrivacy: 'public',
        contactPrivacy: 'premium',
        profileStrength: 10 // Basic profile created
      }
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      profile
    })

  } catch (error) {
    console.error('Registration error:', error)
    
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