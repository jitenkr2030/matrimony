'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Crown, Star, ArrowRight, Download } from 'lucide-react'

interface PaymentSuccessProps {
  type: 'subscription' | 'gift' | 'boost'
  planName?: string
  amount: number
  currency: string
  transactionId: string
  onClose?: () => void
}

export default function PaymentSuccess({ 
  type, 
  planName, 
  amount, 
  currency, 
  transactionId, 
  onClose 
}: PaymentSuccessProps) {
  const getSuccessMessage = () => {
    switch (type) {
      case 'subscription':
        return {
          title: 'Subscription Successful!',
          description: `You're now a ${planName} member`,
          icon: <Crown className="w-12 h-12 text-yellow-500" />
        }
      case 'gift':
        return {
          title: 'Gift Sent Successfully!',
          description: 'Your virtual gift has been delivered',
          icon: <Star className="w-12 h-12 text-pink-500" />
        }
      case 'boost':
        return {
          title: 'Profile Boost Activated!',
          description: 'Your profile visibility has been increased',
          icon: <ArrowRight className="w-12 h-12 text-blue-500" />
        }
      default:
        return {
          title: 'Payment Successful!',
          description: 'Your transaction has been completed',
          icon: <CheckCircle className="w-12 h-12 text-green-500" />
        }
    }
  }

  const successInfo = getSuccessMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            {successInfo.icon}
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            {successInfo.title}
          </CardTitle>
          <CardDescription className="text-lg">
            {successInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-sm font-medium">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-medium">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency
                }).format(amount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Date</span>
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>

          {/* Success Features */}
          {type === 'subscription' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Premium features activated</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Unlimited profile views</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Advanced search filters</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Priority customer support</span>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-4">
            <h4 className="font-semibold">What's Next?</h4>
            <div className="space-y-2">
              {type === 'subscription' && (
                <>
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Complete Your Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Start Searching for Matches
                  </Button>
                </>
              )}
              {type === 'gift' && (
                <Button variant="outline" className="w-full justify-start">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Send a Message
                </Button>
              )}
              {type === 'boost' && (
                <Button variant="outline" className="w-full justify-start">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Track Your Profile Views
                </Button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Continue to Dashboard
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Receipt
              </Button>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          {/* Support Info */}
          <div className="text-center text-sm text-gray-600">
            <p>Need help? Contact our support team</p>
            <p>Email: support@nepalimatrimony.com | Phone: 980-000-0000</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}