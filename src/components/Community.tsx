'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Calendar,
  Award,
  Star,
  Plus,
  ThumbsUp,
  Eye,
  PenTool,
  BarChart3,
  Hash,
  Clock,
  User,
  ChevronRight
} from 'lucide-react'

interface ForumPost {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  author: string
  authorAvatar: string
  views: number
  likes: number
  comments: number
  createdAt: string
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  authorAvatar: string
  featuredImage: string
  views: number
  likes: number
  publishedAt: string
}

interface Poll {
  id: string
  question: string
  options: Array<{
    text: string
    votes: number
    percentage: number
  }>
  totalVotes: number
  category: string
  voted: boolean
  createdAt: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  type: string
  attendees: number
  maxAttendees: number
  isVirtual: boolean
  price: string
}

export default function Community() {
  const [activeTab, setActiveTab] = useState('forum')
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Tips for Successful First Meeting',
      content: 'Share your experiences and tips for making the first meeting with your potential partner successful...',
      category: 'advice',
      tags: ['first-meeting', 'tips', 'advice'],
      author: 'Amit Sharma',
      authorAvatar: '/api/placeholder/40/40',
      views: 234,
      likes: 45,
      comments: 12,
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Traditional Nepali Wedding Customs',
      content: 'Let\'s discuss the beautiful traditions and customs that make Nepali weddings special...',
      category: 'cultural',
      tags: ['wedding', 'traditions', 'nepali-culture'],
      author: 'Priya Gurung',
      authorAvatar: '/api/placeholder/40/40',
      views: 567,
      likes: 89,
      comments: 34,
      createdAt: '2024-01-18'
    }
  ])

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: '10 Signs You\'ve Found Your Life Partner',
      excerpt: 'Discover the key indicators that suggest you\'ve found the right person for marriage...',
      content: 'Finding the right life partner is one of the most important decisions...',
      category: 'relationships',
      tags: ['relationships', 'marriage', 'love'],
      author: 'Dr. Ramesh Thapa',
      authorAvatar: '/api/placeholder/40/40',
      featuredImage: '/api/placeholder/400/200',
      views: 1234,
      likes: 156,
      publishedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Planning a Perfect Nepali Wedding',
      excerpt: 'A comprehensive guide to planning your dream wedding with traditional Nepali elements...',
      content: 'Planning a wedding is an exciting journey, especially when incorporating...',
      category: 'wedding_tips',
      tags: ['wedding', 'planning', 'nepali-traditions'],
      author: 'Sunita Magar',
      authorAvatar: '/api/placeholder/40/40',
      featuredImage: '/api/placeholder/400/200',
      views: 892,
      likes: 98,
      publishedAt: '2024-01-12'
    }
  ])

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      question: 'What is most important in a life partner?',
      options: [
        { text: 'Education', votes: 45, percentage: 25 },
        { text: 'Family Values', votes: 78, percentage: 43.3 },
        { text: 'Appearance', votes: 23, percentage: 12.8 },
        { text: 'Career', votes: 34, percentage: 18.9 }
      ],
      totalVotes: 180,
      category: 'preferences',
      voted: false,
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      question: 'Do you believe in arranged marriages?',
      options: [
        { text: 'Yes, strongly', votes: 89, percentage: 41.8 },
        { text: 'Yes, somewhat', votes: 67, percentage: 31.5 },
        { text: 'No, prefer love marriage', votes: 45, percentage: 21.1 },
        { text: 'Not sure', votes: 12, percentage: 5.6 }
      ],
      totalVotes: 213,
      category: 'traditions',
      voted: true,
      createdAt: '2024-01-18'
    }
  ])

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Kathmandu Matrimonial Meetup',
      description: 'Join us for an evening of networking and meeting potential partners in a relaxed environment.',
      date: '2024-02-15',
      location: 'Kathmandu Marriott Hotel',
      type: 'meetup',
      attendees: 45,
      maxAttendees: 100,
      isVirtual: false,
      price: 'Free'
    },
    {
      id: '2',
      title: 'Online Workshop: Building Strong Relationships',
      description: 'Learn from relationship experts about building and maintaining strong, healthy relationships.',
      date: '2024-02-20',
      location: 'Online via Zoom',
      type: 'workshop',
      attendees: 128,
      maxAttendees: 500,
      isVirtual: true,
      price: 'Free'
    }
  ])

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  })

  const [showNewPostDialog, setShowNewPostDialog] = useState(false)
  const [postType, setPostType] = useState<'forum' | 'blog'>('forum')

  const categories = [
    { value: 'relationships', label: 'Relationships' },
    { value: 'wedding_planning', label: 'Wedding Planning' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'advice', label: 'Advice' },
    { value: 'success_stories', label: 'Success Stories' },
    { value: 'general', label: 'General' }
  ]

  const handleCreatePost = () => {
    const newPostData = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      author: 'You',
      authorAvatar: '/api/placeholder/40/40',
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      ...(postType === 'blog' && {
        excerpt: newPost.content.substring(0, 150) + '...',
        featuredImage: '/api/placeholder/400/200',
        publishedAt: new Date().toISOString().split('T')[0]
      })
    }

    if (postType === 'forum') {
      setForumPosts([newPostData as ForumPost, ...forumPosts])
    } else {
      setBlogPosts([newPostData as BlogPost, ...blogPosts])
    }

    setNewPost({ title: '', content: '', category: '', tags: '' })
    setShowNewPostDialog(false)
  }

  const handleVote = (pollId: string, optionIndex: number) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId && !poll.voted) {
        const updatedOptions = poll.options.map((option, index) => {
          if (index === optionIndex) {
            return {
              ...option,
              votes: option.votes + 1
            }
          }
          return option
        })

        const newTotalVotes = poll.totalVotes + 1
        const optionsWithPercentage = updatedOptions.map(option => ({
          ...option,
          percentage: Math.round((option.votes / newTotalVotes) * 100)
        }))

        return {
          ...poll,
          options: optionsWithPercentage,
          totalVotes: newTotalVotes,
          voted: true
        }
      }
      return poll
    }))
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      relationships: 'bg-pink-500',
      wedding_planning: 'bg-purple-500',
      cultural: 'bg-blue-500',
      advice: 'bg-green-500',
      success_stories: 'bg-yellow-500',
      general: 'bg-gray-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            Community Hub
          </h1>
          <p className="text-gray-600 mt-2">Connect, share, and learn from our vibrant community</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => { setPostType('forum'); setShowNewPostDialog(true); }}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Forum Post
          </Button>
          <Button 
            variant="outline"
            onClick={() => { setPostType('blog'); setShowNewPostDialog(true); }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Blog Post
          </Button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{forumPosts.length}</div>
            <p className="text-xs text-muted-foreground">Active discussions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Articles</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">Helpful guides</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Polls</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{polls.length}</div>
            <p className="text-xs text-muted-foreground">Community polls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">Community events</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="forum">Forum</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Forum Discussions</h2>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(post.category)}>
                          {post.category.replace('_', ' ')}
                        </Badge>
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6 mr-2">
                            <AvatarImage src={post.authorAvatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{post.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Blog Articles</h2>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category.replace('_', ' ')}
                    </Badge>
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="polls" className="space-y-6">
          <h2 className="text-2xl font-bold">Community Polls</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {polls.map((poll) => (
              <Card key={poll.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{poll.question}</CardTitle>
                  <CardDescription>
                    {poll.totalVotes} votes • {poll.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {poll.options.map((option, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{option.text}</span>
                        <span>{option.percentage}% ({option.votes})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${option.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button 
                    className="w-full" 
                    variant={poll.voted ? "secondary" : "default"}
                    disabled={poll.voted}
                    onClick={() => handleVote(poll.id, 0)}
                  >
                    {poll.voted ? 'You Voted' : 'Vote'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </div>
                    <Badge variant={event.isVirtual ? "secondary" : "default"}>
                      {event.isVirtual ? 'Virtual' : 'In-Person'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{event.date}</p>
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                    <div>
                      <p className="font-medium">Price</p>
                      <p className="text-gray-600">{event.price}</p>
                    </div>
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-gray-600">{event.attendees}/{event.maxAttendees}</p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Seats Available</span>
                      <span>{event.maxAttendees - event.attendees}</span>
                    </div>
                    <Progress 
                      value={(event.attendees / event.maxAttendees) * 100} 
                      className="h-2" 
                    />
                  </div>
                  <Button className="w-full">
                    {event.isVirtual ? 'Join Online' : 'Register Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <h2 className="text-2xl font-bold">Your Achievements</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Profile Complete</h3>
                <p className="text-sm text-gray-600">Completed 100% profile</p>
                <Badge className="mt-2 bg-yellow-500">Earned</Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Social Butterfly</h3>
                <p className="text-sm text-gray-600">Sent 50+ messages</p>
                <Badge className="mt-2 bg-blue-500">Earned</Badge>
              </CardContent>
            </Card>

            <Card className="text-center opacity-50">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2">Match Master</h3>
                <p className="text-sm text-gray-600">100+ successful matches</p>
                <Badge variant="outline" className="mt-2">Locked</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Post Dialog */}
      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Create New {postType === 'forum' ? 'Forum Post' : 'Blog Article'}
            </DialogTitle>
            <DialogDescription>
              Share your thoughts and experiences with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Enter a catchy title..."
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="Write your content here..."
                rows={8}
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                placeholder="Enter tags separated by commas..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewPostDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>
                <Plus className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}