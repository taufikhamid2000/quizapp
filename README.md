# Quiz App

A subject → topic → quiz app. Quiz content (subjects, topics, questions)
is bundled into the app itself as static data (`src/lib/quiz-data.ts`) —
no database involved for content, unlike EduBridge/MyQuiza. Auth (sign
in/up, a per-user dashboard/settings area) is scaffolded from `template`
and still uses Supabase, since that's a separate concern from quiz content.

Scaffolded from [template](https://github.com/taufikhamid2000/template) —
see that repo's DESIGN.md for the shared design language this app follows.

## Features

- Next.js App Router + TypeScript + Tailwind
- Subjects → topics → quiz flow, content defined in code (no CMS/DB)
- Supabase auth (sign in/up, dashboard, settings) inherited from `template`
- Cookie-based theme/accent/locale (see `template`'s DESIGN.md)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up your Supabase project (needed for auth only, not quiz content)
   and set these in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Adding quiz content

Edit `src/lib/quiz-data.ts` — add a `Subject`, give it `Topic`s, give each
topic `Question`s. No migration, no admin UI; it's just data in the repo.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
