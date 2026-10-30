---
title: "Tâm pháp Clean Architecture trong phát triển phần mềm"
description: "Phân tách ranh giới rõ ràng giữa tầng nghiệp vụ cốt lõi và các thư viện giao diện bên ngoài."
slug: "tam-phap-clean-architecture"
pubDate: "2026-10-29"
tags: ["kien-truc", "typescript", "lap-trinh"]
draft: false
featured: false
cover: "/images/posts/post-cover-1.svg"
coverAlt: "Hình minh họa tâm pháp kiến trúc phần mềm"
---

## Ranh giới giang hồ: Đâu là cốt lõi?

Trong tiểu thuyết kiếm hiệp, một cao thủ có thể đổi nhiều loại vũ khí: đao, kiếm, cung, ám khí; nhưng nội công tâm pháp bên trong thì luôn bất biến.

Lập trình phần mềm cũng vậy. UI Framework có thể thay đổi sau vài năm (từ jQuery sang React, Vue, Svelte, Astro), cơ sở dữ liệu có thể chuyển đổi, nhưng **Domain Logic** (Quy luật nghiệp vụ) chính là tâm pháp bất biến.

```typescript
// Định nghĩa Thực thể cốt lõi (Domain Entity) không phụ thuộc framework
export interface HiepKhach {
  readonly id: string;
  readonly danhXung: string;
  readonly noiCong: number;
  readonly chieuThuc: string[];
}

export function thucHienXuatChieu(hiepKhach: HiepKhach, chieu: string): string {
  if (!hiepKhach.chieuThuc.includes(chieu)) {
    throw new Error(`Hiệp khách chưa lĩnh hội chiêu thức ${chieu}!`);
  }
  return `${hiepKhach.danhXung} xuất chiêu ${chieu} kinh thiên động địa!`;
}
```

## Lợi ích khi ứng dụng vào thực tế

- **Dễ dàng kiểm thử độc lập (Unit Test):** Không cần dựng database hay server ảo, chỉ cần truyền mock data là kiểm tra được trọn vẹn nghiệp vụ.
- **Không sợ phụ thuộc công nghệ:** Framework chỉ là tầng vỏ bọc (Adapter/Delivery Mechanism).

> “Luyện kiếm tới cảnh giới vô chiêu thắng hữu chiêu, cốt ở chỗ tâm pháp đã hòa làm một cùng đất trời.”
