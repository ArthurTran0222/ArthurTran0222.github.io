import type { CollectionEntry } from 'astro:content';

/**
 * Lấy thời gian hiện tại theo múi giờ Việt Nam (Asia/Ho_Chi_Minh, UTC+7)
 */
export function getCurrentVietnamTime(): Date {
  // Lấy thời điểm hiện tại dạng UTC
  const now = new Date();
  return now;
}

/**
 * Kiểm tra xem một bài viết/dự án có đủ điều kiện hiển thị trên production không:
 * - Không phải draft (draft = false)
 * - Ngày pubDate không vượt quá ngày hiện tại theo múi giờ Asia/Ho_Chi_Minh
 */
export function isPublished(entry: { data: { draft?: boolean; pubDate: Date } }): boolean {
  if (entry.data.draft) {
    return false;
  }

  const now = getCurrentVietnamTime();
  // Cho phép dung sai một khoảng nhỏ hoặc so sánh trực tiếp pubDate với now
  if (entry.data.pubDate.getTime() > now.getTime()) {
    return false;
  }

  return true;
}

/**
 * Chuẩn hóa chuỗi tiếng Việt sang ASCII kebab-case
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Tách dấu
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .replace(/[đĐ]/g, 'd') // Thay đ/Đ
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Kiểm tra tính duy nhất của slug trong một danh sách, nếu trùng ném ra lỗi (fail build)
 */
export function assertUniqueSlugs<T extends { data: { slug: string } }>(items: T[], typeName: string): void {
  const seen = new Set<string>();
  for (const item of items) {
    const slug = item.data.slug;
    if (seen.has(slug)) {
      throw new Error(`[Build Error] Trùng lặp slug trong ${typeName}: "${slug}". Mỗi bài viết/dự án phải có slug duy nhất!`);
    }
    seen.add(slug);
  }
}

/**
 * Lọc và sắp xếp các bài viết đã xuất bản
 * Thứ tự: Ngày giảm dần, khóa phụ là slug tăng dần
 */
export function getPublishedPosts(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
  assertUniqueSlugs(posts, 'posts');

  return posts
    .filter((post) => isPublished(post))
    .sort((a, b) => {
      const dateDiff = b.data.pubDate.getTime() - a.data.pubDate.getTime();
      if (dateDiff !== 0) return dateDiff;
      return a.data.slug.localeCompare(b.data.slug);
    });
}

/**
 * Lọc và sắp xếp các dự án đã xuất bản
 */
export function getPublishedProjects(projects: CollectionEntry<'projects'>[]): CollectionEntry<'projects'>[] {
  assertUniqueSlugs(projects, 'projects');

  return projects
    .filter((proj) => isPublished(proj))
    .sort((a, b) => {
      const dateDiff = b.data.pubDate.getTime() - a.data.pubDate.getTime();
      if (dateDiff !== 0) return dateDiff;
      return a.data.slug.localeCompare(b.data.slug);
    });
}

/**
 * Tính thời gian đọc bài viết dựa trên số lượng từ (khoảng 200 từ/phút)
 */
export function calculateReadingTime(body: string): { minutes: number; text: string } {
  // Loại bỏ các thẻ code block và cú pháp Markdown trang trí để đếm từ chính xác hơn
  const cleanBody = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`.*?`/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();

  const words = cleanBody.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    minutes,
    text: `${minutes} phút đọc`,
  };
}

/**
 * Trích xuất mục lục (Table of Contents - TOC) từ nội dung Markdown (H2, H3)
 */
export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

export function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = markdown.split('\n');
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const rawText = h2Match[1].trim();
      const cleanText = rawText.replace(/\*\*/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
      headings.push({
        depth: 2,
        text: cleanText,
        id: slugify(cleanText),
      });
      continue;
    }

    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const rawText = h3Match[1].trim();
      const cleanText = rawText.replace(/\*\*/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
      headings.push({
        depth: 3,
        text: cleanText,
        id: slugify(cleanText),
      });
    }
  }

  return headings;
}

/**
 * Gom nhóm tất cả tags từ các bài viết đã xuất bản kèm số lượng bài
 */
export interface TagCount {
  tag: string;
  count: number;
}

export function getAllTags(posts: CollectionEntry<'posts'>[]): TagCount[] {
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const rawTag of post.data.tags || []) {
      const normalizedTag = slugify(rawTag);
      tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
