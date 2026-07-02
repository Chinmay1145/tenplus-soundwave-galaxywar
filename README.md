<div align="center">

# ⬡ PULSE

### Experience Sound Beyond Reality

A premium, full-stack e-commerce storefront for wireless earbuds, ANC headphones, gaming and sports audio — built for speed, style, and scale.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](#license)

[Overview](#-overview) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Roadmap](#-roadmap)

</div>

---

## 🎧 Overview

**PULSE** is a modern, production-grade storefront concept for a premium audio brand. It ships with everything a real commerce site needs — a dynamic catalog, cart & checkout, order tracking, returns, wishlists, an authenticated account area, and an admin-style reporting dashboard — wrapped in a cinematic, dark-mode-first design language with animated soundwave motifs.

It's built as a **full-stack TanStack Start application**, meaning the same codebase handles server-side rendering, API routes, and the client SPA experience, backed by **Supabase** for auth and data persistence.

<div align="center">

| 🛍️ Storefront | 🔐 Auth & Accounts | 📦 Orders & Returns | 📊 Reports |
|:---:|:---:|:---:|:---:|
| Browse, filter, compare | Sign up / sign in | Track, cancel, return | PDF invoices & analytics |

</div>

---

## ✨ Features

- **🛒 Full shopping flow** — product catalog, filters & search, product detail pages with 360° view, cart, multi-step checkout
- **🧑‍💻 Authenticated accounts** — sign-up/sign-in, protected `/account` routes, order history, saved addresses
- **📦 Order lifecycle** — order tracking with live status, returns & refunds workflow
- **❤️ Wishlist & compare** — save products for later and compare specs side-by-side
- **🧾 PDF invoices** — generated client-side with `jspdf`
- **📊 Reports dashboard** — sales and performance charts powered by `recharts`
- **🏷️ Rich product data model** — brands, categories, variants, specs, badges (New / Best Seller), ratings & reviews
- **🌓 Theming** — light/dark mode toggle with smooth transitions
- **🎨 Cinematic UI** — animated hero, shimmering text, soundwave loaders, scroll progress indicator, magnetic buttons
- **📱 Fully responsive** — mobile-first layouts across every route
- **🔍 SEO-ready** — per-route meta tags, canonical links, and an auto-generated sitemap
- **🧩 Accessible, composable UI** — built on Radix UI primitives + shadcn/ui patterns
- **⚡ Type-safe routing** — file-based routes with auto-generated route tree via TanStack Router

---

## 🧱 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- [React 19](https://react.dev)
- [TanStack Start](https://tanstack.com/start) (SSR framework)
- [TanStack Router](https://tanstack.com/router) — file-based, type-safe routing
- [TanStack Query](https://tanstack.com/query) — data fetching & caching
- [Tailwind CSS v4](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com) + shadcn/ui component patterns
- [Lucide Icons](https://lucide.dev)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) validation
- [Recharts](https://recharts.org) — data visualization
- [jsPDF](https://github.com/parallax/jsPDF) — invoice generation
- [Sonner](https://sonner.emilkowal.ski) — toast notifications

</td>
<td valign="top" width="50%">

**Backend & Tooling**
- [Supabase](https://supabase.com) — auth, database & storage
- [Vite](https://vitejs.dev) — build tool & dev server
- [Nitro](https://nitro.unjs.io) — server runtime
- TypeScript (strict)
- ESLint + Prettier
- [Bun](https://bun.sh) / npm compatible

</td>
</tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (or [Bun](https://bun.sh))
- A [Supabase](https://supabase.com) project (for auth & data)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/tenplus-soundwave-galaxywar.git
cd tenplus-soundwave-galaxywar
```

### 2. Install dependencies

```bash
# using bun
bun install

# or using npm
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
SUPABASE_PROJECT_ID=your-project-id
SUPABASE_URL=your-supabase-url
SUPABASE_PUBLISHABLE_KEY=your-publishable-key

VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 4. Run the database migrations

SQL migrations live under `supabase/migrations`. Apply them via the [Supabase CLI](https://supabase.com/docs/guides/cli) or through the Supabase dashboard SQL editor.

### 5. Start the dev server

```bash
bun run dev
# or
npm run dev
```

The app will be available at **http://localhost:3000**.

### Available Scripts

| Command | Description |
|---|---|
| `dev` | Start the development server |
| `build` | Build for production |
| `build:dev` | Build in development mode |
| `preview` | Preview the production build locally |
| `lint` | Run ESLint |
| `format` | Format code with Prettier |

---

## 📁 Project Structure

```
tenplus-soundwave-galaxywar/
├── public/                    # Static assets
├── src/
│   ├── assets/                 # Product & hero imagery
│   ├── components/
│   │   ├── site/                # Header, Footer, ProductCard, Product360, etc.
│   │   └── ui/                  # Reusable primitives (Radix / shadcn-style)
│   ├── data/
│   │   └── products.ts          # Product catalog, categories & brands
│   ├── hooks/                  # use-auth, use-mobile, etc.
│   ├── integrations/
│   │   ├── lovable/              # Lovable platform integration
│   │   └── supabase/              # Supabase client, auth & types
│   ├── lib/                    # Formatting, invoices, reports, error handling
│   ├── routes/                 # File-based routes (pages)
│   │   └── _authenticated/       # Protected account/orders/reports/returns
│   ├── router.tsx              # Router configuration
│   ├── server.ts / start.ts    # SSR entry points
│   └── styles.css              # Global styles & design tokens
├── supabase/
│   ├── config.toml
│   └── migrations/             # SQL schema migrations
└── vite.config.ts
```

---

## 🗺️ Key Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, trending products, new arrivals |
| `/shop` | Full catalog with filters |
| `/product/$id` | Product detail with gallery, specs & 360° view |
| `/cart` · `/checkout` | Cart & multi-step checkout |
| `/wishlist` · `/compare` | Saved items & spec comparison |
| `/auth` | Sign in / sign up |
| `/account` | Authenticated account dashboard |
| `/orders` · `/track-order` | Order history & live tracking |
| `/returns` · `/returns/new` | Returns & refunds |
| `/reports` | Sales & performance analytics |
| `/about` · `/brands` · `/careers` · `/press` | Company & brand pages |
| `/faq` · `/shipping` · `/warranty` · `/sustainability` | Policy & support pages |

---

## 🎨 Design Philosophy

PULSE leans into a **dark, cinematic aesthetic** — dot-grid backgrounds, ambient glow accents, shimmering typography, and animated soundwave motifs — paired with a fully accessible component system so the flash never comes at the cost of usability.

---

## 🛣️ Roadmap

- [ ] Payment gateway integration (Stripe)
- [ ] Real-time order status via Supabase subscriptions
- [ ] Admin product management UI
- [ ] Internationalization (i18n)
- [ ] Automated test suite (unit + e2e)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please run `npm run lint` and `npm run format` before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it as a learning resource or starting point for your own storefront.

---

<div align="center">

Built with ⬡ by the PULSE team

</div>
