import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { pt } from '../../../data/translations';
import {
  getAllPosts,
  getBlogPostPath,
  getLocaleFromId,
  getSlugFromId,
} from '../../../utils/blog';

export async function GET(context: APIContext) {
  const posts = (await getAllPosts()).filter(
    (post) => getLocaleFromId(post.id) === 'pt'
  );

  return rss({
    title: 'Blog | Carlos Gabriel Sánchez Jiménez',
    description: pt.blog.description,
    site: context.site!,
    customData: '<language>pt</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getBlogPostPath('pt', getSlugFromId(post.id)),
      categories: post.data.tags,
    })),
  });
}
