# Kế hoạch thực hiện: Portfolio Kiếm Hiệp (Astro + GitHub Pages)

> Dựa trên đặc tả chi tiết trong `AGENTS.md`. Phong cách kiếm hiệp: sơn thủy, mực tàu, sương mù, giấy xuyến chỉ và điểm nhấn chu sa (cinnabar).

---

## Danh sách công việc theo giai đoạn

### Giai đoạn 1: Nền móng & Cấu hình cốt lõi (Đã hoàn thành)
- [x] Cài đặt môi trường Node.js LTS & npm (Node v22.14.0, npm 10.9.2)
- [x] Khởi tạo dự án Astro (TypeScript strict, static output, Astro v5.18.2)
- [x] Cấu hình `.nvmrc`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- [x] Thiết lập URL helper (`src/utils/urls.ts`) xử lý chuẩn cả root `/` lẫn project site `/REPO/`
- [x] Cấu hình Content Collections (`src/content.config.ts`) cho `posts` và `projects` với Zod schema chặt chẽ
- [x] Tạo file cấu hình trang web tập trung `src/config/site.ts` (thông tin mặc định Arthur Heisenberg / Trần Trọng Nghĩa, role, mạng xã hội, base url)

### Giai đoạn 2: Hệ thống thiết kế & Giao diện cốt lõi (Đã hoàn thành)
- [x] Tạo hệ thống Design Tokens CSS (`src/styles/tokens.css`):
  - Bảng màu: ink `#111916`, paper `#F2EBDD`, mist `#C8D3CA`, jade `#6F8F7A`, cinnabar `#B54738`, gold `#B59A63`
  - Typography: Noto Serif / Be Vietnam Pro / Monospace, line-height, tỷ lệ chuẩn
- [x] BaseLayout (`src/layouts/BaseLayout.astro`) hỗ trợ SEO, skip link, accessible landmarks, dark/ink tone
- [x] Header & Navigation (`src/components/Header.astro`):
  - Menu thanh nhã, hỗ trợ mobile drawer (phím Tab/Escape, trap focus, target ≥ 44px)
  - Nút giảm hiệu ứng `MotionToggle.astro` (lưu localStorage, tôn trọng prefers-reduced-motion)
- [x] Footer (`src/components/Footer.astro`): phong cách kiếm hiệp, triện ấn, copyright, liên kết
- [x] HeroScene (`src/components/HeroScene.astro`):
  - Sơn thủy hữu tình: núi xa, núi gần, sương trôi, nét bút lông
  - Tối ưu tải (không lazy-load hero, tải nhanh, không che lấp chữ)
  - Nút Call-To-Action "Xem dự án" và "Đọc bài viết"
- [x] Trang chủ (`src/pages/index.astro`) & Giới thiệu (`src/pages/about.astro`)
- [x] Trang Liên hệ (`src/pages/contact.astro`)

### Giai đoạn 3: Hệ thống nội dung & Chi tiết bài viết / dự án (Đã hoàn thành)
- [x] Tiện ích lọc & xử lý nội dung (`src/utils/content.ts`):
  - Lọc bỏ draft và bài viết ngày tương lai ở múi giờ Asia/Ho_Chi_Minh
  - Tính thời gian đọc (reading time)
  - Trích xuất mục lục (Table of Contents - TOC) từ H2, H3
  - Chuẩn hóa tags và xử lý slug kebab-case ASCII
- [x] Trang danh sách bài viết (`src/pages/posts/index.astro`) có bộ lọc tag và tìm kiếm client-side (chuẩn hóa tiếng Việt có dấu/không dấu)
- [x] Endpoint chỉ mục tìm kiếm (`src/pages/search-index.json.ts`)
- [x] Trang chi tiết bài viết (`src/pages/posts/[slug].astro` & `src/layouts/PostLayout.astro`):
  - Header bài viết, ngày tháng, thời gian đọc, tags
  - Mục lục TOC tự sinh
  - Nội dung Markdown: code block có nút Copy (có trạng thái thành công/thất bại), blockquote, table, hình ảnh
  - Danh sách bài viết liên quan
