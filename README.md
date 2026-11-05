# TogetherWeCare — Social Development Events Platform

TogetherWeCare is a modern, responsive web application designed to connect individuals, volunteers, and organizers with local community service events and social development initiatives. Whether participating in neighborhood cleanups, tree plantation campaigns, donation drives, educational workshops, or healthcare camps, TogetherWeCare empowers communities through collaborative action.

---

## Live Website

**Live Site:** Pending Deployment

---

## Key Features

- **User Authentication**: Secure email/password registration and login with strict validation (minimum 6 characters, uppercase, and lowercase requirements) alongside one-click GitHub OAuth integration via Better Auth.
- **Create and Manage Events**: Authenticated organizers can publish new community initiatives with future date validation, real-time image previews, and structured category tagging. Creators have dedicated controls to update event details or delete their initiatives with confirmation dialogs.
- **Search and Filter Discovery**: Public exploration of upcoming initiatives featuring debounced text search (title, description, location), category filtering (Cleanup, Plantation, Donation, Education, Healthcare, Other), and chronological sorting (nearest upcoming first).
- **Participation & Joined Events Tracking**: Logged-in volunteers can join events with duplicate prevention and maintain a chronological dashboard of their registered initiatives.
- **Responsive Light and Dark Themes**: System-wide theme switching powered by `next-themes` with custom color tokens (Forest Green, Warm Cream, Deep Charcoal) and zero layout flashing.
- **Protected Routes & JWT Security**: Server-side route protection (`requireAuth`) for private dashboards (`/create-event`, `/manage-events`, `/joined-events`, `/profile`) and cryptographically signed JWT authorization headers sent to backend endpoints.
- **Profile Management**: Live profile editing enabling volunteers to update display names and avatar image URLs with instant navbar and session synchronization.
- **Loading Skeletons & Resilient States**: Content-shaped animated skeletons on all views to eliminate layout shift, alongside friendly error states with retry capabilities and accessible empty states.

---

## Technologies Used

- **Next.js 16 (App Router & Turbopack)**: Modern React framework providing server components, route guards, dynamic metadata, and static optimization.
- **React 19**: Modern concurrent UI library powering reactive component state.
- **TypeScript**: Strict type definitions across all entities, API responses, and form schemas.
- **Tailwind CSS v4 & tw-animate-css**: Utility-first CSS styling using custom theme tokens and responsive layouts.
- **shadcn/ui & Base UI**: Accessible UI component primitives (Dialogs, Alert Dialogs, Dropdown Menus, Tooltips, Sheets, Badges, Cards, Skeletons).
- **Better Auth & MongoDB Adapter**: Enterprise authentication supporting email/password credential validation, MongoDB session persistence, and social OAuth.
- **JWT (JSON Web Tokens)**: Cryptographically signed tokens verified through Better Auth JWKS for secure backend communication.
- **Express.js API Integration**: RESTful service integration layer with Bearer token authentication.
- **React Hook Form & Zod**: Performant, declarative form state management and strict client-side schema validation.
- **Sonner**: Toast notification system for non-intrusive feedback.
- **Lucide React**: Clean, modern iconography across all components and actions.

---

## Installation Instructions

Follow these steps to run the TogetherWeCare client application locally:

### 1. Clone the repository
```bash
git clone https://github.com/iRfANhAiDeRABiR/b14-A-008-client.git
cd b14-A-008-client
```

### 2. Navigate to the client folder (if nested)
```bash
cd client
```

### 3. Install project dependencies
```bash
npm install
```

### 4. Configure environment variables
Create a `.env.local` file in the root of the client directory using the template below:
```bash
cp .env.example .env.local
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

---

## Environment Variables

Configure the following variables in `.env.local`:

```env
# Database (Server-side only — Keep Private)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
DB_NAME=together_we_care

# Better Auth Configuration (Server-side only — Keep Private)
BETTER_AUTH_SECRET=your_32_character_random_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth Credentials (Server-side only — Keep Private)
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

