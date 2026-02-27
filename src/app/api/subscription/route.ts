import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const subscriptionSchema = z.object({
  plan: z.enum(['basic', 'gold', 'platinum']),
  paymentMethod: z.enum(['card', 'upi', 'net_banking', 'wallet']),
  autoRenew: z.boolean().default(false)
})

const PLANS = {
  basic: {
    price: 999,
    duration: 30, // days
    features: [
      '10 profile views per day',
      'Basic search filters',
      'Send 5 interests per month',
      'Basic chat support'
    ]
  },
  gold: {
    price: 2999,
    duration: 30,
    features: [
      'Unlimited profile views',
      'Advanced search filters',
      'Unlimited interests',
      'Video calling',
      'Contact information access',
      'Profile boost'
    ]
  },
  platinum: {
    price: 5999,
    duration: 30,
    features: [
      'Everything in Gold',
      'Priority support',
      'AI matchmaking',
      'Background verification',
      'Personal relationship manager',
      'Exclusive events access'
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, paymentMethod, autoRenew } = subscriptionSchema.parse(body)

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    const planDetails = PLANS[plan]
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + planDetails.duration)

    // Create payment record (simplified - in real app, integrate with payment gateway)
    const payment = await db.payment.create({
      data: {
        userId,
        type: 'subscription',
        amount: planDetails.price,
        currency: 'INR',
        status: 'completed', // In real app, this would be 'pending' initially
        paymentMethod,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        gatewayResponse: JSON.stringify({ status: 'success' })
      }
    })

    // Create subscription
    const subscription = await db.subscription.create({
      data: {
        userId,
        plan,
        status: 'active',
        startDate,
        endDate,
        price: planDetails.price,
        currency: 'INR',
        paymentId: payment.id,
        features: JSON.stringify(planDetails.features),
        autoRenew
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Subscription created successfully',
      subscription,
      payment
    })

  } catch (error) {
    console.error('Subscription error:', error)
    
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
    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    const subscriptions = await db.subscription.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get current active subscription
    const activeSubscription = subscriptions.find(sub => 
      sub.status === 'active' && sub.endDate > new Date()
    )

    return NextResponse.json({
      subscriptions,
      currentSubscription: activeSubscription,
      plans: PLANS
    })

  } catch (error) {
    console.error('Get subscriptions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscriptionId, action } = body

    if (!['cancel', 'renew'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll use a hardcoded userId
    // In a real app, this would come from authentication
    const userId = "demo-user-id"

    const subscription = await db.subscription.findFirst({
      where: {
        id: subscriptionId,
        userId
      }
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    let updatedSubscription

    if (action === 'cancel') {
      updatedSubscription = await db.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: 'cancelled',
          autoRenew: false
        }
      })
    } else if (action === 'renew') {
      const planDetails = PLANS[subscription.plan as keyof typeof PLANS]
      const newEndDate = new Date(subscription.endDate)
      newEndDate.setDate(newEndDate.getDate() + planDetails.duration)

      updatedSubscription = await db.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: 'active',
          endDate: newEndDate,
          autoRenew: true
        }
      })
    }

    return NextResponse.json({
      message: `Subscription ${action}ed successfully`,
      subscription: updatedSubscription
    })

  } catch (error) {
    console.error('Update subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}