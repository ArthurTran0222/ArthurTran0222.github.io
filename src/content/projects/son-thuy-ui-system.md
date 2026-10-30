---
title: "Sơn Thủy UI System"
description: "Bộ hệ thống thiết kế giao diện web cổ phong lấy cảm hứng mỹ học Where Winds Meet, tối ưu hóa CSS thuần và chuẩn trợ năng WCAG AA."
slug: "son-thuy-ui-system"
pubDate: "2026-10-20"
tags: ["CSS Tokens", "Design System", "Astro", "Accessibility"]
role: "Frontend Developer (Nội dung mẫu)"
status: "Hoàn thành"
featured: true
draft: false
demoUrl: "https://example.com/son-thuy-demo"
repoUrl: "https://github.com/arthur-heisenberg"
cover: "/images/projects/project-2.svg"
coverAlt: "Hình minh họa dự án Sơn Thủy UI System - Nội dung mẫu"
---

> **Lưu ý minh bạch:** Đây là *Nội dung mẫu* phục vụ minh họa năng lực thiết kế giao diện người dùng và mỹ thuật web; không hiển thị số liệu thành tích giả.

## Bối cảnh & Vấn đề

Hầu hết các trang web hiện đại đều đi theo phong cách tối giản phẳng hoặc cyberpunk tương lai. Dự án **Sơn Thủy UI System** được khởi xướng nhằm mang hơi thở cổ phong kiếm hiệp (sơn thủy, mực tàu, sương khói, chu sa) hòa nhập vào không gian web số mà vẫn giữ trọn vẹn sự hiện đại và chuẩn mực công nghệ.

## Vai trò & Trách nhiệm

- Nghiên cứu bảng màu ngũ hành cổ phong kết hợp độ tương phản WCAG AA (đạt tỷ lệ tương phản tối thiểu 4.5:1 cho chữ thường).
- Xây dựng hệ thống biến Design Tokens bằng CSS Custom Properties thuần túy.
- Thiết kế các hiệu ứng chuyển động tự nhiên (sương bay, gió thoảng) không gây chóng mặt hay giật lag.

```css
/* Token màu mực tàu và son đỏ chu sa */
:root {
  --color-ink-900: #111916;
  --color-paper-100: #f2ebdd;
  --color-cinnabar-500: #b54738;
  --color-gold-400: #b59a63;
}
```

## Giải pháp kỹ thuật

1. **Không phụ thuộc thư viện CSS nặng:** Hoàn toàn sử dụng CSS hiện đại (Flexbox, CSS Grid, clamp(), custom properties).
2. **Trợ năng hàng đầu (Accessibility):** Hỗ trợ đầy đủ phím Tab/Escape, chỉ thị trạng thái `focus-visible`, tương thích tốt với trình đọc màn hình.
3. **Tôn trọng Reduced Motion:** Cung cấp nút chuyển đổi trực quan kèm tự động nhận diện thiết lập của hệ điều hành.

## Kết quả đạt được

- Giao diện độc bản, ấn tượng, đậm chất kiếm hiệp phương Đông.
- Trọng lượng trang cực nhẹ, sẵn sàng triển khai trên mọi nền tảng CDN tĩnh như GitHub Pages.