- [x] Trang danh sách dự án (`src/pages/projects/index.astro`) & chi tiết dự án (`src/pages/projects/[slug].astro`)
- [x] Trang tag (`src/pages/tags/[tag].astro`)
- [x] 3 bài viết mẫu chuẩn (`src/content/posts/*.md`) & 2 dự án mẫu (`src/content/projects/*.md`) gắn nhãn minh bạch
- [x] Templates bài viết và dự án (`templates/post.md`, `templates/project.md`)

### Giai đoạn 4: Hiệu ứng chuyển động (Motion & Art Direction) (Đã hoàn thành)
- [x] Hệ thống motion CSS và IntersectionObserver (`src/styles/motion.css`, `src/scripts/motion.ts`):
  - Hiệu ứng xuất hiện mềm mại (fade + translate)
  - Parallax núi nhiều lớp (2-3 lớp, tự động tắt trên mobile / reduced motion)
  - Sương khói mờ ảo (pause khi tab ẩn hoặc ngoài viewport)
  - Bụi mực / lá bay nhẹ (canvas/CSS thưa, tắt trên mobile)
  - Reveal section khi cuộn, card hover nhẹ nhàng (160-240ms)
  - Nút Back-to-Top tự động ẩn hiện
  - Thanh đo tiến độ đọc bài viết (reading progress bar)
- [x] Chế độ giảm hiệu ứng (Reduced Motion): tắt triệt để parallax, particles, lặp vô tận

### Giai đoạn 5: Hoàn thiện tính năng & Tối ưu hóa (Đã hoàn thành)
- [x] Trang 404 phong cách kiếm hiệp "Lạc giữa giang hồ" (`src/pages/404.astro`)
- [x] Tạo RSS feed (`src/pages/rss.xml.ts`)
- [x] Cấu hình Sitemap (`@astrojs/sitemap`)
- [x] Open Graph & Twitter Cards meta tags, Canonical URL
- [x] Favicon kiếm hiệp SVG và tài nguyên đồ họa tự vẽ / public domain ghi rõ nguồn trong `ASSETS.md`

### Giai đoạn 6: QA, Kiểm thử & Đóng gói bàn giao (Đã hoàn thành)
- [x] Kiểm thử build `npm run build` ở root path `/`
- [x] Kiểm thử build với subpath `/portfolio-test/` (đảm bảo không vỡ asset/đường dẫn, 575 links & assets verified)
- [x] Kiểm tra responsive trên các kích thước: 360px, 390px, 768px, 1440px
- [x] Kiểm tra khả năng tiếp cận (Accessibility WCAG AA, bàn phím Tab/Esc, screen reader)
- [x] Kiểm tra tắt JavaScript: nội dung vẫn đọc được đầy đủ (CSS fallback)
- [x] GitHub Actions workflow hoàn chỉnh (`.github/workflows/deploy.yml`)
- [x] Viết tài liệu `README.md` & `ASSETS.md` đầy đủ, chi tiết hướng dẫn deploy và quản trị
- [x] Báo cáo nghiệm thu hoàn thành dự án (`QA_REPORT.md`)

---

## Quyết định kỹ thuật quan trọng
1. **SSG Static Only**: Xuất tĩnh 100% bằng Astro v5, không runtime server hay database.
2. **Asset Path Resilience**: Tất cả asset và link nội bộ đều đi qua `withBase()` helper để deploy được cả ở `username.github.io` lẫn `username.github.io/repo/`.
3. **No Heavy 3D / No Scroll Hijacking**: Giữ trải nghiệm cuộn tự nhiên của hệ điều hành, dùng CSS GPU transforms và IntersectionObserver cho hiệu năng cao nhất.
