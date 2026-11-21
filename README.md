# Count Me In — Dyscalculia Support & Resources

**Live site:** [countmein.luana.systems](https://www.countmein.luana.systems/)

Evidence-based dyscalculia resources, tools, and strategies for adults.
_Numbers can move. Support can hold them still._

## About

Count Me In is a free, independent resource hub for adults navigating dyscalculia — a specific learning difference with math. The site brings together plain-language explanations, a self-check questionnaire, strategies for workplace and everyday life, a curated bibliography, and real stories from the community.

## What's inside

- **Home** — introduction with an optional narrated audio welcome, a working-memory demo, and a ten-second time-perception experiment.
- **About** — what dyscalculia is (and isn't), with sourced information.
- **Self-Check** — a reflective questionnaire; not a diagnostic test.
- **Get Assessed** — guidance on pursuing a formal assessment.
- **Tools & Apps** — accessibility tools and assistive apps that help with numbers, time, and working memory.
- **Free Resources** — printable guides and strategies.
- **Blog** — long-form posts on math anxiety vs. dyscalculia, ADHD overlap, time blindness, workplace accommodations, and more.
- **Stories** — lived experiences from the community.
- **Books** — a verified bibliography with Amazon affiliate links.
- **Ebook & Store** — curated downloads.
- **Contact** — get in touch.

## Accessibility features

- Read-aloud (`ListenButton`) on stories and blog posts.
- Pre-narrated homepage audio intro (`AudioWelcome`).
- Full keyboard navigation and skip links.
- Adaptive light/dark tokens tested for contrast.
- Interactive working-memory and time-perception demos designed to be experienced, not quizzed.
- Inline `<cite>` source attribution on every statistical claim.

## SEO & AI-citation readiness

The site is built to be cited by both search engines and AI answer engines.

- **Sitemap** — `public/sitemap.xml` covers every route.
- **robots.txt** — `public/robots.txt` explicitly welcomes GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot, and Applebot-Extended.
- **llms.txt** — `public/llms.txt` gives AI engines a Markdown index of the site, condition facts (ICD-11 `6A03.2`, prevalence, co-occurrence rates), a page and blog index, trusted sources, and citation guidance.
- **Structured data** — `index.html` ships three JSON-LD blocks: `Organization`, `WebSite`, and a `MedicalWebPage` describing dyscalculia as a `MedicalCondition` with typical assessment, treatments, and citations to NHS, BDA, DAI, CUH, and Butterworth 2019.
- **Social share previews** — Open Graph and Twitter card tags with `abstracthero.png` as the preview image.
- **Favicon** — theme-aware SVG at `public/favicon.svg` that inverts under `prefers-color-scheme: dark`.
- **Canonical URL** — set in `index.html`.

## Tech stack

- **React 18** + **TypeScript** with **Vite**
- **React Router** (lazy-loaded routes)
- **Tailwind CSS 4** + **Radix UI** primitives
- **Framer Motion** for motion
- **Recharts** for data visualisations
- Deployed on **Vercel** (SPA rewrites in `vercel.json`)

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

The production bundle is emitted to `build/`.

## Project origin

Originally scaffolded from a Figma design: [Count Me In Dyscalculia Website on Figma](https://www.figma.com/design/NrUyp2H1v1EURaCemHNQ8D/Count-Me-In-Dyscalculia-Website).

## Licence & credits

Content © Count Me In. Book cover art and author quotes are used under fair use for bibliographic reference; affiliate links are disclosed on the Books page. See [`src/Attributions.md`](src/Attributions.md) for full credits.
