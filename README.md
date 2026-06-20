# CoorgCars 🚗

A production-ready used car marketplace built with Next.js 15, Supabase, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Auth + DB + Storage**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Features

- 🔐 Dealer Registration & Login (Supabase Auth)
- 📊 Dealer Dashboard with stats
- 🚘 Add Car Listings with up to 4 images
- 🖼️ Image upload to Supabase Storage
- 🔍 Browse with filters: brand, fuel, city, price, transmission, body type
- 📱 Car Details page with image gallery & lightbox
- 💬 WhatsApp dealer button
- 📱 Fully mobile-responsive
- 🌑 Dark premium UI (Cars24/Spinny inspired)

---

## Setup

### 1. Clone & Install

```bash
git clone <your-repo>
cd coorgcars
npm install
```

### 2. Create a Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

### 3. Run the SQL Schema

In your Supabase dashboard → SQL Editor → paste the contents of `supabase/schema.sql` and run it.

### 4. Create the Storage Bucket

In Supabase → Storage → Create a bucket named `car-images` and set it to **Public**.

> The SQL schema also includes the storage policies. If you created the bucket manually, the policies should auto-apply.

### 5. Environment Variables

Create `.env.local` from the template:

```bash
cp .env.local.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
4. Deploy!

---

## Folder Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── auth/
│   │   ├── login/page.tsx        # Dealer login
│   │   ├── register/page.tsx     # Dealer registration
│   │   └── callback/route.ts     # Auth callback
│   ├── browse/page.tsx           # Browse cars
│   ├── cars/[id]/page.tsx        # Car detail
│   └── dashboard/
│       ├── page.tsx              # Dealer dashboard
│       └── listings/new/page.tsx # Add listing
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── cars/
│   │   ├── CarCard.tsx
│   │   ├── CarGrid.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── AddListingForm.tsx
│   │   └── WhatsAppButton.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── dashboard/
│       ├── StatsCard.tsx
│       └── ListingRow.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   └── server.ts             # Server Supabase client
│   ├── actions/
│   │   ├── auth.ts               # Auth server actions
│   │   └── cars.ts               # Car CRUD server actions
│   └── utils.ts                  # Utility functions
├── types/index.ts                # TypeScript types
├── middleware.ts                 # Auth middleware
supabase/
└── schema.sql                    # Full DB schema
```

---

## Supabase Configuration Notes

- **RLS is enabled** on all tables — dealers can only manage their own listings
- **View counting** uses a `SECURITY DEFINER` function to bypass RLS
- **Storage** bucket `car-images` is public; upload restricted to authenticated users
- Images stored as `{dealer_id}/{timestamp}-{random}.{ext}`
