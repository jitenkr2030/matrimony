import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const period = searchParams.get('period') || '30d' // 7d, 30d, 90d, 1y

    // Calculate date range based on period
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
    }

    if (type === 'overview') {
      // Get overview statistics
      const [
        totalUsers,
        activeUsers,
        totalProfiles,
        completeProfiles,
        totalMatches,
        successfulMatches,
        totalSubscriptions,
        revenue
      ] = await Promise.all([
        db.user.count(),
        db.user.count({
          where: {
            lastLoginAt: {
              gte: startDate
            }
          }
        }),
        db.profile.count(),
        db.profile.count({
          where: {
            profileStrength: {
              gte: 80
            }
          }
        }),
        db.interest.count({
          where: {
            createdAt: {
              gte: startDate
            }
          }
        }),
        db.interest.count({
          where: {
            status: 'accepted',
            createdAt: {
              gte: startDate
            }
          }
        }),
        db.subscription.count({
          where: {
            status: 'active',
            createdAt: {
              gte: startDate
            }
          }
        }),
        // This would be calculated from payments table
        Promise.resolve(125000) // Simulated revenue
      ])

      return NextResponse.json({
        overview: {
          totalUsers,
          activeUsers,
          totalProfiles,
          completeProfiles,
          totalMatches,
          successfulMatches,
          totalSubscriptions,
          revenue,
          period
        }
      })
    }

    if (type === 'user-growth') {
      // Get user growth data
      const users = await db.user.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          createdAt: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

      // Group by day
      const userGrowth = users.reduce((acc: any, user) => {
        const date = user.createdAt.toISOString().split('T')[0]
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date]++
        return acc
      }, {})

      return NextResponse.json({ userGrowth })
    }

    if (type === 'revenue') {
      // Get revenue data
      const subscriptions = await db.subscription.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          price: true,
          currency: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

      // Group by month
      const revenueData = subscriptions.reduce((acc: any, sub) => {
        const month = sub.createdAt.toISOString().slice(0, 7)
        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month] += sub.price
        return acc
      }, {})

      return NextResponse.json({ revenueData })
    }

    if (type === 'top-profiles') {
      // Get top viewed profiles
      const topProfiles = await db.profileView.groupBy({
        by: ['profileId'],
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        },
        take: 10
      })

      const profileIds = topProfiles.map(p => p.profileId)
      
      const profiles = await db.profile.findMany({
        where: {
          id: {
            in: profileIds
          }
        },
        include: {
          user: {
            select: {
              name: true,
              isVerified: true
            }
          }
        }
      })

      // Sort by view count
      const sortedProfiles = profiles.sort((a, b) => {
        const aViews = topProfiles.find(p => p.profileId === a.id)?._count.id || 0
        const bViews = topProfiles.find(p => p.profileId === b.id)?._count.id || 0
        return bViews - aViews
      })

      return NextResponse.json({ topProfiles: sortedProfiles })
    }

    if (type === 'popular-locations') {
      // Get popular locations
      const locations = await db.profile.groupBy({
        by: ['city'],
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        },
        take: 10
      })

      return NextResponse.json({ popularLocations: locations })
    }

    if (type === 'conversion-funnel') {
      // Get conversion funnel data
      const [
        totalVisitors,
        registeredUsers,
        profileCreated,
        interestSent,
        subscriptionPurchased
      ] = await Promise.all([
        // This would come from analytics service
        Promise.resolve(50000),
        db.user.count({
          where: {
            createdAt: {
              gte: startDate
            }
          }
        }),
        db.profile.count({
          where: {
            createdAt: {
              gte: startDate
            }
          }
        }),
        db.interest.count({
          where: {
            createdAt: {
              gte: startDate
            }
          }
        }),
        db.subscription.count({
          where: {
            createdAt: {
              gte: startDate
            }
          }
        })
      ])

      return NextResponse.json({
        conversionFunnel: {
          totalVisitors,
          registeredUsers,
          profileCreated,
          interestSent,
          subscriptionPurchased,
          conversionRates: {
            registration: (registeredUsers / totalVisitors * 100).toFixed(2),
            profileCreation: (profileCreated / registeredUsers * 100).toFixed(2),
            interestSent: (interestSent / profileCreated * 100).toFixed(2),
            subscription: (subscriptionPurchased / interestSent * 100).toFixed(2)
          }
        }
      })
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}