import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { es } from '../../../data/translations';
import {
  getAllPosts,
  getBlogPostPath,
  getLocaleFromId,
  getSlugFromId,
} from '../../../utils/blog';

export async function GET(context: APIContext) {
  const posts = (await getAllPosts()).filter(
    (post) => getLocaleFromId(post.id) === 'es'
  );

  return rss({
    title: 'Blog | Carlos Gabriel Sánchez Jiménez',
    description: es.blog.description,
    site: context.site!,
    customData: '<language>es</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getBlogPostPath('es', getSlugFromId(post.id)),
      categories: post.data.tags,
    })),
  });
}
