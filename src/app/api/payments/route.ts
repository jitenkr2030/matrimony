import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const subscriptionSchema = z.object({
  plan: z.enum(['basic', 'silver', 'gold', 'platinum']),
  paymentMethod: z.enum(['esewa', 'khalti', 'imepay', 'prabhupay', 'card', 'bank']),
  duration: z.enum(['monthly', 'yearly']),
  autoRenew: z.boolean().default(false)
})

const paymentSchema = z.object({
  type: z.enum(['subscription', 'gift', 'boost', 'vendor']),
  amount: z.number(),
  currency: z.string().default('NPR'),
  paymentMethod: z.enum(['esewa', 'khalti', 'imepay', 'prabhupay', 'card', 'bank']),
  transactionId: z.string(),
  metadata: z.object({}).optional()
})

const PLANS = {
  basic: {
    name: 'Basic',
    price: 0,
    yearlyPrice: 0,
    duration: 30,
    features: [
      'Basic profile creation',
      '5 profile views per day',
      'Basic search filters',
      'Send 3 interests per month',
      'Limited messaging (text only)'
    ],
    color: 'bg-gray-500',
    icon: '👤'
  },
  silver: {
    name: 'Silver',
    price: 499,
    yearlyPrice: 4999,
    duration: 30,
    features: [
      'All Basic features',
      'Unlimited profile views',
      'Advanced search filters (20+ criteria)',
      'Unlimited interests and messages',
      'Video calling (30 mins/month)',
      'Contact information access',
      'Profile visibility boost (2x)',
      'Read receipts for messages'
    ],
    color: 'bg-blue-500',
    icon: '🥈'
  },
  gold: {
    name: 'Gold',
    price: 999,
    yearlyPrice: 9999,
    duration: 30,
    features: [
      'All Silver features',
      'Unlimited video calling',
      'Priority customer support',
      'AI matchmaking with detailed analysis',
      'Background verification badge',
      'Profile visibility boost (5x)',
      'Advanced privacy controls',
      'Virtual gifting credits (₹500/month)',
      'Wedding planning tools access'
    ],
    color: 'bg-yellow-500',
    icon: '🥇'
  },
  platinum: {
    name: 'Platinum',
    price: 1999,
    yearlyPrice: 19999,
    duration: 30,
    features: [
      'All Gold features',
      'Personal relationship manager',
      'Exclusive event invitations',
      'Premium vendor discounts',
      'Priority profile placement',
      'Unlimited virtual gifting',
      'Cultural consultation services',
      'Family account management'
    ],
    color: 'bg-purple-500',
    icon: '💎'
  }
}

