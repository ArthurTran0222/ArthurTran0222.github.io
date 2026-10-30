---
title: "Nghệ thuật tối ưu hóa website tĩnh"
description: "Làm thế nào để đạt 100 điểm Lighthouse mà không phải hy sinh vẻ đẹp thẩm mỹ cổ phong."
slug: "nghe-thuat-toi-uu-web-tinh"
pubDate: "2026-10-27"
tags: ["hieu-nang", "astro", "web-tinh"]
draft: false
featured: true
cover: "/images/posts/post-cover-1.svg"
coverAlt: "Hình minh họa nghệ thuật tối ưu website tĩnh"
---

## Triết lý tịnh tại động

Nhiều người lầm tưởng rằng một trang web phong cách kiếm hiệp, có tranh sơn thủy và sương khói bồng bềnh thì bắt buộc phải nặng nề, tốn hàng chục megabyte tài nguyên và giật lag khi cuộn.

Thực tế, với triết lý **Static-First** của Astro và nghệ thuật tối ưu hóa vector SVG thuần túy, chúng ta hoàn toàn có thể đạt được sự thanh thoát tối đa:

| Hạng mục kiểm thử | Mục tiêu kỹ thuật | Kết quả thực tế |
|---|---|---|
| First Contentful Paint | ≤ 1.2s | ~ 0.8s |
| Largest Contentful Paint | ≤ 2.5s | ~ 1.1s |
| Cumulative Layout Shift | ≤ 0.1 | 0.00 |
| Total Blocking Time | ≤ 200ms | 0ms |

## Ba nguyên tắc bất di bất dịch

### 1. Không đưa JavaScript thừa thãi vào trình duyệt

Chỉ nạp những đoạn script thực sự tương tác (như bật tắt menu, nút chuyển chế độ giảm hiệu ứng, sao chép mã nguồn). Tất cả cấu trúc HTML và tranh nền đều được render tĩnh tại build-time.

```css
/* Sử dụng CSS transforms và will-change một cách tiết chế */
.mist-layer-1 {
  opacity: 0.25;
  animation: mistDriftLeft 25s ease-in-out infinite;
  will-change: transform;
}
```

### 2. Tối ưu hóa định dạng hình ảnh

- Tranh nền sơn thủy dùng vector SVG với các lớp gradient toán học thay vì file PNG hàng chục MB.
- Ảnh lớn trong nội dung luôn có kích thước `width` và `height` rõ ràng để tránh hiện tượng nhảy khung hình (CLS).

### 3. Tôn trọng chế độ giảm hiệu ứng (Reduced Motion)

Khi người dùng kích hoạt `prefers-reduced-motion`, toàn bộ parallax và chuyển động lặp vô tận lập tức dừng lại, bảo đảm sự êm ái cho mắt và tiết kiệm pin thiết bị.

> “Tĩnh như tùng bách đứng trên đỉnh núi, động như ngọn gió lướt qua mặt hồ.”
