import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Travel and location features
    const destinations = [
      {
        id: '1',
        name: 'Kathmandu',
        country: 'Nepal',
        description: 'Capital city with rich cultural heritage',
        popularVenues: ['Hotel Yak & Yeti', 'Hyatt Regency', 'Soaltee Crown Plaza'],
        averageCost: '₹5,00,000 - ₹15,00,000',
        bestTime: 'Oct - Dec, Mar - May'
      },
      {
        id: '2',
        name: 'Pokhara',
        country: 'Nepal',
        description: 'Beautiful lakeside city perfect for destination weddings',
        popularVenues: ['Fishtail Lodge', 'Temple Tree Resort', 'Barahi Resort'],
        averageCost: '₹3,00,000 - ₹10,00,000',
        bestTime: 'Sep - Nov, Mar - May'
      },
      {
        id: '3',
        name: 'Chitwan',
        country: 'Nepal',
        description: 'Wildlife destination with unique jungle wedding venues',
        popularVenues: ['Meghauli Serai', 'Barahi Jungle Lodge'],
        averageCost: '₹4,00,000 - ₹12,00,000',
        bestTime: 'Oct - Dec, Feb - Apr'
      }
    ]

    const travelServices = [
      {
        id: '1',
        name: 'Destination Wedding Planning',
        description: 'Complete wedding planning at your dream destination',
        price: 'Starting from ₹50,000',
        features: ['Venue booking', 'Vendor coordination', 'Travel arrangements', 'Accommodation']
      },
      {
        id: '2',
        name: 'Honeymoon Packages',
        description: 'Romantic honeymoon packages for newlyweds',
        price: 'Starting from ₹25,000',
        features: ['Romantic accommodation', 'Special dinners', 'Sightseeing', 'Couple activities']
      },
      {
        id: '3',
        name: 'Family Travel Arrangements',
        description: 'Travel planning for wedding guests and family',
        price: 'Custom pricing',
        features: ['Group bookings', 'Transportation', 'Guided tours', 'Special rates']
      }
    ]

    return NextResponse.json({
      destinations,
      travelServices
    })

  } catch (error) {
    console.error('Travel API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}