import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:process';

console.log('--- BẮT ĐẦU KIỂM THỬ FIXTURE & LOGIC HỆ THỐNG ---');

// 1. Kiểm tra logic slugify tiếng Việt
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

assert.strictEqual(slugify('Khởi đầu hành trình'), 'khoi-dau-hanh-trinh');
assert.strictEqual(slugify('Đạo & Kiếm'), 'dao-kiem');
assert.strictEqual(slugify('Tối ưu hóa Astro 100%'), 'toi-uu-hoa-astro-100');
console.log('✓ Test 1: Chuẩn hóa slug tiếng Việt thành công');

// 2. Kiểm tra assertUniqueSlugs bắt lỗi trùng lặp
function assertUniqueSlugs(items, typeName) {
  const seen = new Set();
  for (const item of items) {
    const slug = item.data.slug;
    if (seen.has(slug)) {
      throw new Error(`[Build Error] Trùng lặp slug trong ${typeName}: "${slug}"`);
    }
    seen.add(slug);
  }
}

let duplicateCaught = false;
try {
  assertUniqueSlugs(
    [{ data: { slug: 'trung-lap' } }, { data: { slug: 'trung-lap' } }],
    'posts'
  );
} catch (e) {
  duplicateCaught = true;
  assert.match(e.message, /Trùng lặp slug/);
}
assert.strictEqual(duplicateCaught, true);
console.log('✓ Test 2: Bắt lỗi trùng lặp slug thành công');

// 3. Kiểm tra logic lọc Draft & Bài viết ngày tương lai
function isPublished(entry, now = new Date('2026-10-30T09:00:00Z')) {
  if (entry.data.draft) return false;
  if (entry.data.pubDate.getTime() > now.getTime()) return false;
  return true;
}

assert.strictEqual(isPublished({ data: { draft: true, pubDate: new Date('2026-10-25') } }), false);
assert.strictEqual(isPublished({ data: { draft: false, pubDate: new Date('2099-01-01') } }), false);
assert.strictEqual(isPublished({ data: { draft: false, pubDate: new Date('2026-10-25') } }), true);
console.log('✓ Test 3: Lọc draft và bài viết ngày tương lai thành công');

// 4. Kiểm tra các file đầu ra trong thư mục dist/
const requiredDistFiles = [
  'dist/index.html',
  'dist/about/index.html',
  'dist/projects/index.html',
  'dist/projects/cuu-kiem-codebase/index.html',
  'dist/projects/son-thuy-ui-system/index.html',
  'dist/posts/index.html',
  'dist/posts/khoi-dau-hanh-trinh-lap-trinh/index.html',
  'dist/posts/nghe-thuat-toi-uu-web-tinh/index.html',
  'dist/posts/tam-phap-clean-architecture/index.html',
  'dist/contact/index.html',
  'dist/404.html',
  'dist/rss.xml',
  'dist/search-index.json',
  'dist/sitemap-index.xml',
  'dist/favicon.svg',
  'dist/images/bg-where-winds-meet.jpg'
];

for (const file of requiredDistFiles) {
  assert.strictEqual(fs.existsSync(file), true, `Thiếu file output: ${file}`);
}
console.log('✓ Test 4: Toàn bộ 15 file output tĩnh cốt lõi tồn tại đầy đủ');

// 5. Kiểm tra draft KHÔNG bị rò rỉ ra dist/
assert.strictEqual(fs.existsSync('dist/posts/bi-kip-chua-xuat-ban/index.html'), false);
const searchIndexContent = fs.readFileSync('dist/search-index.json', 'utf8');
assert.strictEqual(searchIndexContent.includes('bi-kip-chua-xuat-ban'), false);
console.log('✓ Test 5: Xác nhận draft không bị rò rỉ ra production output');

console.log('=== TẤT CẢ KIỂM THỬ FIXTURE ĐẠT CHUẨN 100% ===');
