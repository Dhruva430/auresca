# Auresca Care — Skin, Hair & Aesthetics Clinic

A boutique clinic website built for speed and elegance.
**Reveal • Restore • Radiate.**

## Stack

- **Astro** (TypeScript) — every page is prerendered to static HTML at build time
- **Markdown blog** — posts are files in `src/content/blog/`, no database, no CMS
- **Tailwind CSS** (via PostCSS, purged → ~7 KB gzipped)
- Vanilla JS for interactions — **no client framework** (keeps PageSpeed high)
- **Vercel** deploy target (`@astrojs/vercel`); only the appointment endpoint
  runs on-demand, as a single function

## Brand

Auresca Care brand kit — gold (`#C89D42`), sage (`#8D947A`), dusty rose
(`#DDA7B4`) on ivory/cream neutrals. Headings in **Cormorant Garamond**,
body in **Manrope** (both self-hosted by Astro's font pipeline). Tokens live in
`tailwind.config.js`.

## Getting started

Uses **pnpm** (see `packageManager` in `package.json`). Node 22.12+.

```bash
pnpm install
cp .env.example .env         # optional — only for the appointment webhook
pnpm dev                     # http://localhost:4321
```

### Production

```bash
pnpm build                   # → dist/ + .vercel/output/
pnpm preview
pnpm check                   # type-check .astro/.ts
```

## Writing a blog post

Drop a Markdown file into `src/content/blog/`. The **filename becomes the URL**
(`my-post.md` → `/blog/my-post`), and the post appears automatically on `/blog`
and in the homepage Blog section (newest four).

```markdown
---
title: "The 5-step evening routine your skin barrier actually wants"
excerpt: "One-line summary, shown on cards and as the article standfirst."
category: "Skincare"
coverImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a"
author: "Dr. Kavya Rao"
publishedAt: 2026-06-10
readMinutes: 5     # optional — estimated from word count when omitted
draft: false       # optional — drafts show in `pnpm dev` only
---

Body copy in Markdown. Headings, lists, links, quotes and images are all
styled by `.post-body` in `src/styles/global.css`.
```

Frontmatter is schema-validated in `src/content.config.ts`, so a typo fails the
build instead of shipping a broken page. `coverImage` may be a remote URL
(sized automatically for Unsplash) or a path under `public/images/`.

## Appointment requests

`POST /api/appointments` is the only on-demand route. It validates the request,
logs it, and — when `APPOINTMENT_WEBHOOK_URL` is set — forwards it as JSON to
that URL (Zapier, Make, a Slack incoming webhook, your own endpoint).

The form works both ways: with JavaScript the submit is answered inline; without
it the browser posts normally and lands on `/appointment-success`. Astro's
origin check blocks cross-site form posts.

## Deploying to Vercel

Import the repo — Astro is auto-detected, no `vercel.json` needed. Set
`APPOINTMENT_WEBHOOK_URL` under **Settings → Environment Variables** if you want
requests forwarded. Every push builds and deploys.

## Project structure

```
src/
  pages/
    index.astro            Home (composes the sections below)
    blog/index.astro       Article index
    blog/[...slug].astro   Article page (getStaticPaths over the collection)
    appointment-success.astro
    404.astro
    api/appointments.ts    On-demand endpoint (prerender = false)
  layouts/Layout.astro     Base HTML — meta, fonts, header/footer, script entry
  components/
    Icon.astro             Inline SVG icon set
    Header.astro Footer.astro
    sections/              Hero, Stats, About, Services, WhyUs, Results,
                           Reviews, BlogSection, Faq, Appointment
  content/blog/*.md        The blog. Add a file, get a page.
  content.config.ts        Frontmatter schema
  data/site.ts             All static site content (services, FAQ, reviews, …)
  lib/helpers.ts           Responsive image URL builder + date formatting
  lib/blog.ts              Post listing + read-time estimate
  scripts/*.js             Menu, hero carousel, filters, FAQ, form, reveal
  styles/global.css        Tailwind entry + component classes
public/images/             Photography + optimised logo
```

## Homepage sections

Header (Services · Results · Reviews · Blog · FAQ · Appointments) → Hero →
Stats → About → **Services** → Why Us → **Before/After** slider → **Reviews** →
**Blog** → **FAQ** accordion → **Appointment** form → Footer.

## Performance notes (targeting PageSpeed 80+)

- Static HTML from the CDN edge; CSS ~7 KB gzipped; one ~8 KB JS bundle
- Fonts self-hosted and preloaded — no round trip to fonts.googleapis.com
- Hero image `fetchpriority="high"`; all others `loading="lazy"` with
  explicit `width`/`height` (no layout shift) and responsive `srcset`
- Security headers set in `astro.config.mjs`
- Reveal animations are progressive — content is fully visible without JS

## Logo

The real brand logo `AURESCA.svg` (repo root, 1.3 MB) is optimised with svgo to
`public/images/auresca-logo.svg` (~311 KB raw / ~106 KB gzipped) and used in the
header and footer (on an ivory tile so the dark wordmark reads on the olive
footer). To re-optimise after editing the source:

```bash
pnpm dlx svgo --config svgo.config.cjs -i AURESCA.svg -o public/images/auresca-logo.svg
```
