# 🌱 TogetherWeCare
### Small Actions. Stronger Communities.

<div align="center">

  <img src="https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Better_Auth-Authentication-purple?style=for-the-badge" alt="Better Auth" />

  <br />
  <br />

  **A Community-Driven Social Development & Volunteer Management Platform**

  Discover meaningful community initiatives, connect with passionate volunteers, and take part in activities that make a real difference.

  <br />

  <a href="https://b14-a-008-client.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_LIVE_WEBSITE-Visit_Now-16A34A?style=for-the-badge" alt="Live Website" />
  </a>

  <a href="https://github.com/iRfANhAiDeRABiR/b14-A-008-client">
    <img src="https://img.shields.io/badge/GitHub-Client_Repository-181717?style=for-the-badge&logo=github" alt="Client Repository" />
  </a>

  <a href="https://github.com/iRfANhAiDeRABiR/b14-A-008-server">
    <img src="https://img.shields.io/badge/GitHub-Server_Repository-181717?style=for-the-badge&logo=github" alt="Server Repository" />
  </a>

</div>

---

## 🌍 About the Project

**TogetherWeCare** is a modern, responsive community service platform designed to bring people together through meaningful social development initiatives.

The platform connects volunteers, event organizers, and community members, making it easier to discover, organize, and participate in local social service activities.

From winter clothing distributions and donation campaigns to tree plantations, neighborhood cleanups, educational programs, and healthcare initiatives, TogetherWeCare encourages people to create positive change through collective action.

Our mission is simple:

> **Small Actions. Stronger Communities. A Better Tomorrow.**

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 Secure Authentication | Register and log in using email/password or GitHub authentication. |
| 📅 Create Events | Organize community service events with descriptions, categories, images, locations, and future dates. |
| 🔎 Discover Events | Explore upcoming community initiatives with search, category filters, and sorting. |
| 🤝 Join Events | Participate in community activities with duplicate-joining prevention. |
| 📋 Manage Events | View, update, and delete events created by the authenticated user. |
| ❤️ Joined Events | Track all joined activities and participation history. |
| 👤 Profile Management | Update personal display name and profile picture. |
| 🌗 Theme Customization | Switch between modern light and dark themes. |
| 📱 Responsive Design | Optimized layouts for mobile, tablet, and desktop devices. |
| ⚡ Loading Skeletons | Smooth loading experiences and user-friendly empty and error states. |

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework with App Router |
| React 19 | User interface development |
| TypeScript | Type-safe development |
| Tailwind CSS v4 | Responsive styling |
| shadcn/ui | Reusable UI components |
| Base UI | Accessible interface primitives |
| Lucide React | Modern icons |
| next-themes | Light and dark theme management |

### Authentication & Database

| Technology | Purpose |
|---|---|
| Better Auth | Authentication and session management |
| MongoDB Adapter | Authentication data persistence |
| MongoDB | Database |
| JWT | Secure API authentication |
| GitHub OAuth | Social authentication |
| Zod | Form and data validation |
| React Hook Form | Form management |

### API Integration & Utilities

- Express.js REST API
- jose for JWT verification
- Sonner for toast notifications
- date-fns for date management
- Embla Carousel for carousel functionality

---

## 📸 Platform Modules

### 1. Home Page
- Community-focused hero section.
- Platform features.
- Community impact highlights.
- Recent upcoming events.
- Community service gallery.
- Newsletter subscription section.

### 2. Authentication
- User registration.
- Email and password login.
- GitHub social login.
- Protected routes.
- User session management.

### 3. Upcoming Events
- Browse community events.
- Search by title, description, and location.
- Filter by event category.
- Sort events by date.
- View detailed event information.

### 4. Create & Manage Events
- Create new community initiatives.
- Validate event information.
- Restrict event dates to future dates.
- Update existing events.
- Delete personal events.

### 5. Event Participation
- Join upcoming events.
- Prevent duplicate participation.
- Check participation status.
- View joined events.

### 6. User Profile
- View personal profile.
- Update display name.
- Update profile picture.

---

## 📂 Project Structure

