import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const forumPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.enum(['relationships', 'wedding_planning', 'cultural', 'advice', 'success_stories', 'general']),
  tags: z.string().optional()
})

const blogPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  category: z.enum(['relationships', 'wedding_tips', 'cultural_traditions', 'advice', 'success_stories']),
  tags: z.string().optional(),
  featuredImage: z.string().optional()
})

const pollSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string()).min(2),
  category: z.enum(['relationships', 'preferences', 'traditions', 'general'])
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    // For demo purposes, we'll use a hardcoded userId
    const userId = "demo-user-id"

    if (type === 'forum-post') {
      const validatedData = forumPostSchema.parse(data)
      
      const forumPost = await db.forumPost.create({
        data: {
          userId,
          ...validatedData,
          views: 0,
          likes: 0,
          isApproved: true
        }
      })

      return NextResponse.json({
        message: 'Forum post created successfully',
        forumPost
      })
    }

    if (type === 'blog-post') {
      const validatedData = blogPostSchema.parse(data)
      
      const blogPost = await db.blogPost.create({
        data: {
          userId,
          ...validatedData,
          views: 0,
          likes: 0,
          isPublished: true,
          publishedAt: new Date()
        }
      })

      return NextResponse.json({
        message: 'Blog post created successfully',
        blogPost
      })
    }

    if (type === 'poll') {
      const validatedData = pollSchema.parse(data)
      
      // In a real implementation, you would have a polls table
      const poll = {
        id: Date.now().toString(),
        userId,
        ...validatedData,
        totalVotes: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        options: validatedData.options.map(option => ({
          text: option,
          votes: 0
        }))
      }

      return NextResponse.json({
        message: 'Poll created successfully',
        poll
      })
    }

    return NextResponse.json(
      { error: 'Invalid type' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Community API error:', error)
    
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
    const category = searchParams.get('category')

    if (type === 'forum-posts') {
      const where: any = { isApproved: true }
      if (category) {
        where.category = category
      }

      const forumPosts = await db.forumPost.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          },
          comments: true,
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json({ forumPosts })
    }

    if (type === 'blog-posts') {
      const where: any = { isPublished: true }
      if (category) {
        where.category = category
      }

      const blogPosts = await db.blogPost.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: {
          publishedAt: 'desc'
        }
      })

      return NextResponse.json({ blogPosts })
    }

    if (type === 'polls') {
      // Simulate poll data
      const polls = [
        {
          id: '1',
          question: 'What is most important in a life partner?',
          options: [
            { text: 'Education', votes: 45 },
            { text: 'Family Values', votes: 78 },
            { text: 'Appearance', votes: 23 },
            { text: 'Career', votes: 34 }
          ],
          totalVotes: 180,
          category: 'preferences',
          isActive: true,
          createdAt: '2024-01-20'
        },
        {
          id: '2',
          question: 'Do you believe in arranged marriages?',
          options: [
            { text: 'Yes, strongly', votes: 89 },
            { text: 'Yes, somewhat', votes: 67 },
            { text: 'No, prefer love marriage', votes: 45 },
            { text: 'Not sure', votes: 12 }
          ],
          totalVotes: 213,
          category: 'traditions',
          isActive: true,
          createdAt: '2024-01-18'
        }
      ]

      return NextResponse.json({ polls })
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Get community data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}