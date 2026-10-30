# Quản lý tài nguyên & Bản quyền (ASSETS.md)

Tài liệu này ghi nhận nguồn gốc, giấy phép và tình trạng các tài nguyên đồ họa, phông chữ và hình ảnh được sử dụng trong dự án Portfolio Kiếm Hiệp.

---

## 1. Phông chữ (Typography)

| Phông chữ | Mục đích sử dụng | Nguồn / Giấy phép | Tình trạng |
|---|---|---|---|
| **Noto Serif** | Tiêu đề lớn (Heading), câu đối, điểm nhấn cổ phong | Google Fonts (SIL Open Font License 1.1) | Hỗ trợ đầy đủ tiếng Việt UTF-8 |
| **Be Vietnam Pro** | Thân bài (Body text), giao diện chính | Just in Type / Google Fonts (OFL 1.1) | Chuẩn quốc gia, tối ưu cho tiếng Việt |
| **JetBrains Mono / Consolas** | Mã nguồn (Code block), thông số kỹ thuật | SIL OFL / Hệ thống | Đọc rõ ràng, không mỏi mắt |

*Quy định: Không dùng thư pháp cho đoạn văn dài để bảo đảm tiêu chí tiếp cận (accessibility).*

---

## 2. Đồ họa nghệ thuật (Vector & SVG Sơn Thủy)

| Tên tài nguyên | Đường dẫn | Phong cách / Mô tả | Nguồn gốc |
|---|---|---|---|
| Triện ấn chu sa | `public/images/seal-cinnabar.svg` | Con dấu triện đỏ vuông, khắc chữ "Nghĩa" / "Kiếm" cổ phong | Vector SVG tự thiết kế riêng |
| Lớp núi xa (Far Mountains) | `public/images/mountains-far.svg` | Núi mờ trong sương, sắc xám mực loãng | Vector SVG tự thiết kế riêng |
| Lớp núi gần (Mid/Near Mountains) | `public/images/mountains-near.svg` | Rặng núi sắc nét, nét cọ mực tàu đậm | Vector SVG tự thiết kế riêng |
| Lớp sương khói (Mist texture) | `public/images/mist-texture.svg` | Làn sương cuộn trôi ngang chân núi | Vector SVG procedural filter |
| Bút cọ phân cách (Brush Divider) | `public/images/brush-divider.svg` | Nét mực bay lượn làm đường phân đoạn | Vector SVG tự vẽ |
| Nền giấy xuyến chỉ | `public/images/paper-grain.svg` | Hạt giấy mộc mạc tinh tế | SVG noise filter |
| Favicon kiếm ấn | `public/favicon.svg` | Biểu tượng thanh kiếm trong ấn triện | Vector SVG tự vẽ |
| Hình nền Where Winds Meet | `public/images/bg-where-winds-meet.jpg` | Kiếm khách rừng trúc dưới mưa (Điện ảnh Where Winds Meet) | Hình ảnh do người dùng cung cấp (được xử lý mờ nghệ thuật & scrim tương phản WCAG) |

*Tất cả tài nguyên đồ họa trên là vector SVG độc lập, tự tạo, không trích xuất từ bất kỳ trò chơi hay bản quyền thương mại nào.*

---

## 3. Hình ảnh nội dung mẫu (Placeholders)

| Tên file | Vị trí | Nhãn hiển thị | Hướng dẫn thay thế |
|---|---|---|---|
| `avatar-placeholder.svg` | Trang Giới thiệu & Hero | `[Ảnh đại diện tác giả]` | Người dùng thay ảnh chân dung thật vào `public/images/avatar.jpg` |
| `project-1.svg` | Dự án: Cửu Kiếm Codebase | `Nội dung mẫu` | Thay ảnh chụp màn hình dự án thật vào `public/images/projects/` |
| `project-2.svg` | Dự án: Sơn Thủy UI System | `Nội dung mẫu` | Thay ảnh chụp giao diện thật vào `public/images/projects/` |
| `post-cover-1.svg` | Bài viết: Khởi đầu hành trình | `Hình minh họa` | Thay ảnh cover bài viết theo ý muốn |

---

## 4. Danh sách người dùng cần cấu hình & cập nhật
1. **Thông tin cá nhân**: Cập nhật tại `src/config/site.ts` (Họ tên, email thật, link GitHub, LinkedIn).
2. **Hình ảnh thật**: Thay thế các file SVG placeholder trong `public/images/` bằng hình ảnh cá nhân thực tế (JPG/WebP/PNG).
