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
  Video, 
  Gift, 
  Camera, 
  Music, 
  Upload, 
  Play, 
  Pause, 
  Volume2, 
  Maximize2, 
  Download,
  Phone,
  Calendar,
  Clock,
  Heart,
  Send,
  Image,
  Film,
  Mic,
  FileText,
  Star,
  Eye,
  MessageCircle,
  Users
} from 'lucide-react'

interface VirtualGift {
  id: string
  name: string
  icon: string
  price: number
  category: string
  description: string
}

interface MediaFile {
  id: string
  type: 'photo' | 'video' | 'voice' | 'document'
  url: string
  thumbnail: string
  caption: string
  duration?: number
  isApproved: boolean
  uploadedAt: string
}

interface VideoCall {
  id: string
  fromUserId: string
  toUserId: string
  scheduledTime: string
  status: string
  meetingLink: string
}

export default function Multimedia() {
  const [activeTab, setActiveTab] = useState('gallery')
  const [virtualGifts, setVirtualGifts] = useState<VirtualGift[]>([
    { id: '1', name: 'Rose', icon: '🌹', price: 50, category: 'romantic', description: 'A beautiful red rose to express love' },
    { id: '2', name: 'Chocolate Box', icon: '🍫', price: 30, category: 'romantic', description: 'Delicious chocolates for your sweetie' },
    { id: '3', name: 'Teddy Bear', icon: '🧸', price: 100, category: 'fun', description: 'Cute teddy bear to show affection' },
    { id: '4', name: 'Birthday Cake', icon: '🎂', price: 80, category: 'fun', description: 'Celebrate with a virtual cake' },
    { id: '5', name: 'Wedding Ring', icon: '💍', price: 500, category: 'traditional', description: 'Traditional wedding ring symbol' },
    { id: '6', name: 'Prayer Beads', icon: '📿', price: 150, category: 'traditional', description: 'Traditional Nepali prayer beads' },
    { id: '7', name: 'Music Box', icon: '🎵', price: 60, category: 'fun', description: 'Musical gift with romantic tune' },
    { id: '8', name: 'Love Letter', icon: '💌', price: 20, category: 'romantic', description: 'Virtual love letter with your message' }
  ])

  const [mediaGallery, setMediaGallery] = useState<MediaFile[]>([
    {
      id: '1',
      type: 'photo',
      url: '/api/placeholder/300/400',
      thumbnail: '/api/placeholder/150/200',
      caption: 'My favorite photo',
      isApproved: true,
      uploadedAt: '2024-01-20'
    },
    {
      id: '2',
      type: 'photo',
      url: '/api/placeholder/300/400',
      thumbnail: '/api/placeholder/150/200',
      caption: 'Professional headshot',
      isApproved: true,
      uploadedAt: '2024-01-18'
    },
    {
      id: '3',
      type: 'video',
      url: '/api/placeholder/300/400',
      thumbnail: '/api/placeholder/150/200',
      caption: 'Introduction video',
      duration: 120,
      isApproved: true,
      uploadedAt: '2024-01-15'
    }
  ])

  const [videoCalls, setVideoCalls] = useState<VideoCall[]>([
    {
      id: '1',
      fromUserId: 'user1',
      toUserId: 'user2',
      scheduledTime: '2024-01-25T15:00:00Z',
      status: 'scheduled',
      meetingLink: 'https://meet.jitsi.si/nepalimatrimony/123456'
    }
  ])

  const [selectedGift, setSelectedGift] = useState<VirtualGift | null>(null)
  const [giftMessage, setGiftMessage] = useState('')
  const [showGiftDialog, setShowGiftDialog] = useState(false)
  const [showVideoCallDialog, setShowVideoCallDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [newVideoCall, setNewVideoCall] = useState({
    toUserId: '',
    scheduledTime: '',
    isVirtual: true
  })

  const [uploadFile, setUploadFile] = useState({
    type: 'photo',
    file: null,
    caption: ''
  })

  const handleSendGift = async () => {
    if (selectedGift) {
      // Simulate API call
      console.log('Sending gift:', selectedGift, 'with message:', giftMessage)
      setShowGiftDialog(false)
      setSelectedGift(null)
      setGiftMessage('')
    }
  }

  const handleScheduleVideoCall = async () => {
    // Simulate API call
    const newCall: VideoCall = {
      id: Date.now().toString(),
      fromUserId: 'current-user',
      toUserId: newVideoCall.toUserId,
      scheduledTime: newVideoCall.scheduledTime,
      status: 'scheduled',
      meetingLink: `https://meet.jitsi.si/nepalimatrimony/${Date.now()}`
    }
    
    setVideoCalls([...videoCalls, newCall])
    setShowVideoCallDialog(false)
    setNewVideoCall({ toUserId: '', scheduledTime: '', isVirtual: true })
  }

  const handleFileUpload = async () => {
    if (uploadFile.file) {
      setUploadProgress(0)
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      // Simulate upload completion
      setTimeout(() => {
        const newMedia: MediaFile = {
          id: Date.now().toString(),
          type: uploadFile.type as 'photo' | 'video' | 'voice' | 'document',
          url: '/api/placeholder/300/400',
          thumbnail: '/api/placeholder/150/200',
          caption: uploadFile.caption,
          isApproved: false,
          uploadedAt: new Date().toISOString().split('T')[0]
        }
        
        setMediaGallery([newMedia, ...mediaGallery])
        setShowUploadDialog(false)
        setUploadFile({ type: 'photo', file: null, caption: '' })
        setUploadProgress(0)
      }, 2000)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      romantic: 'bg-pink-500',
      fun: 'bg-blue-500',
      traditional: 'bg-yellow-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Camera className="w-8 h-8 mr-3 text-purple-600" />
            Multimedia & Interactive
          </h1>
          <p className="text-gray-600 mt-2">Enhance your profile with photos, videos, and interactive features</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowUploadDialog(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowVideoCallDialog(true)}
          >
            <Video className="w-4 h-4 mr-2" />
            Video Call
          </Button>
        </div>
      </div>

      {/* Media Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Photos</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaGallery.filter(m => m.type === 'photo').length}</div>
            <p className="text-xs text-muted-foreground">Uploaded photos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaGallery.filter(m => m.type === 'video').length}</div>
            <p className="text-xs text-muted-foreground">Uploaded videos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Virtual Gifts</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{virtualGifts.length}</div>
            <p className="text-xs text-muted-foreground">Available gifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoCalls.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled calls</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
          <TabsTrigger value="gifts">Virtual Gifts</TabsTrigger>
          <TabsTrigger value="video-calls">Video Calls</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Media Gallery</h2>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Media" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Media</SelectItem>
                  <SelectItem value="photos">Photos</SelectItem>
                  <SelectItem value="videos">Videos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaGallery.map((media) => (
              <Card key={media.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img 
                    src={media.thumbnail} 
                    alt={media.caption}
                    className="w-full h-48 object-cover"
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="w-12 h-12 rounded-full"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                    </div>
                  )}
                  {media.type === 'video' && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {formatDuration(media.duration || 0)}
                    </div>
                  )}
                  {!media.isApproved && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary">Pending Approval</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-2">{media.caption}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{media.type}</span>
                    <span>{media.uploadedAt}</span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {virtualGifts.map((gift) => (
              <Card key={gift.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedGift(gift)}>
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{gift.icon}</div>
                  <h3 className="font-semibold mb-2">{gift.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{gift.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getCategoryColor(gift.category)}>
                      {gift.category}
                    </Badge>
                    <span className="text-lg font-bold">₹{gift.price}</span>
                  </div>
                  <Button className="w-full" onClick={(e) => { e.stopPropagation(); setSelectedGift(gift); setShowGiftDialog(true); }}>
                    <Gift className="w-4 h-4 mr-2" />
                    Send Gift
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="video-calls" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Video Calls</h2>
            <Button onClick={() => setShowVideoCallDialog(true)}>
              <Video className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>

          <div className="space-y-4">
            {videoCalls.map((call) => (
              <Card key={call.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Video Call</h3>
                        <p className="text-sm text-gray-600">Scheduled for {new Date(call.scheduledTime).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Status: <Badge variant="outline">{call.status}</Badge></p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Join Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {videoCalls.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Video Calls Scheduled</h3>
                  <p className="text-gray-600 mb-4">Schedule your first video call to connect face-to-face</p>
                  <Button onClick={() => setShowVideoCallDialog(true)}>
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Video Call
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <h2 className="text-2xl font-bold">Interactive Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Voice Messages
                </CardTitle>
                <CardDescription>
                  Send voice messages to add a personal touch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Mic className="w-4 h-4 mr-2" />
                    Record Voice Message
                  </Button>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Mic className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Tap to record</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Live Events
                </CardTitle>
                <CardDescription>
                  Join live streaming events and webinars
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-100 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live: Relationship Advice</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">245 viewers</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Join Live Event
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Profile Boost
                </CardTitle>
                <CardDescription>
                  Boost your profile visibility for better matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">2x</div>
                    <p className="text-sm text-gray-600">Profile Visibility</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Boost Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ice Breakers
                </CardTitle>
                <CardDescription>
                  Fun conversation starters to break the ice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    What's your favorite Nepali dish?
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Describe your perfect weekend
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    What makes you smile?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Send Gift Dialog */}
      <Dialog open={showGiftDialog} onOpenChange={setShowGiftDialog}>
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
                <h3 className="font-semibold">{selectedGift.name}</h3>
                <p className="text-sm text-gray-600">{selectedGift.description}</p>
                <p className="text-lg font-bold mt-2">₹{selectedGift.price}</p>
              </div>
              <div>
                <Label htmlFor="giftMessage">Personal Message (Optional)</Label>
                <Textarea
                  id="giftMessage"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add a personal message..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowGiftDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendGift}>
                  <Gift className="w-4 h-4 mr-2" />
                  Send Gift (₹{selectedGift.price})
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Call Dialog */}
      <Dialog open={showVideoCallDialog} onOpenChange={setShowVideoCallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Video Call</DialogTitle>
            <DialogDescription>
              Schedule a video call to connect face-to-face
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="toUserId">User ID</Label>
              <Input
                id="toUserId"
                value={newVideoCall.toUserId}
                onChange={(e) => setNewVideoCall({...newVideoCall, toUserId: e.target.value})}
                placeholder="Enter user ID"
              />
            </div>
            <div>
              <Label htmlFor="scheduledTime">Scheduled Time</Label>
              <Input
                id="scheduledTime"
                type="datetime-local"
                value={newVideoCall.scheduledTime}
                onChange={(e) => setNewVideoCall({...newVideoCall, scheduledTime: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isVirtual"
                checked={newVideoCall.isVirtual}
                onCheckedChange={(checked) => setNewVideoCall({...newVideoCall, isVirtual: checked})}
              />
              <Label htmlFor="isVirtual">Virtual Call</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowVideoCallDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleVideoCall}>
                <Video className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Media Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload photos, videos, or voice messages to your profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mediaType">Media Type</Label>
              <Select value={uploadFile.type} onValueChange={(value) => setUploadFile({...uploadFile, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="voice">Voice Message</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file">Choose File</Label>
              <Input
                id="file"
                type="file"
                accept={uploadFile.type === 'photo' ? 'image/*' : uploadFile.type === 'video' ? 'video/*' : '*'}
                onChange={(e) => setUploadFile({...uploadFile, file: e.target.files?.[0] || null})}
              />
            </div>
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                value={uploadFile.caption}
                onChange={(e) => setUploadFile({...uploadFile, caption: e.target.value})}
                placeholder="Add a caption..."
                rows={3}
              />
            </div>
            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleFileUpload} disabled={!uploadFile.file || uploadProgress > 0}>
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}