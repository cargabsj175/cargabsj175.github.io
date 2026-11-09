import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { en } from '../../data/translations';
import {
  getAllPosts,
  getBlogPostPath,
  getLocaleFromId,
  getSlugFromId,
} from '../../utils/blog';

export async function GET(context: APIContext) {
  const posts = (await getAllPosts()).filter(
    (post) => getLocaleFromId(post.id) === 'en'
  );

  return rss({
    title: 'Blog | Carlos Gabriel Sánchez Jiménez',
    description: en.blog.description,
    site: context.site!,
    customData: '<language>en</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getBlogPostPath('en', getSlugFromId(post.id)),
      categories: post.data.tags,
    })),
  });
}
