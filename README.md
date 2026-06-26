# Auresca Care — Skin, Hair & Aesthetics Clinic

A boutique clinic website built for speed and elegance.
**Reveal • Restore • Radiate.**

## Stack

- **Node.js + Express** (TypeScript)
- **EJS** server-rendered views (great SEO + fast first paint)
- **Tailwind CSS** (compiled & purged → ~6 KB gzipped)
- **MongoDB + Mongoose** (blog posts + appointment requests)
- Vanilla JS for interactions — **no client framework** (keeps PageSpeed high)

## Brand

Auresca Care brand kit — gold (`#C89D42`), sage (`#8D947A`), dusty rose
(`#DDA7B4`) on ivory/cream neutrals. Headings in **Cormorant Garamond**,
body in **Manrope**. Tokens live in `tailwind.config.js`.

## Getting started

Uses **pnpm** (see `packageManager` in `package.json`).

```bash
pnpm install
cp .env.example .env        # then set MONGODB_URI if you have Mongo
pnpm dev                    # builds CSS + runs server with hot reload
# open http://localhost:3000
```

> The site renders fully **without a database** — blog posts fall back to
> static content and appointment requests are logged to the console.
> Connect Mongo to persist real data.

### Seed sample blog posts

```bash
pnpm seed
```

### Production

```bash
pnpm build          # minify CSS + compile TS to dist/
NODE_ENV=production pnpm start
```

## Project structure

```
src/
  server.ts              Express app (helmet, compression, static caching)
  config/db.ts           Non-fatal Mongo connection
  models/                Blog.ts, Appointment.ts
  routes/                index (home), appointments, blog
  data/site.ts           All homepage content (services, FAQ, reviews, …)
  lib/helpers.ts         Responsive image URL builder
  scripts/seed.ts        Seed blog posts
  styles/input.css       Tailwind entry + component classes
views/
  layout.ejs             Base HTML (fonts, meta, CSP-safe)
  partials/              header, footer, icon
  pages/                 home, blog, blog-post, appointment-success, 404
public/
  css/styles.css         Generated (do not edit)
  js/main.js             Menu, FAQ, before/after slider, reveal, AJAX form
```

## Homepage sections

Header (Services · Results · Reviews · Blog · FAQ · Appointments) → Hero →
Stats → **Services** → Why Us → **Before/After** slider → **Reviews** →
**Blog** → **FAQ** accordion → **Appointment** form → Footer.

## Performance notes (targeting PageSpeed 80+)

- Server-rendered HTML, ~12 KB gzipped; CSS ~6 KB gzipped; JS ~5 KB
- Fonts: preconnect + async load with `display=swap`
- Hero image `fetchpriority="high"`; all others `loading="lazy"` with
  explicit `width`/`height` (no layout shift) and responsive `srcset`
- `compression` (gzip) + 30-day static cache in production
- `helmet` security headers incl. a strict Content-Security-Policy
- Reveal animations are progressive — content is fully visible without JS

## Logo

The real brand logo `AURESCA.svg` (repo root, 1.3 MB) is optimised with svgo to
`public/images/auresca-logo.svg` (~311 KB raw / ~106 KB gzipped) and used in the
header and footer (on an ivory tile so the dark wordmark reads on the olive
footer). To re-optimise after editing the source:

```bash
pnpm dlx svgo --config svgo.config.cjs -i AURESCA.svg -o public/images/auresca-logo.svg
```
