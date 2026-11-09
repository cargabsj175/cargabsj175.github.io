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

- `src/pages/` — routes; `index.astro` (EN), `es/index.astro` (ES), `pt/index.astro` (PT), `blog/` (EN blog), `es/blog/`, `pt/blog/`
- `src/components/` — Astro components (Header, Hero, About, Experience, Education, Skills, Services, Projects, Contact, Footer, BlogCard, BlogIndex, TableOfContents)
- `src/layouts/BaseLayout.astro` — base HTML shell with meta tags, fonts, global CSS
- `src/layouts/BlogLayout.astro` — blog post layout with SEO, TOC, tags and translations
- `src/content.config.ts` — Astro 6 content collection for the blog (`glob` loader)
- `src/content/blog/{en,es,pt}/` — Markdown posts per language
- `src/utils/blog.ts` — blog helpers (locales, slugs, dates, reading time, translations)
- `src/data/translations.ts` — all i18n strings for en/es/pt
- `src/styles/global.css` — Tailwind imports + custom theme/colors + prose styles
- `public/` — static assets (images, favicon, video, `blog/` images) — copied as-is to build output
- `astro.config.mjs` — Astro config with i18n routing (prefixDefaultLocale: false), sitemap and Shiki

## i18n

- Default locale: `en` (root `/`)
- Spanish: `/es`
- Portuguese (Brazil): `/pt`
- Blog: `/blog` (EN), `/es/blog`, `/pt/blog`; posts use the same slug per language when translated
- Language switcher in header links to `/{locale}` paths, preserving blog post translations when they exist
- All text lives in `src/data/translations.ts` — edit there, not in components

## Key integrations

- **Contact form**: Formspree `https://formspree.io/f/xrgjrppr` (in Contact.astro)
- **CV PDF generation**: `jspdf` + `jspdf-autotable` — generates PDF on-the-fly in browser from About section (in About.astro)
- **Font Awesome 6**: loaded via CDN in `global.css`
- **Google Fonts (Inter)**: loaded in `BaseLayout.astro`
- **Google Site Verification**: meta tag in `BaseLayout.astro`
- **Blog**: Astro Content Collections + `@tailwindcss/typography`, client-side search, per-language RSS (`/blog/rss.xml`) and sitemap (`@astrojs/sitemap`)

## Adding a blog post

1. Create `src/content/blog/<lang>/<slug>.md` for one or more languages (`en`, `es`, `pt`).
2. Add the frontmatter: `title`, `description`, `pubDate`, `lang`, and optionally `author`, `tags`, `cover`, `coverAlt`, `updatedDate`, `draft`, `legacyUrl`.
3. Use the same `<slug>` across languages to link translations.
4. Put images in `public/blog/<slug>/` and reference them as `/blog/<slug>/image.webp`.
5. Run `npm run dev` and check `/blog/<slug>/`, `/es/blog/<slug>/` or `/pt/blog/<slug>/`.
6. See `BLOG.md` for the full authoring guide and WordPress import notes.

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
