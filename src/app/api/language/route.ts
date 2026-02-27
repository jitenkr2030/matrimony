import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Multi-language and cultural customization
    const languages = [
      {
        id: 'en',
        name: 'English',
        nativeName: 'English',
        code: 'en',
        rtl: false
      },
      {
        id: 'ne',
        name: 'Nepali',
        nativeName: 'नेपाली',
        code: 'ne',
        rtl: false
      },
      {
        id: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        code: 'hi',
        rtl: false
      },
      {
        id: 'maithili',
        name: 'Maithili',
        nativeName: 'मैथिली',
        code: 'mai',
        rtl: false
      },
      {
        id: 'newari',
        name: 'Newari',
        nativeName: 'नेवारी',
        code: 'new',
        rtl: false
      },
      {
        id: 'bhojpuri',
        name: 'Bhojpuri',
        nativeName: 'भोजपुरी',
        code: 'bho',
        rtl: false
      },
      {
        id: 'tamil',
        name: 'Tamil',
        nativeName: 'தமிழ்',
        code: 'ta',
        rtl: false
      },
      {
        id: 'telugu',
        name: 'Telugu',
        nativeName: 'తెలుగు',
        code: 'te',
        rtl: false
      },
      {
        id: 'bengali',
        name: 'Bengali',
        nativeName: 'বাংলা',
        code: 'bn',
        rtl: false
      },
      {
        id: 'punjabi',
        name: 'Punjabi',
        nativeName: 'ਪੰਜਾਬੀ',
        code: 'pa',
        rtl: false
      },
      {
        id: 'gujarati',
        name: 'Gujarati',
        nativeName: 'ગુજરાતી',
        code: 'gu',
        rtl: false
      },
      {
        id: 'marathi',
        name: 'Marathi',
        nativeName: 'मराठी',
        code: 'mr',
        rtl: false
      },
      {
        id: 'malayalam',
        name: 'Malayalam',
        nativeName: 'മലയാളം',
        code: 'ml',
        rtl: false
      },
      {
        id: 'kannada',
        name: 'Kannada',
        nativeName: 'ಕನ್ನಡ',
        code: 'kn',
        rtl: false
      },
      {
        id: 'urdu',
        name: 'Urdu',
        nativeName: 'اردو',
        code: 'ur',
        rtl: true
      },
      {
        id: 'arabic',
        name: 'Arabic',
        nativeName: 'العربية',
        code: 'ar',
        rtl: true
      }
    ]

    const culturalPreferences = [
      {
        id: 'traditional',
        name: 'Traditional',
        description: 'Follows traditional customs and values',
        practices: ['Arranged marriage preference', 'Family involvement', 'Traditional ceremonies']
      },
      {
        id: 'modern',
        name: 'Modern',
        description: 'Open to modern approaches while respecting culture',
        practices: ['Love marriage accepted', 'Individual choice', 'Modern ceremonies']
      },
      {
        id: 'balanced',
        name: 'Balanced',
        description: 'Mix of traditional and modern values',
        practices: ['Family approval with individual choice', 'Hybrid ceremonies', 'Cultural adaptation']
      }
    ]

    const religiousPreferences = [
      {
        id: 'hindu',
        name: 'Hindu',
        description: 'Hindu religious practices and traditions',
        ceremonies: ['Engagement (Sagai)', 'Wedding (Vivaha)', 'Reception']
      },
      {
        id: 'buddhist',
        name: 'Buddhist',
        description: 'Buddhist religious practices and traditions',
        ceremonies: ['Blessing ceremony', 'Wedding vows', 'Celebration']
      },
      {
        id: 'muslim',
        name: 'Muslim',
        description: 'Muslim religious practices and traditions',
        ceremonies: ['Nikah', 'Walima', 'Reception']
      },
      {
        id: 'christian',
        name: 'Christian',
        description: 'Christian religious practices and traditions',
        ceremonies: ['Church wedding', 'Reception', 'Blessing']
      },
      {
        id: 'sikh',
        name: 'Sikh',
        description: 'Sikh religious practices and traditions',
        ceremonies: ['Anand Karaj', 'Lavan', 'Reception']
      },
      {
        id: 'jain',
        name: 'Jain',
        description: 'Jain religious practices and traditions',
        ceremonies: ['Jain wedding ceremony', 'Blessing', 'Celebration']
      },
      {
        id: 'other',
        name: 'Other',
        description: 'Other religious or spiritual practices',
        ceremonies: ['Custom ceremony', 'Blessing', 'Celebration']
      }
    ]

    return NextResponse.json({
      languages,
      culturalPreferences,
      religiousPreferences
    })

  } catch (error) {
    console.error('Language API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}