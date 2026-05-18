# AGENTS.md

## What this is

Static personal portfolio site deployed via GitHub Pages at `https://cargabsj175.github.io/`. Built with **Astro** + **Tailwind CSS v4**.

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Build for production → dist/
npm run preview   # Preview production build locally
```

No lint/typecheck/test commands — verify changes manually in browser.

## Structure

- `src/pages/` — routes; `index.astro` (EN), `es/index.astro` (ES), `pt/index.astro` (PT)
- `src/components/` — Astro components (Header, Hero, About, Experience, Education, Skills, Services, Projects, Contact, Footer)
- `src/layouts/BaseLayout.astro` — base HTML shell with meta tags, fonts, global CSS
- `src/data/translations.ts` — all i18n strings for en/es/pt
- `src/styles/global.css` — Tailwind imports + custom theme/colors
- `public/` — static assets (images, favicon, video) — copied as-is to build output
- `astro.config.mjs` — Astro config with i18n routing (prefixDefaultLocale: false)

## i18n

- Default locale: `en` (root `/`)
- Spanish: `/es`
- Portuguese (Brazil): `/pt`
- Language switcher in header links to `/{locale}` paths
- All text lives in `src/data/translations.ts` — edit there, not in components

## Key integrations

- **Contact form**: Formspree `https://formspree.io/f/xrgjrppr` (in Contact.astro)
- **CV PDF generation**: `jspdf` + `jspdf-autotable` — generates PDF on-the-fly in browser from About section (in About.astro)
- **Font Awesome 6**: loaded via CDN in `global.css`
- **Google Fonts (Inter)**: loaded in `BaseLayout.astro`
- **Google Site Verification**: meta tag in `BaseLayout.astro`

## Adding a project

1. Add thumb and full screenshot to `public/` using naming: `NN_<name>_thumb.webp` / `NN_<name>_full.webp`
2. Add entry to `t.projects.list` in `src/data/translations.ts` (all 3 locales: en, es, pt)
3. Rebuild with `npm run build`

## Editing content

- **Text/translations**: `src/data/translations.ts` — single source of truth for all languages
- **Sections**: edit corresponding component in `src/components/`
- **Styles**: `src/styles/global.css` for global, or use Tailwind utility classes in components
- **Layout**: `src/layouts/BaseLayout.astro`

## Old site

The original static HTML/CSS/JS site is preserved in `old-site/` for reference.
