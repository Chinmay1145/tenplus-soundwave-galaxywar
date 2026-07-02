<div align="center">

# SoundWave

**A full-stack e-commerce platform for premium audio gear**

Built with TanStack Start, React 19, and Supabase

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

[Live Demo](#) · [Report a Bug](#) · [Request a Feature](#)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

SoundWave is a production-grade e-commerce storefront purpose-built for audio products — earbuds, headphones, neckbands, and studio gear. It implements the complete shopping lifecycle, from catalog browsing and product comparison through checkout, order tracking, and post-purchase support such as returns and warranty claims.

The application is architected as a reference implementation of a modern commerce stack: server-side rendering with **TanStack Start**, type-safe file-based routing, a **Supabase/Postgres** backend with row-level security, and an accessible, themeable component system built on **Radix UI** and **Tailwind CSS**.

## Features

**Shopping Experience**
- Product catalog spanning 12+ categories (TWS, ANC, gaming, sports, business, luxury, studio, kids, and more) across dozens of brands
- Advanced filtering, sorting, and search
- Rich product detail pages with image galleries, 360° product view, specs, and color variants
- Side-by-side product comparison
- Persistent cart and wishlist

**Checkout & Fulfillment**
- Multi-step, guided checkout flow
- Order tracking by order ID, including for guest checkouts
- Self-service returns and warranty claim requests

**Account Management**
- Email-based authentication via Supabase Auth
- Profile management and order history
- Downloadable account/order reports (PDF export)

**Platform**
- Server-side rendering for fast first paint and SEO
- Auto-generated sitemap
- Light/dark theme support
- Fully responsive, accessible UI
- Informational pages: About, Brands, Careers, Press, Sustainability, Affiliates, FAQ, Shipping, Contact

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR) with [TanStack Router](https://tanstack.com/router) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [Radix UI](https://www.radix-ui.com/) primitives, [shadcn/ui](https://ui.shadcn.com/)-style patterns |
| Backend | [Supabase](https://supabase.com/) (PostgreSQL, Auth, Row-Level Security) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Forms & Validation | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| PDF Generation | [jsPDF](https://github.com/parallax/jsPDF) |
| Icons | [Lucide](https://lucide.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Language | TypeScript |
| Package Manager | npm / Bun |

## Project Structure

```
soundwave/
├── src/
│   ├── assets/                # Product images and static media
│   ├── components/
│   │   ├── site/               # App-specific components (Header, Footer, ProductCard, ...)
│   │   └── ui/                  # Reusable UI primitives (buttons, dialogs, forms, ...)
│   ├── data/                    # Static product/catalog data
│   ├── hooks/                   # Custom React hooks (auth, mobile detection, ...)
│   ├── integrations/
│   │   └── supabase/            # Supabase client, auth middleware, generated types
│   ├── lib/                     # Utilities: formatting, invoices, delivery, reports, error handling
│   ├── routes/                  # File-based routes (TanStack Router)
│   │   └── _authenticated/       # Routes requiring a signed-in user
│   ├── router.tsx                # Router configuration
│   ├── server.ts                  # Server entry point
│   └── start.ts                    # Application entry point
│
├── supabase/
│   └── migrations/                # SQL migrations (profiles, orders, returns, ...)
│
├── public/                          # Static assets served as-is
├── package.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later (or [Bun](https://bun.sh/))
- A [Supabase](https://supabase.com/) project (free tier is sufficient)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/soundwave.git
cd soundwave

# Install dependencies
npm install
# or
bun install
```

### Environment Variables

Create a `.env` file in the project root with the following values, available from your Supabase project settings:

```env
SUPABASE_PROJECT_ID=your-project-id
SUPABASE_URL=your-supabase-url
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

> **Note:** Never commit `.env` to version control. A `.gitignore` entry is already provided.

### Database Setup

Apply the SQL migrations in `supabase/migrations/` to your Supabase project — either via the [Supabase CLI](https://supabase.com/docs/guides/cli) or the SQL editor in the Supabase dashboard. This provisions the `profiles`, `orders`, and `returns` tables along with their associated Row-Level Security policies.

```bash
supabase db push
```

### Run the App

```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the port shown in your terminal).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run build:dev` | Builds the app in development mode |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint across the codebase |
| `npm run format` | Formats the codebase with Prettier |

## Database Schema

The application uses Supabase (PostgreSQL) with the following core tables:

| Table | Description |
|---|---|
| `profiles` | User profile data, linked one-to-one with Supabase Auth users |
| `orders` | Order records, including line items, status, and tracking metadata |
| `returns` | Return and warranty claim requests, linked to originating orders |

All tables are protected by Row-Level Security (RLS) policies, ensuring users can only access and modify their own data.

## Deployment

SoundWave can be deployed to any platform that supports Node.js SSR, including [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or a self-hosted Node server via [Nitro](https://nitro.unjs.io/). Before deploying:

1. Configure the environment variables listed above in your hosting provider's dashboard.
2. Ensure all Supabase migrations have been applied to your production database.
3. Run `npm run build` to generate the production bundle.

## Contributing

Contributions are welcome and appreciated. To contribute:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add my feature"
   ```
4. Push to your branch
   ```bash
   git push origin feature/my-feature
   ```
5. Open a Pull Request

Please run `npm run lint` and `npm run format` before submitting a PR, and ensure any new functionality includes appropriate type coverage.

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

## Acknowledgements

- [TanStack](https://tanstack.com/) — Router, Query, and Start
- [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [Supabase](https://supabase.com/) — backend infrastructure and authentication
- [Lucide](https://lucide.dev/) — iconography

---

<div align="center">

Made with care for people who take their audio seriously.

</div>
