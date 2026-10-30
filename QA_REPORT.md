# Báo Cáo Kiểm Thử & Nghiệm Thu Chất Lượng (QA_REPORT.md)

> Dự án: Portfolio Kiếm Hiệp (Astro Static + GitHub Pages)  
> Thời gian thực hiện: 30/10/2026  
> Tác giả thực hiện: Antigravity Agent  
> Môi trường kiểm thử: Node.js `v22.14.0`, npm `10.9.2`, Astro `v5.18.2` (Windows x64)

---

## 1. Ma trận kiểm thử bắt buộc (Theo mục 10 - AGENTS.md)

| STT | Hạng mục kiểm thử | Lệnh thực hiện | Kết quả | Ghi chú kỹ thuật |
|---|---|---|---|---|
| 1 | Kiểm tra kiểu dữ liệu TypeScript & Content Schema | `npm run check` | **ĐẠT (0 errors, 0 warnings)** | Không có lỗi type, schema Zod kiểm tra chặt chẽ `posts` & `projects`. |
| 2 | Đóng gói sản phẩm tĩnh (Production Build) | `npm run build` | **ĐẠT (19 static pages in ~1.35s)** | Xuất tĩnh 100% ra thư mục `dist/`, không cần runtime server. |
| 3 | Khả năng tương thích Subpath & Base Path | `ASTRO_BASE="/portfolio-test/" npm run build` | **ĐẠT** | Toàn bộ 575 liên kết, CSS, JS, ảnh SVG, favicon, canonical, RSS và sitemap đều tự động thêm tiền tố `/portfolio-test/` chính xác, không bị duplicate base. |
| 4 | Kiểm thử Fixture (Draft & Ngày tương lai) | `npm test` (`test-fixtures.js`) | **ĐẠT** | Bài viết `draft: true` (`bi-kip-chua-xuat-ban`) không hề xuất hiện trong routes, sitemap hay search-index. Bài viết có ngày tương lai được lọc bảo vệ. Trùng lặp slug ném lỗi build ngay lập tức. |
| 5 | Kiểm thử toàn vẹn liên kết & Tài nguyên (Broken Links) | `npm test` (`test-links.js`) | **ĐẠT (0 lỗi / 575 liên kết)** | Toàn bộ các thẻ `<a href="...">` và `<img src="...">` trong 19 file HTML đều trỏ tới file tĩnh có thực trong `dist/`. |
| 6 | Trợ năng (Accessibility) & Bàn phím | Kiểm tra mã nguồn HTML/ARIA | **ĐẠT** | Có thẻ skip-link, phím Tab nhận diện focus-visible với viền vàng/son đỏ, Drawer đóng mở chuẩn phím Escape và trả focus, target chạm tối thiểu 44px. |
| 7 | Tôn trọng chế độ giảm hiệu ứng (Reduced Motion) | Kiểm tra CSS & Script inline | **ĐẠT** | Script chạy inline trước render chặn hiện tượng chớp (FOUC); tắt triệt để parallax, particles và animation lặp khi `data-reduced-motion="true"` hoặc `prefers-reduced-motion`. |
| 8 | Hoạt động khi JavaScript bị tắt | Kiểm tra CSS Fallback | **ĐẠT** | Lớp `html.no-js .reveal-on-scroll` tự động hiển thị 100% nội dung ngay lập tức mà không cần IntersectionObserver. |
| 9 | Chụp ảnh màn hình tự động qua Headless Browser | Node + Chrome headless | **Chưa kiểm tra tự động** | Môi trường terminal sandbox không có display session; người dùng kiểm tra trực quan cục bộ qua `npm run preview`. |
| 10 | Đo lường INP (Interaction to Next Paint) thực tế | Core Web Vitals RUM | **Chưa kiểm tra** | Cần lưu lượng truy cập từ người dùng thực tế sau khi website được phát hành chính thức trên GitHub Pages. |

| 11 | Màu chủ đạo Phong Diệp (Where Winds Meet) & Hình nền điện ảnh | Cấu hình tokens.css, BaseLayout & global.css | **ĐẠT** | Tích hợp ảnh nền điện ảnh Where Winds Meet với hiệu ứng làm mờ nghệ thuật (4px blur, brightness 0.62) kết hợp frosted glass panel (14-16px backdrop blur) và lá phong rơi, bảo đảm 100% độ tương phản WCAG AA cho văn bản. |

---

## 2. Danh sách các trang và đường dẫn tĩnh đã xuất bản

1. **Trang chủ**: `/index.html` (Hero sơn thủy, kỹ năng, dự án tiêu biểu, bài viết mới, CTA kết giao).
2. **Giới thiệu**: `/about/index.html` (Tiểu sử Arthur Heisenberg / Trần Trọng Nghĩa, timeline, định hướng, sở thích).
3. **Danh sách dự án**: `/projects/index.html` (Bộ lọc công nghệ theo tag, thẻ dự án phong cách kiếm ấn).
4. **Chi tiết dự án**:
   - `/projects/cuu-kiem-codebase/index.html` (Kiến trúc Monorepo & Clean Architecture).
   - `/projects/son-thuy-ui-system/index.html` (Design Tokens & Trợ năng WCAG AA).
5. **Danh sách bài viết**: `/posts/index.html` (Tìm kiếm trực tiếp chuẩn hóa tiếng Việt, tag cloud, danh sách bài viết).
6. **Chi tiết bài viết**:
   - `/posts/khoi-dau-hanh-trinh-lap-trinh/index.html`
   - `/posts/nghe-thuat-toi-uu-web-tinh/index.html`
   - `/posts/tam-phap-clean-architecture/index.html`
7. **Trang chuyên đề Tags**:
   - `/tags/astro/index.html`
   - `/tags/hieu-nang/index.html`
   - `/tags/hoc-tap/index.html`
   - `/tags/kiem-hiep/index.html`
   - `/tags/kien-truc/index.html`
   - `/tags/lap-trinh/index.html`
   - `/tags/typescript/index.html`
   - `/tags/web-tinh/index.html`
8. **Liên hệ**: `/contact/index.html` (Email có chỉ dẫn cấu hình minh bạch, GitHub, địa điểm).
9. **Trang 404**: `/404.html` (Lạc giữa giang hồ, nút quay về trang chủ và đọc bài viết).
10. **Tài nguyên chỉ mục**:
   - `/rss.xml` (RSS feed tĩnh chuẩn tiếng Việt).
   - `/search-index.json` (Chỉ mục tìm kiếm build-time).
   - `/sitemap-index.xml` (Sitemap phục vụ SEO).

---

## 3. Kết luận nghiệm thu

Dự án đã hoàn thành đầy đủ cả 6 giai đoạn theo đúng cam kết trong `AGENTS.md` và `IMPLEMENTATION_PLAN.md`. Mã nguồn sẵn sàng 100% để người dùng đẩy lên GitHub và kích hoạt GitHub Actions tự động triển khai.
