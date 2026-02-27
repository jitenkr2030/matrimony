'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import PaymentSuccess from './PaymentSuccess'
import { 
  Crown, 
  Star, 
  Gift, 
  TrendingUp, 
  Check, 
  X, 
  CreditCard, 
  Smartphone, 
  Calendar,
  Shield,
  Zap,
  Heart,
  MessageCircle,
  Video,
  Eye,
  Users,
  Award,
  Target,
  Sparkles,
  Diamond,
  ArrowRight,
  Info,
  Clock,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface Plan {
  name: string
  price: number
  yearlyPrice: number
  duration: number
  features: string[]
  color: string
  icon: string
}

interface VirtualGift {
  id: string
  name: string
  icon: string
  price: number
  category: string
  description: string
}

interface Transaction {
  id: string
  type: string
  amount: number
  status: string
  createdAt: string
  metadata: any
}

export default function Monetization() {
  const [activeTab, setActiveTab] = useState('subscription')
  const [selectedPlan, setSelectedPlan] = useState<string>('silver')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [autoRenew, setAutoRenew] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('esewa')
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedGift, setSelectedGift] = useState<VirtualGift | null>(null)
  const [giftMessage, setGiftMessage] = useState('')
  const [processingPayment, setProcessingPayment] = useState(false)

  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [paymentSuccessData, setPaymentSuccessData] = useState({
    type: 'subscription' as 'subscription' | 'gift' | 'boost',
    planName: '',
    amount: 0,
    currency: 'NPR',
    transactionId: ''
  })

  const [plans, setPlans] = useState<Record<string, Plan>>({
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
  })

  const [virtualGifts, setVirtualGifts] = useState<VirtualGift[]>([
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
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'subscription',
      amount: 4999,
      status: 'completed',
      createdAt: '2024-01-20',
      metadata: { plan: 'silver', duration: 'yearly' }
    },
    {
      id: '2',
      type: 'gift',
      amount: 50,
      status: 'completed',
      createdAt: '2024-01-18',
      metadata: { giftId: '1', giftName: 'Rose' }
    }
  ])

  const [currentSubscription, setCurrentSubscription] = useState({
    plan: 'silver',
    status: 'active',
    expiresAt: '2024-12-20',
    autoRenew: true
  })

  const handleSubscription = async () => {
    setProcessingPayment(true)
    
    // Generate transaction ID
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Simulate payment processing
    setTimeout(() => {
      setCurrentSubscription({
        plan: selectedPlan,
        status: 'active',
        expiresAt: new Date(Date.now() + (plans[selectedPlan].duration * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        autoRenew
      })
      
      // Show payment success
      setPaymentSuccessData({
        type: 'subscription',
        planName: plans[selectedPlan].name,
        amount: getPrice(),
        currency: 'NPR',
        transactionId
      })
      
      setProcessingPayment(false)
      setShowPaymentDialog(false)
      setShowPaymentSuccess(true)
    }, 2000)
  }

  const handleSendGift = async () => {
    if (selectedGift) {
      setProcessingPayment(true)
      
      // Generate transaction ID
      const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Simulate payment processing
      setTimeout(() => {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type: 'gift',
          amount: selectedGift.price,
          status: 'completed',
          createdAt: new Date().toISOString().split('T')[0],
          metadata: { giftId: selectedGift.id, giftName: selectedGift.name }
        }
        setTransactions([newTransaction, ...transactions])
        
        // Show payment success
        setPaymentSuccessData({
          type: 'gift',
          amount: selectedGift.price,
          currency: 'NPR',
          transactionId
        })
        
        setProcessingPayment(false)
        setSelectedGift(null)
        setGiftMessage('')
        setShowPaymentSuccess(true)
      }, 2000)
    }
  }

  const getPrice = () => {
    const plan = plans[selectedPlan]
    return billingCycle === 'yearly' ? plan.yearlyPrice : plan.price
  }

  const getSavings = () => {
    const plan = plans[selectedPlan]
    const monthlyTotal = plan.price * 12
    const yearlyPrice = plan.yearlyPrice
    return monthlyTotal - yearlyPrice
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600'
      case 'pending': return 'text-yellow-600'
      case 'failed': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'failed': return <X className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Crown className="w-8 h-8 mr-3 text-yellow-600" />
            Premium & Monetization
          </h1>
          <p className="text-gray-600 mt-2">Unlock premium features and find your perfect match faster</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            Secure Payments
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <Shield className="w-4 h-4 mr-1" />
            Money Back Guarantee
          </Badge>
        </div>
      </div>

      {/* Current Subscription Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2 text-blue-600" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {plans[currentSubscription.plan].icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{plans[currentSubscription.plan].name} Plan</h3>
                <p className="text-sm text-gray-600">
                  Status: <span className="text-green-600 font-medium">{currentSubscription.status}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Expires: {currentSubscription.expiresAt}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">Auto-renew</p>
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${currentSubscription.autoRenew ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className="text-sm font-medium">
                  {currentSubscription.autoRenew ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscription">Subscription Plans</TabsTrigger>
          <TabsTrigger value="gifts">Virtual Gifts</TabsTrigger>
          <TabsTrigger value="boosts">Profile Boosts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <p className="text-gray-600">Select the perfect plan for your needs</p>
            </div>
            <div className="flex items-center space-x-4">
              <RadioGroup value={billingCycle} onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly">Yearly</Label>
                  <Badge className="bg-green-500">Save 33%</Badge>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(plans).map(([key, plan]) => (
              <Card 
                key={key} 
                className={`relative hover:shadow-lg transition-all cursor-pointer ${
                  selectedPlan === key ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedPlan(key)}
              >
                {key === 'gold' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    {plan.price === 0 ? (
                      <p className="text-3xl font-bold">Free</p>
                    ) : (
                      <div>
                        <p className="text-3xl font-bold">
                          {formatPrice(billingCycle === 'yearly' ? plan.yearlyPrice : plan.price)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {billingCycle === 'yearly' ? 'per year' : 'per month'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full ${plan.color} text-white`}
                    onClick={(e) => { e.stopPropagation(); setSelectedPlan(key); setShowPaymentDialog(true); }}
                  >
                    {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Compare Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Feature</th>
                      <th className="text-center p-2">Basic</th>
                      <th className="text-center p-2">Silver</th>
                      <th className="text-center p-2">Gold</th>
                      <th className="text-center p-2">Platinum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Profile Views</td>
                      <td className="text-center p-2">5/day</td>
                      <td className="text-center p-2">Unlimited</td>
                      <td className="text-center p-2">Unlimited</td>
                      <td className="text-center p-2">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Video Calling</td>
                      <td className="text-center p-2">-</td>
                      <td className="text-center p-2">30 min/month</td>
                      <td className="text-center p-2">Unlimited</td>
                      <td className="text-center p-2">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">AI Matchmaking</td>
                      <td className="text-center p-2">Basic</td>
                      <td className="text-center p-2">Standard</td>
                      <td className="text-center p-2">Advanced</td>
                      <td className="text-center p-2">Premium</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Profile Boost</td>
                      <td className="text-center p-2">-</td>
                      <td className="text-center p-2">2x</td>
                      <td className="text-center p-2">5x</td>
                      <td className="text-center p-2">10x</td>
                    </tr>
                    <tr>
                      <td className="p-2">Support</td>
                      <td className="text-center p-2">Email</td>
                      <td className="text-center p-2">Priority</td>
                      <td className="text-center p-2">24/7</td>
                      <td className="text-center p-2">Personal Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gifts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Virtual Gifts</h2>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="romantic">Romantic</SelectItem>
                <SelectItem value="fun">Fun</SelectItem>
                <SelectItem value="traditional">Traditional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {virtualGifts.map((gift) => (
              <Card 
                key={gift.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedGift(gift)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{gift.icon}</div>
                  <h3 className="font-semibold mb-2">{gift.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{gift.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{gift.category}</Badge>
                    <span className="text-lg font-bold">{formatPrice(gift.price)}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={(e) => { e.stopPropagation(); setSelectedGift(gift); }}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Send Gift
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="boosts" className="space-y-6">
          <h2 className="text-2xl font-bold">Profile Boosts</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-blue-500" />
                    Profile Visibility Boost
                  </CardTitle>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <CardDescription>Get 10x more profile views</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>7 Days</span>
                    <span className="font-bold">{formatPrice(99)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30 Days</span>
                    <span className="font-bold">{formatPrice(299)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>90 Days</span>
                    <span className="font-bold">{formatPrice(699)}</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Boost Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-purple-500" />
                    Priority Messaging
                  </CardTitle>
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <CardDescription>Guaranteed response within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>24 Hours</span>
                    <span className="font-bold">{formatPrice(49)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>7 Days</span>
                    <span className="font-bold">{formatPrice(199)}</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Get Priority
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Featured Profile
                  </CardTitle>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <CardDescription>Appear in featured profiles section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>1 Day</span>
                    <span className="font-bold">{formatPrice(199)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>7 Days</span>
                    <span className="font-bold">{formatPrice(999)}</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Featured
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Transaction History</h2>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Card>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'subscription' ? 'bg-blue-100' :
                        transaction.type === 'gift' ? 'bg-pink-100' :
                        'bg-gray-100'
                      }`}>
                        {transaction.type === 'subscription' && <Crown className="w-5 h-5" />}
                        {transaction.type === 'gift' && <Gift className="w-5 h-5" />}
                        {transaction.type === 'boost' && <Zap className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{transaction.type}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.metadata?.plan || transaction.metadata?.giftName || 'Service'}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.createdAt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{formatPrice(transaction.amount)}</span>
                        {getStatusIcon(transaction.status)}
                      </div>
                      <p className={`text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Subscription Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              You're upgrading to {plans[selectedPlan].name} plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-2">{plans[selectedPlan].icon}</div>
              <h3 className="text-xl font-semibold">{plans[selectedPlan].name} Plan</h3>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <span className="text-2xl font-bold">{formatPrice(getPrice())}</span>
                <span className="text-gray-600">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-sm text-green-600 font-medium">
                  You save {formatPrice(getSavings())}!
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="esewa">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4" />
                      <span>eSewa</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="khalti">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4" />
                      <span>Khalti</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="imepay">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4" />
                      <span>IME Pay</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="card">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Credit/Debit Card</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="auto-renew" 
                checked={autoRenew}
                onCheckedChange={(checked) => setAutoRenew(checked)}
              />
              <Label htmlFor="auto-renew">Auto-renew subscription</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubscription}
                disabled={processingPayment}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {processingPayment ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay {formatPrice(getPrice())}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Gift Dialog */}
      <Dialog open={!!selectedGift} onOpenChange={() => setSelectedGift(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Virtual Gift</DialogTitle>
            <DialogDescription>
              Send a virtual gift to express your interest
            </DialogDescription>
          </DialogHeader>
          {selectedGift && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">{selectedGift.icon}</div>
                <h3 className="text-xl font-semibold">{selectedGift.name}</h3>
                <p className="text-gray-600">{selectedGift.description}</p>
                <p className="text-2xl font-bold mt-2">{formatPrice(selectedGift.price)}</p>
              </div>
              <div>
                <Label htmlFor="gift-message">Personal Message (Optional)</Label>
                <Textarea
                  id="gift-message"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add a personal message..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedGift(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSendGift} disabled={processingPayment}>
                  {processingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Gift className="w-4 h-4 mr-2" />
                      Send Gift ({formatPrice(selectedGift.price)})
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Success Screen */}
      {showPaymentSuccess && (
        <PaymentSuccess
          type={paymentSuccessData.type}
          planName={paymentSuccessData.planName}
          amount={paymentSuccessData.amount}
          currency={paymentSuccessData.currency}
          transactionId={paymentSuccessData.transactionId}
          onClose={() => setShowPaymentSuccess(false)}
        />
      )}
    </div>
  )
}