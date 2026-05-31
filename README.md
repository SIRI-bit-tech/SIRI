# SIRITECH - Austere Luxury Portfolio

A production-ready automotive design portfolio built with Next.js 16, featuring a public-facing website and an admin dashboard for content management.

## Features

- **Public Portfolio**: Hero section, featured projects, about page, project detail pages
- **Admin Dashboard**: Secure authentication, CRUD operations for projects, case studies, skills, experience, and messages
- **Responsive Design**: Mobile-first design following the Bugatti austere luxury aesthetic
- **Database**: Prisma ORM with SQLite (development) or PostgreSQL/Neon (production)
- **Authentication**: NextAuth.js with email/password authentication
- **Analytics**: Google Analytics 4 and Microsoft Clarity (production only)
- **Contact Form**: Public contact form with message persistence

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4.2
- **Backend**: Next.js API Routes, Node.js
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Authentication**: NextAuth.js v5 with @auth/prisma-adapter
- **Validation**: Zod, React Hook Form
- **Styling**: Tailwind CSS 4.2 with custom design tokens

## Setup

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Initialize the database:
```bash
DATABASE_URL="file:./prisma/dev.db" pnpm prisma db push
```

4. Seed the database with demo data:
```bash
DATABASE_URL="file:./prisma/dev.db" pnpm prisma db seed
```

### Development

Start the development server:
```bash
DATABASE_URL="file:./prisma/dev.db" pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Default Admin Credentials** (from seed):
- Email: `admin@siritech.com`
- Password: `admin123`

## Deployment

### To Vercel with Neon PostgreSQL

1. Update `DATABASE_URL` in environment to use Neon PostgreSQL
2. Push schema: `pnpm prisma migrate deploy`
3. Deploy: `git push` (Vercel auto-deploys on push)

### Environment Variables (Production)

```
DATABASE_URL=postgresql://...  # Neon PostgreSQL
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generated-secret>
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

## Project Structure

```
/app                 # Next.js app directory
  /api              # API routes (auth, contact, admin CRUD)
  /admin            # Admin dashboard pages
  /projects         # Public project pages
  /contact          # Contact form page
  /about            # About page
  layout.tsx        # Root layout with metadata
  page.tsx          # Home page
  globals.css       # Design system tokens & styles

/components         # React components
  /admin            # Admin-specific components
  analytics-provider.tsx

/lib                # Utilities
  auth.ts           # NextAuth configuration
  prisma.ts         # Prisma client singleton

/prisma             # Database
  schema.prisma     # Prisma schema
  seed.ts           # Database seeding script
  dev.db            # SQLite database (development)
```

## Database Schema

- **User**: NextAuth user accounts
- **Project**: Portfolio projects with descriptions and featured flag
- **CaseStudy**: In-depth case study projects
- **Skill**: Professional skills with proficiency levels
- **Experience**: Work experience and timeline
- **ContactMessage**: Contact form submissions
- **SiteSettings**: Global site configuration

## Design System

The Bugatti austere luxury aesthetic is defined in `/app/globals.css`:

- **Colors**: Pure black canvas (#000000), white type (#FFFFFF), neutral grays
- **Typography**: Uppercase sans-serif for headings (Saira Condensed), serif for body (Garamond), monospace for UI elements
- **Spacing**: Predefined scale from `--spacing-xxs` (4px) to `--spacing-section` (120px)
- **Components**: Custom styled buttons, links, forms following the design language

## API Endpoints

### Public
- `POST /api/contact` - Submit contact form
- `GET /api/admin/projects` - Get all projects (for public display)

### Admin (Protected)
- `GET /api/admin/projects` - List projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Delete project

## Future Enhancements

- Cloudinary image uploads for admin
- GSAP ScrollTrigger animations on public pages
- WebGL skills visualization with Three.js
- Lenis smooth scrolling integration
- Advanced filtering and search on portfolio
- Email notifications for contact submissions
- Analytics dashboard in admin

## License

Copyright © 2026 SIRITECH. All rights reserved.
