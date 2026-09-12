# FitPulse

A modern full-stack fitness and gym management web platform for discovering, scheduling, and booking fitness classes, managing trainer workflows, and engaging through an athletic community forum. Supports role-based access for **Members**, **Trainers**, and **Admins**.

## Live Deployment

- **Live Application:** [https://fitpulse-gym-management.vercel.app/](https://fitpulse-gym-management.vercel.app/)
- **Admin Email:** `admin@gmail.com`
- **Admin Password:** `Admin123`
- **Client Repository:** [https://github.com/mahmudulhasanzb/FitPulse.git](https://github.com/mahmudulhasanzb/FitPulse.git)
- **Server Repository:** [https://github.com/mahmudulhasanzb/FitPulse-Server.git](https://github.com/mahmudulhasanzb/FitPulse-Server.git)

---

## Core Features

### Authentication & Authorization
- Role-based access control (**Member**, **Trainer**, **Admin**) powered by Better Auth.
- Credentials and Google OAuth authentication with JWT/JWKS token verification across Next.js and Express.
- Role-gated route middleware protecting user dashboards and administrative controls.

### Class Exploration & Booking
- Class catalog with debounced keyword search, category pills, and server-side pagination.
- Tiered slot selection and checkout via Stripe Payment Gateway.
- Member class booking history and personal favorite classes management.

### Trainer Management & Applications
- Trainer directory showcasing verified coaches, specialties, years of experience, and available slots.
- Member-to-trainer application workflow with experience, skill set, and bio submissions.
- Admin application review interface for approving or rejecting trainer candidates.

### Community Forum & Discussion
- MongoDB-powered server-side search by title, description, and author.
- Category classification filters (`TRAINING`, `NUTRITION`, `RECOVERY`, `MINDSET`).
- Dynamic sorting options:
  - **Latest** (`createdAt: -1`)
  - **Oldest** (`createdAt: 1`)
  - **Popular** (MongoDB `$addFields` + `$size` aggregation on likes).
- Interactive details view with synchronized real comment counts and likes.
- Community commenting system displaying user profile avatars with initial letter fallbacks.

### AI Fitness Assistant
- Integrated AI assistant powered by Google Gemini via Vercel AI SDK (`@ai-sdk/google`).
- Context-aware fitness recommendations, workout guidance, and recovery tips.

### Administrative Controls
- Administrative management tables for user role assignments and account status toggling.
- Trainer slot management, new class publication, and forum post moderation.
- Newsletter subscriber management and transaction records auditing.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend Library:** React 19
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Express 5 (Single-file REST API)
- **Database:** MongoDB Native Driver
- **Authentication:** Better Auth with MongoDB Adapter & Remote JWKS Bridge
- **Payments:** Stripe
- **AI Integration:** Google Gemini (`@ai-sdk/google`, `ai`)
- **Notifications:** React Hot Toast
- **Email Dispatch:** Resend

---

## Dependencies

### Client (`fitpulse`)
- `next`: `^16.2.9`
- `react`: `19.2.4`
- `react-dom`: `19.2.4`
- `better-auth`: `^1.6.19`
- `@better-auth/mongo-adapter`: `^1.6.19`
- `@ai-sdk/google`: `^4.0.65`
- `ai`: `^7.0.95`
- `framer-motion`: `^12.40.0`
- `lucide-react`: `^1.20.0`
- `stripe` & `@stripe/stripe-js`: `^22.2.3` / `^9.8.0`
- `react-hook-form`: `^7.80.0`
- `react-hot-toast`: `^2.6.0`
- `mongodb`: `^7.3.0`
- `jose-cjs`: `^6.2.3`
- `resend`: `^6.27.0`
- `tailwindcss`: `^4`

### Server (`fitpulse-server`)
- `express`: `^5.x`
- `mongodb`: `^7.x`
- `cors`: `^2.8.5`
- `dotenv`: `^16.x`
- `jose-cjs`: `^6.x`
- `stripe`: Payment intent creation and verification

---

## Environment Configuration

### Client (`fitpulse/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret
MONGO_DB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

### Server (`fitpulse-server/.env`)
```env
PORT=8000
MONGO_DB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Local Development

```bash
# Clone repositories
git clone https://github.com/mahmudulhasanzb/FitPulse.git
git clone https://github.com/mahmudulhasanzb/FitPulse-Server.git

# Server setup
cd FitPulse-Server
npm install
npm run dev

# Client setup
cd ../FitPulse
npm install
npm run dev
```

Client runs on `http://localhost:3000`, Server runs on `http://localhost:8000`.

---

## Author

Designed and developed independently by **Mahmudul Hasan**.

- **GitHub:** [@mahmudulhasanzb](https://github.com/mahmudulhasanzb)
- **Live Project:** [FitPulse](https://fitpulse-gym-management.vercel.app/)