const VIRTUAL_GIFTS = [
  { id: '1', name: 'Rose', icon: '🌹', price: 50, category: 'romantic', description: 'A beautiful red rose to express love' },
  { id: '2', name: 'Chocolate Box', icon: '🍫', price: 30, category: 'romantic', description: 'Delicious chocolates for your sweetie' },
  { id: '3', name: 'Teddy Bear', icon: '🧸', price: 100, category: 'fun', description: 'Cute teddy bear to show affection' },
  { id: '4', name: 'Birthday Cake', icon: '🎂', price: 80, category: 'fun', description: 'Celebrate with a virtual cake' },
  { id: '5', name: 'Wedding Ring', icon: '💍', price: 500, category: 'traditional', description: 'Traditional wedding ring symbol' },
  { id: '6', name: 'Prayer Beads', icon: '📿', price: 150, category: 'traditional', description: 'Traditional Nepali prayer beads' },
  { id: '7', name: 'Music Box', icon: '🎵', price: 60, category: 'fun', description: 'Musical gift with romantic tune' },
  { id: '8', name: 'Love Letter', icon: '💌', price: 20, category: 'romantic', description: 'Virtual love letter with your message' },
  { id: '9', name: 'Diamond Ring', icon: '💎', price: 1000, category: 'romantic', description: 'Luxury diamond ring proposal' },
  { id: '10', name: 'Traditional Jewelry', icon: '🕉️', price: 300, category: 'traditional', description: 'Traditional Nepali wedding jewelry' }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    if (type === 'subscription') {
      const validatedData = subscriptionSchema.parse(data)
      const plan = PLANS[validatedData.plan]
      
      // Calculate price based on duration
      const price = validatedData.duration === 'yearly' ? plan.yearlyPrice : plan.price
      
      // Create payment record
      const payment = await db.payment.create({
        data: {
          userId,
          type: 'subscription',
          amount: price,
          currency: 'NPR',
          status: 'pending',
          paymentMethod: validatedData.paymentMethod,
          transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          gatewayResponse: JSON.stringify({ status: 'pending' }),
          metadata: {
            plan: validatedData.plan,
            duration: validatedData.duration,
            autoRenew: validatedData.autoRenew
          }
        }
      })

      // Simulate payment processing
      setTimeout(async () => {
        // Update payment status
        await db.payment.update({
          where: { id: payment.id },
          data: {
            status: 'completed',
            gatewayResponse: JSON.stringify({ status: 'success' })
          }
        })

        // Create or update subscription
        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + (validatedData.duration === 'yearly' ? 365 : plan.duration))

        const existingSubscription = await db.subscription.findFirst({
          where: { userId }
        })

        if (existingSubscription) {
          await db.subscription.update({
            where: { id: existingSubscription.id },
            data: {
              plan: validatedData.plan,
              status: 'active',
              startDate,
              endDate,
              price,
              currency: 'NPR',
              paymentId: payment.id,
              autoRenew: validatedData.autoRenew
            }
          })
        } else {
          await db.subscription.create({
            data: {
              userId,
              plan: validatedData.plan,
              status: 'active',
              startDate,
              endDate,
              price,
              currency: 'NPR',
              paymentId: payment.id,
              autoRenew: validatedData.autoRenew
            }
          })
        }

        // Update user subscription status
        await db.user.update({
          where: { id: userId },
          data: {
            subscriptionPlan: validatedData.plan,
            subscriptionStatus: 'active',
            subscriptionExpiresAt: endDate
          }
        })
      }, 2000)

      return NextResponse.json({
        message: 'Subscription initiated successfully',
        payment,
        plan,
        price
      })
    }

    if (type === 'gift') {
      const { giftId, toUserId, message } = data
      const gift = VIRTUAL_GIFTS.find(g => g.id === giftId)
      
      if (!gift) {
        return NextResponse.json(
          { error: 'Gift not found' },
          { status: 404 }
        )
      }

      // Create payment record
      const payment = await db.payment.create({
        data: {
          userId,
          type: 'gift',
          amount: gift.price,
          currency: 'NPR',
          status: 'pending',
          paymentMethod: data.paymentMethod || 'esewa',
          transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          gatewayResponse: JSON.stringify({ status: 'pending' }),
          metadata: {
            giftId,
            toUserId,
            message
          }
        }
      })

      // Simulate payment processing
      setTimeout(async () => {
        await db.payment.update({
          where: { id: payment.id },
          data: {
            status: 'completed',
            gatewayResponse: JSON.stringify({ status: 'success' })
          }
        })

        // Create sent gift record
        await db.sentGift.create({
          data: {
            fromUserId: userId,
            toUserId,
            giftId,
            message,
            status: 'delivered',
            sentAt: new Date()
          }
        })
      }, 2000)

      return NextResponse.json({
        message: 'Virtual gift payment initiated',
        payment,
        gift
      })
    }

    if (type === 'boost') {
      const { boostType, duration } = data
      const boostPrices = {
        profile: { '7days': 99, '30days': 299, '90days': 699 },
        messaging: { '24h': 49, '7days': 199 },
        visibility: { '1day': 199, '7days': 999 }
      }

      const price = boostPrices[boostType]?.[duration] || 99

      // Create payment record
      const payment = await db.payment.create({
        data: {
          userId,
          type: 'boost',
          amount: price,
          currency: 'NPR',
          status: 'pending',
          paymentMethod: data.paymentMethod || 'esewa',
          transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          gatewayResponse: JSON.stringify({ status: 'pending' }),
          metadata: {
            boostType,
            duration
          }
        }
      })

      return NextResponse.json({
        message: 'Boost payment initiated',
        payment,
        price
      })
    }

    return NextResponse.json(
      { error: 'Invalid payment type' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Payment error:', error)
    
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

    // For demo purposes, we'll use a hardcoded userId
    const userId = "demo-user-id"

    if (type === 'plans') {
      return NextResponse.json({ plans: PLANS })
    }

    if (type === 'gifts') {
      return NextResponse.json({ gifts: VIRTUAL_GIFTS })
    }

    if (type === 'subscription') {
      // Get user's current subscription
      const subscription = await db.subscription.findFirst({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              subscriptionPlan: true,
              subscriptionStatus: true,
              subscriptionExpiresAt: true
            }
          }
        }
      })

      return NextResponse.json({ subscription })
    }

    if (type === 'transactions') {
      const transactions = await db.payment.findMany({
        where: { userId },
        orderBy: {
          createdAt: 'desc'
        },
        take: 50
      })

      return NextResponse.json({ transactions })
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Get payments error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}