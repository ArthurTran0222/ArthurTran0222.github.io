import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }).refine((data) => {
    if (data.cover && !data.coverAlt) {
      return false;
    }
    return true;
  }, {
    message: 'coverAlt là bắt buộc khi có cover',
    path: ['coverAlt'],
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    role: z.string().default('Nhà phát triển'),
    status: z.string().default('Hoàn thành'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

export const collections = { posts, projects };
