# Portfolio Kiếm Hiệp - Arthur Heisenberg (Trần Trọng Nghĩa)

> Trang web cá nhân & Bút ký công nghệ tĩnh (Static Portfolio & Blog) lấy cảm hứng từ mỹ học tranh sơn thủy kiếm hiệp *Where Winds Meet*. Xây dựng bằng **Astro**, **TypeScript**, **CSS Custom Properties thuần** và triển khai tự động lên **GitHub Pages**.

---

## 1. Tính năng nổi bật

- 🏔️ **Mỹ học Kiếm Hiệp Sơn Thủy:** Nghệ thuật thủy mặc kết hợp các tông màu mực tàu (`#111916`), giấy xuyến chỉ (`#F2EBDD`), sương lam (`#C8D3CA`), ngọc bích (`#6F8F7A`) và triện ấn chu sa (`#B54738`).
- ⚡ **Tĩnh hoàn toàn (100% SSG):** Tối ưu hóa tối đa, không cần backend server hay database, tải trang tức thì.
- 📜 **Đăng bài bằng Markdown:** Hỗ trợ Astro Content Collections với kiểm tra schema nghiêm ngặt tại build-time.
- 🔍 **Tìm kiếm tức thì (Live Search):** Tìm kiếm không cần server, hỗ trợ chuẩn hóa tiếng Việt không phân biệt hoa thường hay có dấu/không dấu.
- ♿ **Trợ năng & Tôn trọng Motion (WCAG AA):** Tương phản chữ rõ ràng, hỗ trợ đầy đủ phím Tab/Escape, nút "Giảm hiệu ứng" lưu `localStorage` và tự động nhận diện `prefers-reduced-motion`.
- 🌐 **Tương thích mọi URL:** Hoạt động trơn tru cả ở root domain (`username.github.io`) lẫn subpath repository (`username.github.io/repo/`).

---

## 2. Hướng dẫn cài đặt & Chạy cục bộ

### Yêu cầu môi trường
- **Node.js**: Phiên bản `v20.0.0` trở lên (Khuyến nghị Node.js 22 LTS).
- **npm**: Đi kèm với Node.js.

### Các lệnh điều khiển chính
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install
# Hoặc cài đặt chính xác theo lockfile:
npm ci

# 2. Khởi chạy máy chủ phát triển cục bộ (Hot Reload)
npm run dev
# Mở trình duyệt tại: http://localhost:4321/

# 3. Kiểm tra tính toàn vẹn kiểu dữ liệu (TypeScript & Content Collections)
npm run check

# 4. Đóng gói sản phẩm tĩnh (Production Build)
npm run build

