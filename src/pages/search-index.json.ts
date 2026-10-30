import { getCollection } from 'astro:content';
import { getPublishedPosts } from '../utils/content';

export const prerender = true;

export async function GET() {
  const allPosts = await getCollection('posts');
  const publishedPosts = getPublishedPosts(allPosts);

  const searchData = publishedPosts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.data.slug,
    pubDate: post.data.pubDate.toISOString(),
    tags: post.data.tags || [],
  }));

  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