```text
b14-A-008-client/
│
├── public/
│   └── Static assets and images
│
├── src/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── create-event/
│   │   ├── events/
│   │   │   └── [id]/
│   │   ├── joined-events/
│   │   ├── login/
│   │   ├── manage-events/
│   │   ├── profile/
│   │   ├── register/
│   │   ├── upcoming-events/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ui/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   └── types/
│
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js 20.9 or newer
- npm
- Git
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/iRfANhAiDeRABiR/b14-A-008-client.git
```

### 2. Navigate to the Project

```bash
cd b14-A-008-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

Copy the example configuration:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env.local
```

**macOS / Linux:**

```bash
cp .env.example .env.local
```

Add your actual configuration values to `.env.local`.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit:

http://localhost:3000

---

## 🔑 Environment Variables

Configure the following variables inside `.env.local`.

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DB_NAME` | MongoDB database name |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth |
| `BETTER_AUTH_URL` | Better Auth server URL |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Public authentication URL |
| `GITHUB_CLIENT_ID` | GitHub OAuth application ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth application secret |
| `NEXT_PUBLIC_API_URL` | Express backend API URL |

### Example Configuration

```env
MONGODB_URI=your_mongodb_connection_string
DB_NAME=together_we_care

BETTER_AUTH_SECRET=your_secure_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Security Notice:**

- Never upload `.env.local` to GitHub.
- Never expose `BETTER_AUTH_SECRET`.
- Never expose `GITHUB_CLIENT_SECRET`.
- Never expose MongoDB credentials.
- Variables prefixed with `NEXT_PUBLIC_` are accessible in the browser.

---

## 🔐 Authentication & Security

TogetherWeCare uses Better Auth for secure authentication and session management.

Authentication features include:

- Email and password registration.
- Secure password hashing.
- GitHub OAuth authentication.
- JWT-based API authorization.
- Protected dashboard routes.
- Authenticated user profile management.

### JWT Authentication Flow

1. A user logs in through Better Auth.
2. Better Auth establishes the authenticated session.
3. The frontend obtains a JWT through the configured JWT plugin.
4. The JWT is sent to the Express backend using the Authorization header.
5. The backend verifies the token using the published JWKS public keys.
6. Authorized requests can access protected resources.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔗 Related Repository

The TogetherWeCare backend is maintained separately.

**Server Repository:**

https://github.com/iRfANhAiDeRABiR/b14-A-008-server

The Express.js backend handles:

- Event creation and management.
- Upcoming event retrieval.
- Event participation.
- Joined-event tracking.
- JWT verification.
- Server-side validation.
- MongoDB database operations.

---

## 🌐 Deployment

The frontend is deployed using **Vercel**.

### Deploy Your Own Version

1. Open [Vercel](https://vercel.com/).
2. Select **Add New → Project**.
3. Import the `b14-A-008-client` GitHub repository.
4. Keep the Root Directory as the repository root.
5. Select Next.js as the framework if not detected automatically.
6. Configure the environment variables.
7. Add your production Express API URL to `NEXT_PUBLIC_API_URL`.
8. Click **Deploy**.

### Production Environment Configuration

Update:

```env
BETTER_AUTH_URL=https://b14-a-008-client.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://b14-a-008-client.vercel.app

NEXT_PUBLIC_API_URL=https://your-deployed-backend-url
```

Also configure your GitHub OAuth callback URL:

```text
https://b14-a-008-client.vercel.app/api/auth/callback/github
```

Make sure the backend CORS configuration allows the deployed frontend origin.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript errors |

---

## 🎯 Project Goals

TogetherWeCare aims to:

- Encourage community participation.
- Make volunteering opportunities easier to discover.
- Connect organizers with volunteers.
- Support local social development initiatives.
- Promote environmental awareness and social responsibility.
- Build stronger and more connected communities.

---

## 💚 Our Philosophy

> "Alone we can do so little; together we can do so much."

Every small contribution matters. Together, we can turn meaningful ideas into positive community impact.

---

<div align="center">

### 🌱 TogetherWeCare

**Small Actions. Stronger Communities.**

Made with ❤️ for a better community.

<br />

<a href="https://b14-a-008-client.vercel.app/">
  Visit TogetherWeCare
</a>

<br />
<br />

© 2026 TogetherWeCare. All Rights Reserved.

</div>
