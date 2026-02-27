'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Circle,
  Check,
  CheckCheck,
  Smile,
  Mic,
  Image,
  User
} from 'lucide-react'

interface Message {
  id: string
  content: string
  type: 'text' | 'image' | 'voice' | 'video'
  senderId: string
  senderName: string
  senderAvatar?: string
  timestamp: Date
  isRead: boolean
  isOwn: boolean
}

interface Conversation {
  id: string
  userId: string
  name: string
  avatar?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
}

export default function ChatComponent() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      userId: 'user1',
      name: 'Priya Sharma',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Hi! I saw your profile and really liked it',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isOnline: true,
      isTyping: false
    },
    {
      id: '2',
      userId: 'user2',
      name: 'Neha Patel',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Would love to know more about you',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      isOnline: false,
      isTyping: false
    },
    {
      id: '3',
      userId: 'user3',
      name: 'Anjali Gupta',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'That sounds great!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      isOnline: true,
      isTyping: true
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I saw your profile and really liked it',
      type: 'text',
      senderId: 'user1',
      senderName: 'Priya Sharma',
      senderAvatar: '/api/placeholder/40/40',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: true,
      isOwn: false
    },
    {
      id: '2',
      content: 'Thank you! I liked your profile too',
      type: 'text',
      senderId: 'me',
      senderName: 'You',
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
      isRead: true,
      isOwn: true
    },
    {
      id: '3',
      content: 'What do you do for work?',
      type: 'text',
      senderId: 'user1',
      senderName: 'Priya Sharma',
      senderAvatar: '/api/placeholder/40/40',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      isRead: true,
      isOwn: false
    },
    {
      id: '4',
      content: 'I\'m a software engineer at a tech company. What about you?',
      type: 'text',
      senderId: 'me',
      senderName: 'You',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      isRead: true,
      isOwn: true
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        type: 'text',
        senderId: 'me',
        senderName: 'You',
        timestamp: new Date(),
        isRead: false,
        isOwn: true
      }

      setMessages([...messages, message])
      setNewMessage('')

      // Update conversation's last message
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, lastMessage: newMessage, lastMessageTime: new Date() }
          : conv
      ))

      // Simulate reply after 2 seconds
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          content: 'That sounds interesting! Tell me more about it.',
          type: 'text',
          senderId: selectedConversation.userId,
          senderName: selectedConversation.name,
          senderAvatar: selectedConversation.avatar,
          timestamp: new Date(),
          isRead: false,
          isOwn: false
        }
        setMessages(prev => [...prev, reply])
      }, 2000)
    }
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)
    
    if (!isTyping && value.trim()) {
      setIsTyping(true)
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatLastMessageTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-3">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b ${
                selectedConversation?.id === conversation.id ? 'bg-pink-50' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>
                    {conversation.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {conversation.isOnline && (
                  <Circle className="absolute bottom-0 right-0 w-3 h-3 text-green-500 fill-current" />
                )}
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium truncate">{conversation.name}</h4>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatLastMessageTime(conversation.lastMessageTime)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.isTyping ? (
                      <span className="text-pink-600 italic">typing...</span>
                    ) : (
                      conversation.lastMessage
                    )}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <Badge className="ml-2 bg-pink-600 text-white text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>
                    {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h4 className="font-medium">{selectedConversation.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedConversation.isTyping ? (
                      <span className="text-pink-600 italic">typing...</span>
                    ) : (
                      selectedConversation.isOnline ? 'Online' : 'Offline'
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isOwn && (
                    <Avatar className="w-8 h-8 mr-2 mt-1">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback>
                        {message.senderName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-1' : ''}`}>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.type === 'text' && (
                        <p className="text-sm">{message.content}</p>
                      )}
                      {message.type === 'image' && (
                        <img src={message.content} alt="Shared image" className="rounded-lg" />
                      )}
                    </div>
                    
                    <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                      message.isOwn ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.isOwn && (
                        <span className="ml-2">
                          {message.isRead ? (
                            <CheckCheck className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            {isTyping && (
              <div className="mb-2 text-sm text-gray-500 italic">
                You are typing...
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Image className="w-4 h-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-10"
                />
                <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Mic className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-pink-600 to-purple-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}