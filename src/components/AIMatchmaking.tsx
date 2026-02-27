'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, 
  Heart, 
  Star, 
  Zap, 
  Target, 
  TrendingUp,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  Eye,
  MessageCircle,
  User
} from 'lucide-react'

interface AIMatch {
  id: string
  name: string
  age: number
  location: string
  education: string
  occupation: string
  avatar: string
  compatibilityScore: number
  matchFactors: {
    lifestyle: number
    values: number
    interests: number
    family: number
    career: number
    location: number
  }
  reasons: string[]
  verified: boolean
  premium: boolean
  lastActive: string
}

export default function AIMatchmaking() {
  const [aiMatches, setAiMatches] = useState<AIMatch[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      age: 28,
      location: 'Mumbai, Maharashtra',
      education: 'MBA - IIM Ahmedabad',
      occupation: 'Product Manager at Google',
      avatar: '/api/placeholder/200/250',
      compatibilityScore: 94,
      matchFactors: {
        lifestyle: 92,
        values: 96,
        interests: 88,
        family: 95,
        career: 93,
        location: 90
      },
      reasons: [
        'Similar educational background and career ambitions',
        'Shared family values and cultural preferences',
        'Compatible lifestyle choices and habits',
        'Both value work-life balance'
      ],
      verified: true,
      premium: true,
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Neha Patel',
      age: 26,
      location: 'Bangalore, Karnataka',
      education: 'M.Tech - IIT Bombay',
      occupation: 'Data Scientist at Microsoft',
      avatar: '/api/placeholder/200/250',
      compatibilityScore: 89,
      matchFactors: {
        lifestyle: 85,
        values: 92,
        interests: 90,
        family: 88,
        career: 91,
        location: 85
      },
      reasons: [
        'Strong academic and professional alignment',
        'Similar interests in technology and innovation',
        'Complementary personality traits',
        'Geographic preference compatibility'
      ],
      verified: true,
      premium: false,
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Anjali Gupta',
      age: 29,
      location: 'Delhi, NCR',
      education: 'CA - Institute of Chartered Accountants',
      occupation: 'Senior Financial Analyst',
      avatar: '/api/placeholder/200/250',
      compatibilityScore: 87,
      matchFactors: {
        lifestyle: 88,
        values: 90,
        interests: 82,
        family: 92,
        career: 86,
        location: 88
      },
      reasons: [
        'Financial stability and career focus',
        'Traditional values with modern outlook',
        'Family-oriented background',
        'Similar long-term life goals'
      ],
      verified: false,
      premium: true,
      lastActive: '3 hours ago'
    }
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<AIMatch | null>(null)
  const [filterCriteria, setFilterCriteria] = useState({
    minCompatibility: 80,
    verifiedOnly: false,
    locationOnly: false,
    educationLevel: 'any'
  })

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update with new random scores to simulate AI analysis
    setAiMatches(prev => prev.map(match => ({
      ...match,
      compatibilityScore: Math.floor(Math.random() * 20) + 80,
      matchFactors: {
        lifestyle: Math.floor(Math.random() * 20) + 80,
        values: Math.floor(Math.random() * 20) + 80,
        interests: Math.floor(Math.random() * 20) + 80,
        family: Math.floor(Math.random() * 20) + 80,
        career: Math.floor(Math.random() * 20) + 80,
        location: Math.floor(Math.random() * 20) + 80
      }
    })))
    setIsAnalyzing(false)
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCompatibilityLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match'
    if (score >= 80) return 'Great Match'
    if (score >= 70) return 'Good Match'
    return 'Potential Match'
  }

  const filteredMatches = aiMatches.filter(match => {
    if (match.compatibilityScore < filterCriteria.minCompatibility) return false
    if (filterCriteria.verifiedOnly && !match.verified) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* AI Analysis Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
            AI-Powered Matchmaking
          </CardTitle>
          <CardDescription>
            Our advanced AI analyzes your profile to find the most compatible matches based on multiple factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{filteredMatches.length}</p>
                <p className="text-sm text-gray-600">AI Matches Found</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(filteredMatches.reduce((acc, match) => acc + match.compatibilityScore, 0) / filteredMatches.length)}%
                </p>
                <p className="text-sm text-gray-600">Avg. Compatibility</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={runAIAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Run AI Analysis
                  </>
                )}
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Target className="w-4 h-4 mr-2" />
                Refine Preferences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matches List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your AI Matches</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                className="text-sm border rounded px-2 py-1"
                value={filterCriteria.minCompatibility}
                onChange={(e) => setFilterCriteria(prev => ({...prev, minCompatibility: parseInt(e.target.value)}))}
              >
                <option value="70">70%+ Compatibility</option>
                <option value="80">80%+ Compatibility</option>
                <option value="90">90%+ Compatibility</option>
              </select>
            </div>
          </div>

          {filteredMatches.map((match) => (
            <Card 
              key={match.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedMatch?.id === match.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedMatch(match)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={match.avatar} />
                      <AvatarFallback>
                        {match.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        match.compatibilityScore >= 90 ? 'bg-green-500' :
                        match.compatibilityScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {match.compatibilityScore}%
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-semibold">{match.name}, {match.age}</h4>
                          {match.verified && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {match.premium && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{match.location}</p>
                        <p className="text-sm text-gray-700 mb-1">{match.education}</p>
                        <p className="text-sm text-gray-700 mb-3">{match.occupation}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {match.reasons.slice(0, 2).map((reason, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-sm font-medium ${getCompatibilityColor(match.compatibilityScore)}`}>
                          {getCompatibilityLabel(match.compatibilityScore)}
                        </p>
                        <p className="text-xs text-gray-500">Last active {match.lastActive}</p>
                      </div>
                    </div>

                    {/* Compatibility Factors */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {Object.entries(match.matchFactors).slice(0, 3).map(([factor, score]) => (
                        <div key={factor} className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-xs font-bold text-purple-600">{score}%</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 capitalize">{factor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-pink-600 to-purple-600">
                    <Heart className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Match Details */}
        <div className="space-y-4">
          {selectedMatch ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Match Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <Avatar className="w-24 h-24 mx-auto mb-3">
                      <AvatarImage src={selectedMatch.avatar} />
                      <AvatarFallback>
                        {selectedMatch.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{selectedMatch.name}</h3>
                    <p className={`text-lg font-bold ${getCompatibilityColor(selectedMatch.compatibilityScore)}`}>
                      {selectedMatch.compatibilityScore}% Compatible
                    </p>
                    <p className="text-sm text-gray-600">{getCompatibilityLabel(selectedMatch.compatibilityScore)}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Compatibility Breakdown</h4>
                    {Object.entries(selectedMatch.matchFactors).map(([factor, score]) => (
                      <div key={factor} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{factor}</span>
                          <span className="font-medium">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Why You Match
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedMatch.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Match Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">High compatibility in values</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">Similar career goals</span>
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">Complementary personalities</span>
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Match</h3>
                <p className="text-gray-600">Click on a match to see detailed AI analysis</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}