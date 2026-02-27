'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import AIMatchmaking from '@/components/AIMatchmaking'
import ChatComponent from '@/components/ChatComponent'
import ProfileManagement from '@/components/ProfileManagement'
import SafetyCenter from '@/components/SafetyCenter'
import Community from '@/components/Community'
import Multimedia from '@/components/Multimedia'
import { 
  Heart, 
  Search, 
  MessageCircle, 
  Star, 
  Shield, 
  Users, 
  MapPin, 
  Calendar,
  Phone,
  Mail,
  Lock,
  User,
  Camera,
  Video,
  Gift,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Crown,
  Gem,
  Zap
} from 'lucide-react'

export default function MatrimonyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('search')
  const [searchFilters, setSearchFilters] = useState({
    ageMin: '',
    ageMax: '',
    religion: '',
    caste: '',
    location: '',
    education: '',
    occupation: ''
  })

  const successStories = [
    {
      id: 1,
      names: "Rahul & Priya",
      story: "Found our perfect match in just 2 months!",
      image: "/api/placeholder/100/100",
      weddingDate: "2024-01-15"
    },
    {
      id: 2,
      names: "Amit & Neha",
      story: "Thanks to the AI matching, we found true love",
      image: "/api/placeholder/100/100",
      weddingDate: "2024-02-20"
    },
    {
      id: 3,
      names: "Vikram & Anjali",
      story: "Our families were involved from day one",
      image: "/api/placeholder/100/100",
      weddingDate: "2024-03-10"
    }
  ]

  const featuredProfiles = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 28,
      education: "MBA",
      occupation: "Software Engineer",
      location: "Mumbai",
      image: "/api/placeholder/200/250",
      verified: true,
      premium: true,
      compatibility: 92
    },
    {
      id: 2,
      name: "Neha Patel",
      age: 26,
      education: "M.Tech",
      occupation: "Data Scientist",
      location: "Bangalore",
      image: "/api/placeholder/200/250",
      verified: true,
      premium: false,
      compatibility: 88
    },
    {
      id: 3,
      name: "Anjali Gupta",
      age: 29,
      education: "CA",
      occupation: "Financial Analyst",
      location: "Delhi",
      image: "/api/placeholder/200/250",
      verified: false,
      premium: true,
      compatibility: 85
    }
  ]

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "₹999",
      duration: "month",
      features: [
        "10 profile views per day",
        "Basic search filters",
        "Send 5 interests per month",
        "Basic chat support"
      ],
      icon: User,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Gold",
      price: "₹2,999",
      duration: "month",
      popular: true,
      features: [
        "Unlimited profile views",
        "Advanced search filters",
        "Unlimited interests",
        "Video calling",
        "Contact information access",
        "Profile boost"
      ],
      icon: Crown,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "Platinum",
      price: "₹5,999",
      duration: "month",
      features: [
        "Everything in Gold",
        "Priority support",
        "AI matchmaking",
        "Background verification",
        "Personal relationship manager",
        "Exclusive events access"
      ],
      icon: Gem,
      color: "from-purple-500 to-purple-600"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All profiles undergo strict verification process"
    },
    {
      icon: Heart,
      title: "AI Matchmaking",
      description: "Advanced AI algorithms for perfect compatibility"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is secure and private"
    },
    {
      icon: MessageCircle,
      title: "Secure Chat",
      description: "End-to-end encrypted messaging"
    },
    {
      icon: Video,
      title: "Video Calls",
      description: "Connect face-to-face safely"
    },
    {
      icon: Star,
      title: "Success Stories",
      description: "Thousands of successful marriages"
    }
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-pink-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  NepaliMatrimony
                </span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-700 hover:text-pink-600 transition">Features</a>
                <a href="#success" className="text-gray-700 hover:text-pink-600 transition">Success Stories</a>
                <a href="#plans" className="text-gray-700 hover:text-pink-600 transition">Plans</a>
                <a href="#about" className="text-gray-700 hover:text-pink-600 transition">About</a>
              </nav>
              <Button onClick={() => setIsLoggedIn(true)} className="bg-gradient-to-r from-pink-600 to-purple-600">
                Sign In
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-pink-600 to-purple-600">
              <Sparkles className="w-4 h-4 mr-1" />
              Trusted by 10+ Million Singles
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Life Partner
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Nepal's most trusted matrimony platform with AI-powered matchmaking, 
              verified profiles, and thousands of success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 text-lg"
                onClick={() => setActiveTab('register')}
              >
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                <Video className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Auth Modal */}
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Welcome to NepaliMatrimony
              </DialogTitle>
              <DialogDescription className="text-center">
                Find your life partner with Nepal's most trusted matrimony platform
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Login
                  </Button>
                  <div className="text-center">
                    <a href="#" className="text-sm text-pink-600 hover:underline">Forgot password?</a>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last name" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password" placeholder="Create a password" />
                  </div>
                  <div>
                    <Label htmlFor="gender">I am</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms and Conditions
                    </Label>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Create Account
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose NepaliMatrimony?</h2>
              <p className="text-xl text-gray-600">Discover the features that make us Nepal's most trusted matrimony platform</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="success" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600">Thousands of couples found their perfect match</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-pink-600" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="w-12 h-12 mr-3">
                        <AvatarImage src={story.image} />
                        <AvatarFallback>{story.names.split(' ')[0][0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{story.names}</h3>
                        <p className="text-sm text-gray-600">Married {story.weddingDate}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{story.story}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Plans */}
        <section id="plans" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h2>
              <p className="text-xl text-gray-600">Unlock premium features to find your perfect match faster</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {subscriptionPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-2 border-pink-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-gray-900">
                      {plan.price}/<span className="text-lg font-normal text-gray-600">{plan.duration}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full bg-gradient-to-r ${plan.color}`}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="h-8 w-8 text-pink-500" />
                  <span className="text-2xl font-bold">NepaliMatrimony</span>
                </div>
                <p className="text-gray-400">Nepal's most trusted matrimony platform</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Success Stories</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Search Profiles</a></li>
                  <li><a href="#" className="hover:text-white">Premium Plans</a></li>
                  <li><a href="#" className="hover:text-white">Mobile App</a></li>
                  <li><a href="#" className="hover:text-white">Safety Tips</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 NepaliMatrimony. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Logged in view - Main App
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                NepaliMatrimony
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#search" className="text-gray-700 hover:text-pink-600 transition">Search</a>
              <a href="#matches" className="text-gray-700 hover:text-pink-600 transition">AI Matches</a>
              <a href="#messages" className="text-gray-700 hover:text-pink-600 transition">Messages</a>
              <a href="#profile" className="text-gray-700 hover:text-pink-600 transition">Profile</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <MessageCircle className="w-4 h-4 mr-2" />
                Messages
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen sticky top-16 border-r">
          <div className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Search className="w-4 h-4 mr-2" />
                Advanced Search
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Matches
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Who Viewed Me
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Shortlisted
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Gift className="w-4 h-4 mr-2" />
                Send Gifts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Profile Strength</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-gray-600">Complete your profile to get better matches</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 sticky top-16 z-40 bg-white border-b">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="matches">AI Matches</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="p-6">
              {/* Search Section */}
              <section className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Find Your Perfect Match
                    </CardTitle>
                    <CardDescription>Use our advanced filters to find compatible profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                      <div>
                        <Label className="text-sm">Age From</Label>
                        <Input 
                          placeholder="Min age" 
                          value={searchFilters.ageMin}
                          onChange={(e) => setSearchFilters({...searchFilters, ageMin: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Age To</Label>
                        <Input 
                          placeholder="Max age"
                          value={searchFilters.ageMax}
                          onChange={(e) => setSearchFilters({...searchFilters, ageMax: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Religion</Label>
                        <Select value={searchFilters.religion} onValueChange={(value) => setSearchFilters({...searchFilters, religion: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hindu">Hindu</SelectItem>
                            <SelectItem value="muslim">Muslim</SelectItem>
                            <SelectItem value="christian">Christian</SelectItem>
                            <SelectItem value="sikh">Sikh</SelectItem>
                            <SelectItem value="jain">Jain</SelectItem>
                            <SelectItem value="buddhist">Buddhist</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">Caste</Label>
                        <Input 
                          placeholder="Enter caste"
                          value={searchFilters.caste}
                          onChange={(e) => setSearchFilters({...searchFilters, caste: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Location</Label>
                        <Input 
                          placeholder="City"
                          value={searchFilters.location}
                          onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Education</Label>
                        <Select value={searchFilters.education} onValueChange={(value) => setSearchFilters({...searchFilters, education: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelors">Bachelors</SelectItem>
                            <SelectItem value="masters">Masters</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="mba">MBA</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button className="bg-gradient-to-r from-pink-600 to-purple-600">
                        <Search className="w-4 h-4 mr-2" />
                        Search Profiles
                      </Button>
                      <Button variant="outline">
                        <Zap className="w-4 h-4 mr-2" />
                        AI Match
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Featured Profiles */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Search Results</h2>
                  <Button variant="outline">View All</Button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProfiles.map((profile) => (
                    <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={profile.image} 
                          alt={profile.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          {profile.verified && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {profile.premium && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                              <Crown className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 text-pink-600 mr-1" />
                            <span className="text-sm font-semibold">{profile.compatibility}% Match</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{profile.name}, {profile.age}</h3>
                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {profile.location}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {profile.occupation}
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 mr-2" />
                            {profile.education}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600">
                            <Heart className="w-4 h-4 mr-1" />
                            Connect
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="matches">
              <AIMatchmaking />
            </TabsContent>

            <TabsContent value="messages">
              <div className="p-6">
                <ChatComponent />
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <ProfileManagement />
            </TabsContent>

            <TabsContent value="community">
              <Community />
            </TabsContent>

            <TabsContent value="multimedia">
              <Multimedia />
            </TabsContent>

            <TabsContent value="safety">
              <SafetyCenter />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Premium Promotion */}
      {activeTab !== 'profile' && activeTab !== 'safety' && activeTab !== 'community' && activeTab !== 'multimedia' && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg max-w-sm">
            <Crown className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Unlock Premium Features:</strong> Get unlimited messages, contact details, and AI matchmaking. 
              <Button variant="link" className="p-0 h-auto text-yellow-600 underline ml-1">
                Upgrade Now
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}