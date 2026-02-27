'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Shield,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Star,
  Heart,
  MessageCircle,
  CreditCard,
  Activity,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface OverviewStats {
  totalUsers: number
  activeUsers: number
  totalProfiles: number
  completeProfiles: number
  totalMatches: number
  successfulMatches: number
  totalSubscriptions: number
  revenue: number
  period: string
}

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  city: string
  age: number
  user: {
    name: string
    isVerified: boolean
  }
  _count: {
    id: number
  }
}

interface LocationData {
  city: string
  _count: {
    id: number
  }
}

interface ConversionFunnel {
  totalVisitors: number
  registeredUsers: number
  profileCreated: number
  interestSent: number
  subscriptionPurchased: number
  conversionRates: {
    registration: string
    profileCreation: string
    interestSent: string
    subscription: string
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [period, setPeriod] = useState('30d')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [overview, setOverview] = useState<OverviewStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalProfiles: 0,
    completeProfiles: 0,
    totalMatches: 0,
    successfulMatches: 0,
    totalSubscriptions: 0,
    revenue: 0,
    period: '30d'
  })

  const [userGrowth, setUserGrowth] = useState<Record<string, number>>({})
  const [revenueData, setRevenueData] = useState<Record<string, number>>({})
  const [topProfiles, setTopProfiles] = useState<UserProfile[]>([])
  const [popularLocations, setPopularLocations] = useState<LocationData[]>([])
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel>({
    totalVisitors: 0,
    registeredUsers: 0,
    profileCreated: 0,
    interestSent: 0,
    subscriptionPurchased: 0,
    conversionRates: {
      registration: '0',
      profileCreation: '0',
      interestSent: '0',
      subscription: '0'
    }
  })

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all dashboard data
      const [overviewRes, growthRes, revenueRes, profilesRes, locationsRes, funnelRes] = await Promise.all([
        fetch('/api/admin?type=overview&period=' + period).then(res => res.json()),
        fetch('/api/admin?type=user-growth&period=' + period).then(res => res.json()),
        fetch('/api/admin?type=revenue&period=' + period).then(res => res.json()),
        fetch('/api/admin?type=top-profiles').then(res => res.json()),
        fetch('/api/admin?type=popular-locations').then(res => res.json()),
        fetch('/api/admin?type=conversion-funnel&period=' + period).then(res => res.json())
      ])

      setOverview(overviewRes.overview)
      setUserGrowth(growthRes.userGrowth)
      setRevenueData(revenueRes.revenueData)
      setTopProfiles(profilesRes.topProfiles)
      setPopularLocations(popularLocations.popularLocations)
      setConversionFunnel(funnelRes.conversionFunnel)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [period])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(num)
  }

  const getChangeIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />
    } else if (current < previous) {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />
    }
    return null
  }

  const getChangeColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-500'
    if (current < previous) return 'text-red-500'
    return 'text-gray-500'
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Shield className="w-8 h-8 mr-3 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Monitor and manage your matrimony platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Alert for Admin Access */}
      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          This is a secure admin dashboard. All actions are logged and monitored.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(overview.totalUsers)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(overview.activeUsers)} active this period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profiles</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(overview.totalProfiles)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(overview.completeProfiles)} complete profiles
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Matches</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(overview.totalMatches)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(overview.successfulMatches)} successful
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(overview.revenue)}</div>
                <p className="text-xs text-muted-foreground">
                  {overview.totalSubscriptions} subscriptions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Track user journey from visitor to subscriber</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { step: 'Visitors', count: conversionFunnel.totalVisitors, color: 'bg-blue-500' },
                  { step: 'Registered', count: conversionFunnel.registeredUsers, color: 'bg-green-500' },
                  { step: 'Profile Created', count: conversionFunnel.profileCreated, color: 'bg-yellow-500' },
                  { step: 'Interest Sent', count: conversionFunnel.interestSent, color: 'bg-purple-500' },
                  { step: 'Subscribed', count: conversionFunnel.subscriptionPurchased, color: 'bg-pink-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-32 text-sm font-medium">{item.step}</div>
                    <div className="flex-1">
                      <Progress value={(item.count / conversionFunnel.totalVisitors) * 100} className="h-2" />
                    </div>
                    <div className="w-20 text-right">
                      <div className="text-sm font-medium">{formatNumber(item.count)}</div>
                      <div className="text-xs text-gray-500">{conversionFunnel.conversionRates[item.step.toLowerCase().replace(' ', '')] as string}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <LineChart className="w-full h-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Age Group: 25-35</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Group: 35-45</span>
                    <span>35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Group: 45+</span>
                    <span>20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Profiles by Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProfiles.slice(0, 5).map((profile, index) => (
                  <div key={profile.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`/api/placeholder/40/40`} />
                        <AvatarFallback>
                          {profile.firstName[0]}{profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{profile.firstName} {profile.lastName}</p>
                        <p className="text-sm text-gray-500">{profile.city}, {profile.age}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatNumber(profile._count.id)} views</div>
                      {profile.user.isVerified && (
                        <Badge className="bg-green-500 text-xs mt-1">Verified</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{location.city}</span>
                      </div>
                      <Badge variant="outline">{formatNumber(location._count.id)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Avg. Session Duration</span>
                    <span>8m 32s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bounce Rate</span>
                    <span>32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Page Views/Session</span>
                    <span>4.2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <BarChart3 className="w-full h-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <PieChart className="w-full h-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(overview.revenue * 0.7)}</div>
                  <p className="text-sm text-gray-600">Subscriptions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(overview.revenue * 0.3)}</div>
                  <p className="text-sm text-gray-600">Other Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">0</div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">2</div>
                  <p className="text-sm text-gray-600">Flagged Content</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">156</div>
                  <p className="text-sm text-gray-600">Approved Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span>Reports Under Review</span>
                    </div>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Resolved This Week</span>
                    </div>
                    <Badge variant="secondary">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Verified Profiles</span>
                    <span>234 (78%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Verification</span>
                    <span>45 (15%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rejected</span>
                    <span>21 (7%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}