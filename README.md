# 💕 NepaliMatrimony - Nepal's Premier Matrimony Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-6.19-black" alt="Prisma" />
  <img src="https://img.shields.io/badge/SQLite-3.0-003B57" alt="SQLite" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</div>

## 🌟 About NepaliMatrimony

NepaliMatrimony is a comprehensive, modern matrimony platform specifically designed for Nepal's diverse communities. Combining AI-powered matchmaking, verified profiles, and a user-friendly interface, NepaliMatrimony revolutionizes the way Nepali singles connect for meaningful relationships and marriages.

## ✨ Key Features

### 🔐 **User Authentication & Security**
- Secure registration with email, phone, and social login options
- JWT-based authentication with password hashing
- Two-factor authentication support
- Profile verification with document upload
- Advanced privacy controls

### 👤 **Comprehensive Profile Management**
- **Basic Information**: Personal details, photos, about me section
- **Location Details**: Country, state, city, relocation preferences
- **Education & Career**: Academic background, professional details, income
- **Family Information**: Family type, values, member details
- **Partner Preferences**: Detailed preferences for ideal match
- **Photo Management**: Multiple photos with privacy controls
- **Profile Strength Meter**: Real-time profile completion tracking

### 🔍 **Advanced Search & AI Matchmaking**
- Multi-parameter search with advanced filters
- AI-powered compatibility scoring system
- Match factors breakdown (lifestyle, values, interests, family, career, location)
- Personalized daily recommendations
- Geo-based matching for nearby profiles

### 💬 **Communication Features**
- Real-time chat interface with conversation management
- Message status indicators (sent, delivered, read)
- Typing indicators and online status
- Support for text, image, voice, and video messages
- Interest request system with accept/decline options

### 👑 **Premium Membership System**
- **Basic Plan** (₹999/month): 10 profile views/day, basic search, 5 interests/month
- **Gold Plan** (₹2,999/month): Unlimited views, advanced search, video calling, contact access
- **Platinum Plan** (₹5,999/month): All Gold features + AI matchmaking, background verification, personal manager

### 🤖 **AI & Smart Features**
- Intelligent compatibility analysis
- Personality-based matching algorithms
- Match insights and recommendations
- Behavioral pattern analysis
- Automated profile suggestions

### 🛡️ **Safety & Security**
- Profile verification badges
- Report and block functionality
- End-to-end encryption for messages
- Fraud detection system
- Emergency contact features

### 💰 **Monetization Features**
- Tiered subscription plans
- In-app purchases for virtual gifts
- Profile boost options
- Featured profile placements
- Payment gateway integration

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **State Management**: React Hooks, Zustand
- **UI Components**: Complete shadcn/ui component library
- **Icons**: Lucide React

### Backend Stack
- **API**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Validation**: Zod schema validation
- **File Upload**: Multer support structure

### Database Schema
- 25+ comprehensive models covering all aspects
- User management and profiles
- Photos, videos, and multimedia
- Messages and communications
- Subscriptions and payments
- Interests and connections
- Admin and analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Bun or npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/matrimony.git
   cd matrimony
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   bun run db:push
   bun run db:generate
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
matrimony/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── search/        # Search functionality
│   │   │   ├── messages/      # Chat system
│   │   │   ├── profile/       # Profile management
│   │   │   └── subscription/  # Payment system
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── AIMatchmaking.tsx # AI matching system
│   │   ├── ChatComponent.tsx # Chat interface
│   │   └── ProfileManagement.tsx # Profile editor
│   ├── lib/                  # Utility libraries
│   │   ├── db.ts            # Database client
│   │   └── utils.ts         # Helper functions
│   └── hooks/                # Custom React hooks
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── README.md
```

## 🎯 Core Features in Detail

### 1. User Registration & Onboarding
- Multi-step registration process
- Email and phone verification
- Social media integration
- Immediate profile creation
- Welcome tutorials

### 2. Profile Creation Wizard
- Guided profile completion
- Photo upload with approval system
- Privacy settings configuration
- Partner preference setup
- Profile strength tracking

### 3. Advanced Search System
- 20+ search filters
- Saved search preferences
- Search result sorting
- Quick match suggestions
- Location-based search

### 4. AI Matchmaking Engine
- Machine learning compatibility scoring
- Behavioral analysis
- Interest matching
- Value alignment detection
- Continuous learning algorithm

### 5. Communication Hub
- Real-time messaging
- Voice and video calling
- Virtual gifting system
- Interest management
- Conversation starters

### 6. Premium Features
- Unlimited messaging
- Advanced search filters
- Contact information access
- Profile visibility boost
- Priority customer support

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Profile Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/photo` - Upload photo

