# Sarkar Press — Web Application

**Sarkar Press** is a modern website for a printing company based in **Patashpur, West Bengal, India** — serving government bodies, institutions, and the public for 25+ years.

The site is fully multilingual **(English / हिन्दी / বাংলা)**, lets customers **place printing orders online**, and guides them through **payment** — all without requiring a user account.

### What it does

| Feature              | Details                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| 🖨️ Services showcase | 9 printing services, equipment gallery, client logos                                                         |
| 📋 Order form        | Customer submits phone + description → auto-generates Order ID (e.g. `SP-20260314-AB12`) → saved to Supabase |
| 💳 Payments page     | UPI, bank transfer, and cash instructions with order ID lookup                                               |
| 🌐 Multilingual UI   | Language switcher in navbar; English, Hindi, and Bengali strings                                             |
| 📞 About page        | Company info, contact details, address, and photo gallery                                                    |

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Supabase (PostgreSQL)**.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Local Development](#local-development)
3. [Supabase Setup](#supabase-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Project Structure](#project-structure)

---

## Tech Stack

| Layer     | Technology                                                                   |
| --------- | ---------------------------------------------------------------------------- |
| Framework | Next.js 14 (App Router)                                                      |
| Language  | TypeScript                                                                   |
| Styling   | Vanilla CSS (custom design system)                                           |
| Database  | Supabase (PostgreSQL)                                                        |
| Hosting   | Vercel                                                                       |
| Fonts     | Inter, Noto Sans Bengali, Noto Sans Devanagari, Archivo Black (Google Fonts) |

---

## Local Development

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd sarkarpress-web

# 2. Install dependencies
npm install

# 3. Create .env.local (see Supabase Setup below for values)
cp .env.local.example .env.local   # or create manually

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase Setup

### Step 1 — Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **"New Project"**.
3. Fill in:
   - **Name**: `sarkarpress` (or any name you like)
   - **Database Password**: Choose a strong password and save it somewhere safe.
   - **Region**: Choose the closest region (e.g. `ap-south-1` for India).
4. Click **"Create new project"** and wait ~1 minute for it to provision.

### Step 2 — Create the Orders Table

1. In your Supabase project dashboard, click **"SQL Editor"** in the left sidebar.
2. Click **"New Query"** and paste the following SQL:

```sql
CREATE TABLE IF NOT EXISTS orders (
  id          BIGSERIAL PRIMARY KEY,
  order_id    TEXT NOT NULL UNIQUE,
  phone       TEXT NOT NULL,
  order_desc  TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (for the public order form)
CREATE POLICY "Allow public inserts" ON orders
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow only authenticated users (you) to SELECT
CREATE POLICY "Allow authenticated reads" ON orders
  FOR SELECT TO authenticated
  USING (true);

-- Allow only authenticated users (you) to UPDATE
CREATE POLICY "Allow authenticated updates" ON orders
  FOR UPDATE TO authenticated
  USING (true);
```

3. Click **"Run"**. You should see `Success. No rows returned.`

> ⚠️ **Important:** The `anon` policy lets anyone submit an order through the public form. This is intentional. Do **not** add a public `select` or `delete` policy without additional authentication.

### Step 3 — Get Your API Keys

1. In the left sidebar, click **"Project Settings"** → **"API"**.
2. Copy:
   - **Project URL** → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - **`anon` / public key** → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4 — Configure `.env.local`

Create (or edit) `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> These values are safe to expose to the client (they are prefixed `NEXT_PUBLIC_`) — Supabase's Row Level Security policies protect the data.

---

## Vercel Deployment

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2 — Import Project on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Click **"Import Git Repository"** and select your GitHub repo.
3. Vercel will auto-detect it as a **Next.js** project — no framework config needed.

### Step 3 — Add Environment Variables

Before clicking **Deploy**, expand **"Environment Variables"** and add:

| Name                            | Value                     |
| ------------------------------- | ------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key    |

> ✅ Make sure to add these for all three environments: **Production**, **Preview**, and **Development**.

### Step 4 — Deploy

Click **"Deploy"**. Vercel will build and publish your site in ~1–2 minutes.

Your live URL will be: `https://sarkarpress.vercel.app` (or a custom Vercel-assigned domain).

### Step 5 — Custom Domain (Optional)

1. In your Vercel project dashboard, go to **"Settings"** → **"Domains"**.
2. Add your custom domain (e.g. `sarkarpress.com`).
3. Follow the DNS configuration instructions shown.

---

## Environment Variables Reference

| Variable                        | Required | Description                        |
| ------------------------------- | -------- | ---------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | ✅ Yes   | Your Supabase project URL          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes   | Your Supabase anonymous public key |

---

## Project Structure

```
sarkarpress-web/
├── public/                     # Static assets (images, logos)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Navbar + Footer wrapper)
│   │   ├── page.tsx            # Homepage
│   │   ├── about/page.tsx      # About page
│   │   ├── orders/page.tsx     # Order form → saves to Supabase
│   │   └── payments/page.tsx   # Payment info page
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navbar with 3-language dropdown
│   │   ├── Footer.tsx          # Footer with map, links, contact
│   │   └── AnimatedStat.tsx    # Animated number counter
│   ├── context/
│   │   └── TranslationContext.tsx  # Language state (en/hi/bn)
│   ├── lib/
│   │   └── supabase.ts         # Supabase client (null-safe)
│   ├── styles/
│   │   └── globals.css         # Full custom CSS design system
│   └── translations/
│       ├── en.ts               # English strings
│       ├── hi.ts               # Hindi strings
│       └── bn.ts               # Bengali strings
├── supabase-schema.sql         # Reference SQL for the orders table
├── .env.local                  # ⚠️ Never commit this file
└── next.config.ts
```

---

## FAQ

**Why does the order form still redirect to payments even without Supabase configured?**

The form gracefully degrades — if `NEXT_PUBLIC_SUPABASE_URL` is missing or invalid, the insert is skipped and the user is redirected to the payments page with their generated Order ID anyway. A warning banner is shown on the orders page to alert you.

**Where can I view submitted orders?**

In your [Supabase Dashboard](https://supabase.com) → **Table Editor** → `orders` table. You can also use the **SQL Editor** to run queries.
