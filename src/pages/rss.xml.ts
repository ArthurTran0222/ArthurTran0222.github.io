import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';
import { getPublishedPosts } from '../utils/content';
import { toAbsoluteUrl } from '../utils/urls';

export async function GET(context: { site: URL | undefined }) {
  const allPosts = await getCollection('posts');
  const publishedPosts = getPublishedPosts(allPosts);

  return rss({
    title: `${siteConfig.author.displayName} | Bút Ký Giang Hồ`,
    description: siteConfig.siteDescription,
    site: context.site?.toString() || siteConfig.siteUrl,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: toAbsoluteUrl(`/posts/${post.data.slug}/`),
    })),
    customData: `<language>vi</language>`,
  });
}