### Search & Matching
- `GET /api/search` - Search profiles
- `GET /api/matches` - Get AI matches
- `POST /api/matches/analyze` - Run AI analysis

### Communication
- `GET /api/messages` - Get conversations
- `POST /api/messages` - Send message
- `GET /api/interests` - Get interests
- `POST /api/interests` - Send interest

### Payments
- `GET /api/subscription` - Get plans
- `POST /api/subscription` - Create subscription
- `GET /api/payments` - Payment history

## 🎨 UI/UX Design

### Design Principles
- **Mobile-First**: Responsive design for all devices
- **Accessibility**: WCAG 2.1 compliant
- **Performance**: Optimized for fast loading
- **Intuitive**: User-friendly interface
- **Modern**: Contemporary design trends

### Color Scheme
- **Primary**: Pink to Purple gradient
- **Secondary**: Soft grays and whites
- **Accent**: Gold for premium features
- **Success**: Green for verified elements
- **Warning**: Yellow for important notifications

### Components
- 30+ reusable UI components
- Consistent design system
- Dark mode support
- Smooth animations and transitions

## 🔒 Security Features

### Authentication & Authorization
- JWT token-based authentication
- Role-based access control
- Session management
- Password strength requirements
- Account lockout protection

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure file upload handling

### Privacy Controls
- Granular privacy settings
- Data encryption
- Anonymous browsing option
- Data deletion requests
- GDPR compliance

## 📊 Analytics & Monitoring

### User Analytics
- Profile completion rates
- Search behavior tracking
- Message engagement metrics
- Subscription conversion rates
- User retention analysis

### Performance Monitoring
- Page load times
- API response times
- Error tracking
- Database query optimization
- Resource usage monitoring

## 🚀 Deployment

### Environment Setup
```bash
# Production build
bun run build

# Start production server
bun run start
```

### Environment Variables
```env
NODE_ENV=production
DATABASE_URL=production-database-url
JWT_SECRET=production-jwt-secret
NEXTAUTH_URL=https://yourdomain.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]
```

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
bun run test

# Run integration tests
bun run test:integration

# Run E2E tests
bun run test:e2e

# Test coverage
bun run test:coverage
```

## 📈 Performance Optimization

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization
- Bundle size reduction
- Caching strategies
- Service worker implementation

### Backend Optimization
- Database indexing
- Query optimization
- API response caching
- Connection pooling
- Load balancing

## 🔄 Continuous Integration/Deployment

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: bun install
      - name: Build
        run: bun run build
      - name: Deploy
        run: # Deploy commands
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Write tests for new features
- Update documentation
- Ensure code quality with ESLint

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

### Documentation
- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)

### Contact
- Email: support@nepalimatrimony.com
- Website: [nepalimatrimony.com](https://nepalimatrimony.com)
- Issues: [GitHub Issues](https://github.com/jitenkr2030/matrimony/issues)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ User authentication
- ✅ Profile management
- ✅ Basic search and matching
- ✅ Messaging system

### Phase 2 (Upcoming)
- 🔄 Mobile applications (iOS/Android)
- 🔄 Advanced AI features
- 🔄 Video calling integration
- 🔄 Background verification
- 🔄 Wedding planning services

### Phase 3 (Future)
- 📋 Astrology matching
- 📋 Event management
- 📋 Community features
- 📋 Multi-language support
- 📋 International expansion

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://www.prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide](https://lucide.dev/) - Icon library

---

<div align="center">
  <p>Made with ❤️ for Nepali couples</p>
  <p>© 2024 NepaliMatrimony. All rights reserved.</p>
</div>