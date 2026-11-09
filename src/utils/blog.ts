import { getCollection, type CollectionEntry } from 'astro:content';

export const LOCALES = ['en', 'es', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type BlogPost = CollectionEntry<'blog'>;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** The collection id looks like `es/my-post`, so the first segment is the locale. */
export function getLocaleFromId(id: string): Locale {
  const [prefix] = id.split('/');
  return isLocale(prefix) ? prefix : DEFAULT_LOCALE;
}

export function getSlugFromId(id: string): string {
  return id.split('/').slice(1).join('/');
}

export function getLocalePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean}`;
}

export function getHomePath(locale: Locale): string {
  return getLocalePath(locale, '/');
}

export function getBlogPath(locale: Locale): string {
  return `${getLocalePath(locale, '/blog')}/`;
}

export function getBlogPostPath(locale: Locale, slug: string): string {
  return `${getBlogPath(locale)}${slug}/`;
}

export function getRssPath(locale: Locale): string {
  return `${getLocalePath(locale, '/blog')}/rss.xml`;
}

export function getTagPath(locale: Locale, tag: string): string {
  return `${getBlogPath(locale)}?tag=${encodeURIComponent(tag)}`;
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Lowercase and strip accents so search works with or without diacritics. */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Approximate reading time based on ~200 words per minute. */
export function getReadingTime(body?: string): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function isPublished(post: BlogPost): boolean {
  return !post.data.draft || !import.meta.env.PROD;
}

export function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', isPublished);
  return sortByDateDesc(posts);
}

export async function getPostsByLocale(locale: Locale): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => getLocaleFromId(post.id) === locale);
}

/** Map of locale -> post for every existing translation of the same slug. */
export function getTranslations(
  post: BlogPost,
  allPosts: BlogPost[]
): Partial<Record<Locale, BlogPost>> {
  const slug = getSlugFromId(post.id);
  const translations: Partial<Record<Locale, BlogPost>> = {};

  for (const candidate of allPosts) {
    if (getSlugFromId(candidate.id) !== slug) continue;
    translations[getLocaleFromId(candidate.id)] = candidate;
  }

  return translations;
}

/**
 * Language switcher links for a post: the translation when it exists,
 * otherwise the blog index for that locale.
 */
export function getPostLanguageLinks(
  post: BlogPost,
  allPosts: BlogPost[]
): Record<Locale, string> {
  const translations = getTranslations(post, allPosts);
  const links = {} as Record<Locale, string>;

  for (const locale of LOCALES) {
    const translation = translations[locale];
    links[locale] = translation
      ? getBlogPostPath(locale, getSlugFromId(translation.id))
      : getBlogPath(locale);
  }

  return links;
}

export function getAdjacentPosts(
  post: BlogPost,
  posts: BlogPost[]
): { older?: BlogPost; newer?: BlogPost } {
  const sorted = sortByDateDesc(posts);
  const index = sorted.findIndex((candidate) => candidate.id === post.id);
  if (index === -1) return {};
  return {
    newer: index > 0 ? sorted[index - 1] : undefined,
    older: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}

/**
 * Posts from other locales that do not have a translation in `locale`.
 * Used to tell readers that some articles are only available in another language.
 */
export function getPostsOnlyInOtherLocales(
  locale: Locale,
  allPosts: BlogPost[]
): Array<{ locale: Locale; posts: BlogPost[] }> {
  const currentSlugs = new Set(
    allPosts
      .filter((post) => getLocaleFromId(post.id) === locale)
      .map((post) => getSlugFromId(post.id))
  );

  return LOCALES.filter((candidate) => candidate !== locale)
    .map((candidate) => ({
      locale: candidate,
      posts: allPosts.filter(
        (post) =>
          getLocaleFromId(post.id) === candidate &&
          !currentSlugs.has(getSlugFromId(post.id))
      ),
    }))
    .filter((entry) => entry.posts.length > 0);
}
