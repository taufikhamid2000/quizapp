# Quiz App

A subject → topic → quiz app.

**Live demo:** https://quizapp-kappa-liart.vercel.app

Quiz content (subjects, topics, questions)
is bundled into the app itself as static data (`src/lib/quiz-data/`) —
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
- Locale/dictionaries system: `src/lib/dictionaries/` holds one file per
  locale (`en.ts`, `ms.ts`) of UI strings, selected via the cookie-based
  locale set in the shared `template` layout

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up your Supabase project (needed for auth only, not quiz content):

   - Set these in `.env.local`:

     ```bash
     NEXT_PUBLIC_SUPABASE_URL=
     NEXT_PUBLIC_SUPABASE_ANON_KEY=
     ```

   - Apply the schema in `supabase/migrations/` to your project via the
     Supabase CLI:

     ```bash
     supabase link --project-ref <your-project-ref>
     supabase db push
     ```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Adding quiz content

Edit the files in `src/lib/quiz-data/` — add a `Subject`, give it `Topic`s,
give each topic `Question`s. No migration, no admin UI; it's just data in
the repo.

## Running tests

Jest (via `next/jest`) is set up with tests under `src/__tests__/` (e.g.
`src/__tests__/auth/`):

```bash
npm test          # run once
npm run test:watch  # watch mode
```

## Deployment

Deployed on Vercel. Push to `main` to trigger a deploy, or use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
to deploy your own copy.

---
Built by [Muhammad Taufik](https://taufik.vercel.app)