# 5. Xem trước gói tĩnh đã build (Preview output)
npm run preview
```

---

## 3. Cấu hình thông tin cá nhân

Tất cả thông tin tác giả, danh xưng, vai trò, liên kết mạng xã hội được đặt tập trung tại:
👉 `src/config/site.ts`

```typescript
export const siteConfig = {
  author: {
    displayName: 'Arthur Heisenberg', // Tên bút danh kiếm hiệp
    fullName: 'Trần Trọng Nghĩa',      // Họ tên thật của bạn
    role: 'Sinh viên Công nghệ thông tin',
    bio: 'Lời giới thiệu cá nhân...',
    email: 'dia-chi-email-cua-ban@gmail.com', // Cập nhật email thật để kích hoạt nút gửi thư
    location: 'Việt Nam',
    socials: {
      github: 'https://github.com/USERNAME',
      // Thêm các liên kết khác nếu muốn:
    },
  },
  // ...
};
```

---

## 4. Hướng dẫn viết bài và thêm dự án

### 4.1 Đăng bài viết mới
1. Sao chép mẫu bài viết từ file `templates/post.md` vào thư mục `src/content/posts/`.
2. Đặt tên file theo dạng kebab-case tiếng Anh/không dấu (ví dụ: `hoc-lap-trinh-astro.md`).
3. Điền thông tin frontmatter:
   ```markdown
   ---
   title: "Tiêu đề bài viết"
   description: "Mô tả ngắn gọn về nội dung bài viết."
   slug: "hoc-lap-trinh-astro"
   pubDate: "2026-10-30"
   tags: ["astro", "lap-trinh"]
   draft: false
   featured: true
   cover: "/images/posts/post-cover-1.svg"
   coverAlt: "Hình minh họa bài viết"
   ---
   ```
4. Viết nội dung Markdown bên dưới.
5. Chạy `npm run check` và `npm run build` để kiểm tra. Khi commit & push lên GitHub, website sẽ tự động build và xuất bản bài mới.

### 4.2 Thêm dự án mới
1. Sao chép mẫu dự án từ `templates/project.md` vào thư mục `src/content/projects/`.
2. Điền các trường: `title`, `description`, `slug`, `tags`, `role`, `status`, `demoUrl`, `repoUrl`.
3. Ghi rõ nhãn "Nội dung mẫu" nếu dự án chưa được xác minh số liệu thực tế.

---

## 5. Cấu hình Deploy GitHub Pages

Dự án đã chuẩn bị sẵn GitHub Actions workflow tại `.github/workflows/deploy.yml`.

### Các bước kích hoạt:
1. Đẩy toàn bộ mã nguồn lên repository GitHub của bạn (nhánh `main` hoặc `master`).
2. Vào trang GitHub của Repository -> chọn tab **Settings**.
3. Ở menu bên trái, chọn **Pages**.
4. Tại mục **Build and deployment** -> **Source**: Chọn **GitHub Actions** (không chọn *Deploy from a branch*).
5. Workflow sẽ tự động chạy trong tab **Actions** và trang web sẽ sẵn sàng sau 1-2 phút!

### Triển khai dạng Project Site (`https://USERNAME.github.io/REPO/`)
Nếu triển khai dạng Project Site (tên repo không phải là `USERNAME.github.io`), bạn chỉ cần truyền biến môi trường khi build hoặc chỉnh sửa trong `astro.config.mjs`:
- `ASTRO_BASE="/TEN-REPO/"`
- `ASTRO_SITE="https://USERNAME.github.io"`

Tất cả các liên kết và hình ảnh đã được bao bọc bởi hàm helper `withBase()` nên sẽ tự động thích ứng chính xác 100%, không bị lỗi 404 hình ảnh hay CSS.

---

## 6. Danh mục người dùng cần cập nhật thực tế

| Hạng mục | Vị trí cập nhật | Tình trạng mặc định |
|---|---|---|
| **Email liên hệ** | `src/config/site.ts` | Để trống (hiển thị hướng dẫn) |
| **GitHub profile** | `src/config/site.ts` | `https://github.com/arthur-heisenberg` |
| **Ảnh đại diện** | `public/images/avatar.svg` | Silhouette kiếm khách phong cách thủy mặc |
| **Ảnh dự án thật** | `public/images/projects/` | Hình minh họa SVG mang nhãn [Nội dung mẫu] |
| **Tên repo / site** | `astro.config.mjs` hoặc biến môi trường | `https://arthur-heisenberg.github.io` |

---

## 7. Khắc phục lỗi thường gặp (Troubleshooting)

- **Lỗi duplicate slug:** Nếu hai bài viết hoặc hai dự án có cùng `slug`, quá trình build sẽ dừng lại và báo lỗi rõ ràng vị trí trùng. Hãy đảm bảo mỗi file có slug duy nhất.
- **Bài viết không hiển thị:** Kiểm tra xem `draft: false` chưa và ngày `pubDate` có vượt quá ngày hiện tại không (các bài viết tương lai hoặc draft đều được ẩn bảo vệ).
- **Thiếu coverAlt:** Khi khai báo `cover`, bắt buộc phải có `coverAlt` để bảo đảm tiêu chuẩn trợ năng tiếp cận (Accessibility WCAG).
