# FitPulse

FitPulse is a full-stack fitness platform where users can discover, book, and manage fitness classes. It supports three roles: **Member**, **Trainer**, and **Admin** — each with tailored dashboards and capabilities.

## Live URL

[FitPulse Live](https://fit-pulse-gym.vercel.app)

## Key Features

- Role-based authentication (Member, Trainer, Admin) with Better Auth
- Google OAuth login
- Browse and search fitness classes with server-side filtering
- Book classes via Stripe payment integration
- Add classes to favorites
- Community forum with comments, likes, and dislikes
- Trainer applications with admin approval/rejection workflow
- Admin dashboard for managing users, trainers, classes, and forum posts
- Server-side pagination on classes and forum pages
- Responsive design with dark theme
- Framer Motion animations throughout

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **Backend:** Express.js, MongoDB
- **Authentication:** Better Auth
- **Payments:** Stripe
- **Image Upload:** ImgBB

## npm Packages

### Client
- `next` - React framework
- `react`, `react-dom` - UI library
- `better-auth` - Authentication
- `framer-motion` - Animations
- `lucide-react` - Icons
- `stripe`, `@stripe/stripe-js` - Payments
- `react-hook-form` - Form handling
- `react-hot-toast` - Notifications
- `mongodb` - Database driver

### Server
- `express` - Web framework
- `mongodb` - Database driver
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `jose`, `jose-cjs` - JWT verification
- `stripe` - Payment processing

## Environment Variables

### Client (.env)
- `NEXT_PUBLIC_API_URL` - Backend server URL
- `BETTER_AUTH_URL` - App URL for auth
- `BETTER_AUTH_SECRET` - Auth secret
- `MONGO_DB_URI` - MongoDB connection string
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_IMGBB_API_KEY` - ImgBB API key

### Server (.env)
- `PORT` - Server port
- `MONGO_DB_URI` - MongoDB connection string
- `CLIENT_URL` - Client app URL
- `STRIPE_SECRET_KEY` - Stripe secret key

## Setup

```bash
# Install server dependencies
cd fitpulse-server
npm install

# Install client dependencies
cd fitpulse
npm install

# Start server
cd fitpulse-server
npm start

# Start client
cd fitpulse
npm run dev
```
