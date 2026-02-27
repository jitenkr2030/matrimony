import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const vendorSchema = z.object({
  name: z.string(),
  category: z.enum(['photography', 'catering', 'decoration', 'venue', 'makeup', 'music', 'transport', 'other']),
  location: z.string(),
  price: z.string(),
  description: z.string(),
  contactPhone: z.string(),
  contactEmail: z.string(),
  website: z.string().optional(),
  services: z.string().optional()
})

const eventSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  type: z.enum(['matrimonial', 'cultural', 'meetup', 'workshop']),
  maxAttendees: z.number().optional(),
  isVirtual: z.boolean().default(false),
  meetingLink: z.string().optional()
)

// Vendors API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    if (type === 'vendor') {
      const validatedData = vendorSchema.parse(data)
      
      // For demo purposes, we'll use a hardcoded userId
      // In a real app, this would come from authentication
      const userId = "demo-user-id"

      // In a real implementation, you would have a vendors table
      // For now, we'll simulate vendor creation
      const vendor = {
        id: Date.now().toString(),
        userId,
        ...validatedData,
        rating: 0,
        reviews: 0,
        verified: false,
        createdAt: new Date().toISOString()
      }

      return NextResponse.json({
        message: 'Vendor listed successfully',
        vendor
      })
    }

    if (type === 'event') {
      const validatedData = eventSchema.parse(data)
      
      // For demo purposes, we'll use a hardcoded userId
      const userId = "demo-user-id"

      const event = await db.event.create({
        data: {
          userId,
          ...validatedData,
          startDate: new Date(validatedData.startDate),
          endDate: new Date(validatedData.endDate)
        }
      })

      return NextResponse.json({
        message: 'Event created successfully',
        event
      })
    }

    return NextResponse.json(
      { error: 'Invalid type' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Wedding API error:', error)
    
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
    const type = searchParams.get('type') // 'vendors' or 'events'
    const category = searchParams.get('category')
    const location = searchParams.get('location')

    if (type === 'vendors') {
      // Simulate vendor data
      const vendors = [
        {
          id: '1',
          name: 'Royal Photography',
          category: 'photography',
          location: 'Mumbai',
          price: '₹50,000 - ₹2,00,000',
          description: 'Professional wedding photography and cinematography',
          rating: 4.8,
          reviews: 124,
          verified: true,
          contactPhone: '+91 9876543210',
          contactEmail: 'info@royalphotography.com',
          website: 'https://royalphotography.com'
        },
        {
          id: '2',
          name: 'Grand Caterers',
          category: 'catering',
          location: 'Delhi',
          price: '₹800 - ₹2000 per plate',
          description: 'Authentic Indian and international cuisine',
          rating: 4.6,
          reviews: 89,
          verified: true,
          contactPhone: '+91 9876543211',
          contactEmail: 'info@grandcaterers.com'
        },
        {
          id: '3',
          name: 'Blossom Decorators',
          category: 'decoration',
          location: 'Bangalore',
          price: '₹1,00,000 - ₹5,00,000',
          description: 'Floral and theme decoration for weddings',
          rating: 4.7,
          reviews: 67,
          verified: false,
          contactPhone: '+91 9876543212',
          contactEmail: 'info@blossomdecor.com'
        }
      ]

      let filteredVendors = vendors
      
      if (category) {
        filteredVendors = filteredVendors.filter(v => v.category === category)
      }
      
      if (location) {
        filteredVendors = filteredVendors.filter(v => 
          v.location.toLowerCase().includes(location.toLowerCase())
        )
      }

      return NextResponse.json({ vendors: filteredVendors })
    }

    if (type === 'events') {
      const events = await db.event.findMany({
        where: {
          startDate: {
            gte: new Date()
          }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          },
          _count: {
            select: {
              attendees: true
            }
          }
        },
        orderBy: {
          startDate: 'asc'
        }
      })

      return NextResponse.json({ events })
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Get wedding data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}