# Express Backend REST API (Public Browser Endpoint)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> **Security Note:** `MONGODB_URI`, `BETTER_AUTH_SECRET`, and `GITHUB_CLIENT_SECRET` must remain strictly private and should never be committed to Git. Variables prefixed with `NEXT_PUBLIC_` are exposed to client-side browser bundles.

---

## Project Structure

```
client/
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router pages and route handlers
│   │   ├── api/auth/       # Better Auth API catch-all handler route
│   │   ├── create-event/   # Protected event creation page
│   │   ├── events/[id]/    # Public dynamic event details page
│   │   ├── joined-events/  # Protected volunteer participation dashboard
│   │   ├── login/          # Email and GitHub login page
│   │   ├── manage-events/  # Protected organizer management dashboard
│   │   ├── profile/        # Protected user profile page
│   │   ├── register/       # User registration page
│   │   ├── upcoming-events/# Public searchable event discovery page
│   │   ├── globals.css     # Tailwind CSS variables and base tokens
│   │   ├── layout.tsx      # Root layout with fonts, theme provider & toaster
│   │   └── page.tsx        # Homepage (Hero, Features, Impact, Recent Events, Gallery, Newsletter)
│   ├── components/         # Reusable UI components
│   │   ├── auth/           # Login, registration, and profile update forms
│   │   ├── events/         # Event cards, management cards, and edit/delete dialogs
│   │   ├── home/           # Homepage sections (Hero, Features, Gallery, Newsletter, Recent)
│   │   ├── layout/         # Responsive Navbar and Footer
│   │   ├── shared/         # Skeletons, empty states, container, section wrappers
│   │   └── ui/             # shadcn/ui & Base UI primitives
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API client, Better Auth config, MongoDB connection, JWT utilities
│   ├── providers/          # Theme provider wrapping next-themes
│   └── types/              # TypeScript interfaces (Event, Organizer, Pagination, Auth)
├── .env.example            # Environment variables template
├── .gitignore              # Files and directories ignored by Git
├── next.config.ts          # Next.js configuration (images, Turbopack)
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## Authentication Information

Authentication is implemented using **Better Auth** with the official `@better-auth/mongo-adapter`:
- **Email & Password**: Authenticates against MongoDB with encrypted password hashing. Password requirements enforce at least 6 characters with uppercase and lowercase letters.
- **GitHub OAuth**: Social login configured using GitHub Developer applications. When deployed to production, update the GitHub OAuth callback URL to: `https://<your-vercel-domain>/api/auth/callback/github`.
- **JWT Plugin**: Better Auth issues cryptographically verifiable JWTs via the `jwt()` plugin. Client components request tokens via `getTokenFromClient()` and pass them as Bearer tokens to the Express API.
- **Session Management**: Supported across server components (`requireAuth`, `getServerSession`) and reactive client components (`useSession`).

---

## Deployment to Vercel

The TogetherWeCare frontend is pre-configured for deployment on the Vercel platform:

1. **Push to GitHub**: Ensure all code changes are pushed to your GitHub client repository.
2. **Log in to Vercel**: Open [Vercel](https://vercel.com) and click **Add New > Project**.
3. **Import Repository**: Select your `b14-A-008-client` repository.
4. **Set Root Directory**: If the repository root contains the client in a subdirectory, set **Root Directory** to `client`.
5. **Configure Environment Variables**: Add the production values in the Vercel dashboard:
   - `MONGODB_URI`
   - `DB_NAME`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (set to your Vercel deployment URL, e.g. `https://your-app.vercel.app`)
   - `NEXT_PUBLIC_BETTER_AUTH_URL` (set to your Vercel deployment URL)
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `NEXT_PUBLIC_API_URL` (set to your deployed Express backend URL, e.g. `https://your-api.onrender.com` or Vercel server URL)
6. **Deploy**: Click **Deploy**. Vercel will run `npm run build` and launch the optimized production application.
7. **Configure Production Callbacks**: Update your GitHub OAuth application's **Authorization callback URL** to match your deployed Vercel domain (`https://your-app.vercel.app/api/auth/callback/github`).
