import fs from 'node:fs';
import path from 'node:path';

console.log('--- BẮT ĐẦU KIỂM TRA ĐƯỜNG DẪN LIÊN KẾT & ASSET TRONG DIST ---');

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Tìm thấy ${htmlFiles.length} file HTML trong dist/`);

let brokenLinks = 0;
let checkedCount = 0;

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf8');

  // Regex tìm href và src
  const hrefMatches = content.matchAll(/href=["'](\/[^"']*)["']/g);
  for (const match of hrefMatches) {
    const url = match[1].split(/[?#]/)[0];
    if (!url || url.startsWith('//')) continue;

    checkedCount++;
    // Kiểm tra xem file có tồn tại không
    let targetFile = path.join(distDir, url);
    if (url.endsWith('/')) {
      targetFile = path.join(distDir, url, 'index.html');
    }

    if (!fs.existsSync(targetFile)) {
      // Thử xem nếu không có trailing slash mà là directory thì có index.html không
      if (fs.existsSync(path.join(targetFile, 'index.html'))) {
        // Tồn tại
      } else {
        console.error(`[Broken Link] Trong ${path.relative(distDir, htmlFile)}: href="${url}" không tìm thấy file ${path.relative(distDir, targetFile)}`);
        brokenLinks++;
      }
    }
  }

  const srcMatches = content.matchAll(/src=["'](\/[^"']*)["']/g);
  for (const match of srcMatches) {
    const url = match[1].split(/[?#]/)[0];
    if (!url || url.startsWith('//')) continue;

    checkedCount++;
    const targetFile = path.join(distDir, url);
    if (!fs.existsSync(targetFile)) {
      console.error(`[Broken Asset] Trong ${path.relative(distDir, htmlFile)}: src="${url}" không tìm thấy file ${path.relative(distDir, targetFile)}`);
      brokenLinks++;
    }
  }
}

console.log(`Đã kiểm tra ${checkedCount} liên kết và asset.`);
if (brokenLinks === 0) {
  console.log('✓ HOÀN HẢO: 0 broken link, 0 missing asset!');
} else {
  console.error(`❌ Phát hiện ${brokenLinks} đường dẫn lỗi!`);
  process.exit(1);
}
