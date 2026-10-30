# Kế hoạch triển khai portfolio kiếm hiệp trên GitHub Pages

> Tài liệu giao việc cho coding agents. Đọc toàn bộ trước khi triển khai. Người dùng yêu cầu một portfolio nhiều trang lấy cảm hứng thẩm mỹ Where Winds Meet, cuộn mượt và viết bài bằng Markdown. Đây là kế hoạch, chưa phải mã nguồn website.

## 1. Mục tiêu và phạm vi

Xây dựng portfolio cá nhân kết hợp blog, giao diện tiếng Việt, mang không khí kiếm hiệp: sơn thủy, mực tàu, gió, sương, giấy và điểm nhấn son đỏ. Thiết kế phải đủ chuyên nghiệp để giới thiệu năng lực IT, đồng thời thể hiện cá tính của chủ trang.

- Có Trang chủ, Giới thiệu, Dự án, Bài viết, Liên hệ; trang chi tiết bài viết, chi tiết dự án và 404.
- Đăng bài bằng cách thêm `.md`, commit và push; GitHub Actions build và triển khai lại.
- Website tĩnh hoàn toàn, không cần máy chủ ứng dụng, cơ sở dữ liệu hoặc đăng nhập.
- Hiển thị tốt trên máy tính, tablet và điện thoại; nội dung đọc được khi JavaScript tắt.
- Ưu tiên hoàn thành bản hoạt động đầy đủ trước, sau đó bổ sung hiệu ứng theo ngân sách hiệu năng.
- Không triển khai CMS, tài khoản, bình luận, thanh toán hay form gửi thư có backend trong bản đầu.

## 2. Cách agent bắt đầu

1. Kiểm tra repository, các file hướng dẫn hiện có và công cụ đã cài. Nếu có dự án đang hoạt động, đánh giá trước khi thay đổi stack; không ghi đè công việc của người dùng.
2. Nếu repo trống, khởi tạo Astro + TypeScript strict, dùng npm và lưu lockfile.
3. Đọc tài liệu chính thức hiện hành; chọn phiên bản ổn định tương thích, không dùng bản preview hoặc chép API cũ. Ghi phiên bản Node tương thích vào `.nvmrc` và `package.json`.
4. Tạo `IMPLEMENTATION_PLAN.md` có checklist từ các giai đoạn ở mục 11, rồi thực hiện lần lượt. Đánh dấu tiến độ và ghi quyết định quan trọng.
5. Chỉ hỏi khi có trở ngại thực sự. Thông tin cá nhân, URL repo hay ảnh chưa được cung cấp thì dùng cấu hình/placeholder rõ ràng, không tự bịa.
6. Không tự tạo repository từ xa hoặc publish công khai khi người dùng mới chỉ giao xây dựng cục bộ. Chuẩn bị đầy đủ workflow và hướng dẫn để có thể deploy.

## 3. Kiến trúc đề xuất

| Thành phần | Quyết định | Mục đích |
|---|---|---|
| Framework | Astro, output static | Xuất HTML riêng cho từng URL, phù hợp portfolio và blog |
| Ngôn ngữ | TypeScript strict | Kiểm soát dữ liệu nội dung và script |
| Giao diện | CSS thuần, custom properties | Dễ làm art direction riêng, ít phụ thuộc |
| Nội dung | Astro Content Collections với Markdown | Kiểm tra frontmatter ở build time |
| Motion nền | CSS + IntersectionObserver | Reveal, hover, chuyển động trang trí nhẹ |
| Motion nâng cao | GSAP + ScrollTrigger, tải theo nhu cầu | Parallax và đoạn cuộn điện ảnh trên trang chủ |
| Cuộn | Native scrolling mặc định | Giữ thao tác bàn phím, cảm ứng và anchor tự nhiên |
| Smooth scroll tùy chọn | Lenis sau khi bản native đạt kiểm thử | Chỉ desktop có chuột chính xác, cho phép tắt |
| Tìm bài | Chỉ mục JSON build time + script phía client | Tìm theo tiêu đề, mô tả và tag |
| Deploy | GitHub Actions → GitHub Pages | Build lại khi push nhánh triển khai |

Không cần React cho toàn bộ website. Chỉ bổ sung island nếu có tương tác thực sự cần đến. Không thêm Three.js/WebGL vào bản đầu. Không dùng đồng thời nhiều thư viện scroll.

## 4. Cấu trúc trang và nội dung

| URL logic | Nhãn menu | Nội dung chính |
|---|---|---|
| `/` | Trang chủ | Hero sơn thủy, giới thiệu ngắn, kỹ năng, dự án nổi bật, bài mới, lời mời liên hệ |
| `/about/` | Giới thiệu | Tiểu sử, định hướng, kỹ năng, hành trình học tập và sở thích |
| `/projects/` | Dự án | Danh sách dự án, tag công nghệ, ảnh và trạng thái |
| `/projects/[slug]/` | Chi tiết dự án | Vấn đề, vai trò, công nghệ, giải pháp, ảnh, kết quả, repo/demo nếu có |
| `/posts/` | Bài viết | Tìm kiếm, lọc tag, danh sách mới nhất, trạng thái không tìm thấy |
| `/posts/[slug]/` | Chi tiết bài viết | Tiêu đề, ngày, thời gian đọc, mục lục, Markdown, bài liên quan |
| `/tags/[tag]/` | Chủ đề | Bài viết theo tag; URL tag được chuẩn hóa và kiểm tra trùng |
| `/contact/` | Liên hệ | Email và liên kết mạng xã hội đã được cấu hình |
| `/404.html` | Lạc giữa giang hồ | Thông báo rõ ràng, liên kết về Trang chủ và Bài viết |

Các URL trong bảng là đường dẫn logic; mọi liên kết phải tính thêm base path nếu triển khai project site.

Trang chủ: hero khoảng 85–100svh trên desktop, ngắn hơn trên mobile. Tên chủ trang và lời giới thiệu là điểm đọc chính; nền không che chữ. Nút “Xem dự án” và “Đọc bài viết” phải hoạt động ngay. Các phần tiếp theo tạo nhịp như cuộn tranh, xen kẽ giấy sáng và nền mực trầm.

Giữ nhãn menu dễ hiểu. Có thể dùng tên trang trí như “Hành trình”, “Bút ký”, “Tác phẩm” trong heading phụ, nhưng không khiến khách phải đoán chức năng.

Thông tin mặc định: `displayName: Arthur Heisenberg`, `fullName: Trần Trọng Nghĩa`, `role: Sinh viên Công nghệ thông tin`; đặt tập trung trong cấu hình để người dùng sửa. Không suy diễn kinh nghiệm, thành tích, email hoặc URL tài khoản. Dữ liệu dự án chưa xác minh phải gắn nhãn “Nội dung mẫu”; không hiển thị số liệu thành tích giả.

## 5. Art direction

### 5.1 Bảng màu và chữ

| Token | Giá trị gợi ý | Vai trò |
|---|---|---|
| ink | `#111916` | Nền tối và chữ chính trên giấy |
| paper | `#F2EBDD` | Nền sáng, khoảng nghỉ |
| mist | `#C8D3CA` | Sương, lớp nền |
| jade | `#6F8F7A` | Chi tiết phụ |
| cinnabar | `#B54738` | Dấu triện, CTA |
| gold | `#B59A63` | Đường viền và nhấn tiết chế |

Đây là màu khởi điểm; agent phải kiểm tra tương phản từng cặp chữ/nền trước khi chốt. Font heading gợi ý Noto Serif, body Be Vietnam Pro, code dùng monospace dễ đọc; kiểm tra bộ glyph tiếng Việt, self-host WOFF2 có giấy phép phù hợp và `font-display: swap`. Không dùng font thư pháp cho đoạn văn dài.

### 5.2 Bố cục

- Hero có núi xa, núi gần, sương và nét mực; silhouette kiếm khách là tùy chọn, không phải bắt buộc.
- Dấu triện nhỏ, divider nét cọ, texture giấy rất nhẹ. Không biến mọi component thành hiệu ứng trang trí.
- Container tối đa khoảng 1200px; bài viết rộng 65–75ch. Body khoảng 17–18px desktop, 16px trở lên mobile, line-height 1.7–1.85.
- Card dự án và bài viết ưu tiên hình ảnh, metadata rõ, khoảng trắng rộng. Menu gọn; header có thể mờ nền nhưng vẫn đủ tương phản.
- Mobile có menu drawer thao tác bàn phím tốt, đóng bằng Escape và trả focus về nút mở.
- Tài nguyên tự vẽ, tự tạo hoặc có quyền sử dụng. Lấy cảm hứng không khí của Where Winds Meet; không sao chép nguyên website, logo hay trích xuất asset game. Ghi nguồn và giấy phép trong `ASSETS.md`.

## 6. Đặc tả chuyển động

Mục tiêu là cảm giác trôi theo gió, không phải càng nhiều animation càng tốt. Mỗi section chỉ có một điểm nhấn chính.

| Hiệu ứng | Cách làm | Giới hạn và fallback |
|---|---|---|
| Hero xuất hiện | Fade + translate 12–24px, chữ và CTA lệch nhịp 60–100ms | Tổng khoảng 700–1000ms; không khóa tương tác |
| Núi nhiều lớp | Transform theo cuộn, 2–3 lớp | Biên độ 20–70px desktop; tắt trên mobile/reduced motion |
| Sương trôi | Texture nhỏ, opacity thấp, CSS transform | Tối đa 2 lớp; tạm dừng ngoài viewport hoặc tab ẩn |
| Lá/bụi mực | Particle thưa bằng CSS hoặc canvas nhẹ | Tối đa 20 desktop, tắt mobile/reduced motion |
| Reveal section | IntersectionObserver, fade + translate 16–24px | Khoảng 450–650ms, chạy một lần |
| Card hover | Translate Y 2–4px, viền/ảnh đổi nhẹ | 160–240ms; có trạng thái focus tương đương |
| Progress bài viết | Thanh mảnh theo tiến độ đọc | Không gây layout shift; tắt nội suy khi reduced motion |
| Chuyển trang | Crossfade nhẹ 150–250ms | Progressive enhancement, fallback điều hướng thường |
| Back to top | Nút xuất hiện sau một đoạn cuộn | Anchor/native scroll; dùng auto khi reduced motion |

- Không hijack cuộn, không mandatory scroll snap, không ép người đọc qua đoạn pin dài.
- Bản đầu không dùng pin. Một cảnh pin ngắn chỉ là hạng mục mở rộng sau khi đạt kiểm thử, không áp dụng mobile.
- Không autoplay audio, không intro bắt buộc, không custom cursor thay con trỏ mặc định, không nhấp nháy mạnh.
- Có nút “Giảm hiệu ứng”, lưu lựa chọn bằng localStorage nếu khả dụng; tôn trọng `prefers-reduced-motion` ngay từ lần render đầu. Chế độ này tắt parallax, particle, smooth scroll nội suy và chuyển động lặp.
- Nếu dùng Lenis: giữ touch scroll native; đồng bộ một vòng requestAnimationFrame với ScrollTrigger; dọn listener, observer, ticker và instance khi chuyển trang. Không để thư viện và CSS cùng điều khiển smooth scroll.
- Nếu thêm Astro client-side navigation, dùng API lifecycle đúng với phiên bản đã cài; khởi tạo idempotent, cleanup trước swap, kiểm tra Back/Forward, focus và scroll restoration. Đưa ra khỏi phạm vi nếu không ổn định.
- Nội dung mặc định visible; chỉ thêm trạng thái trước reveal khi JavaScript đã khởi tạo thành công. Lỗi animation không được làm mất nội dung.

## 7. Hệ thống bài viết Markdown

### 7.1 Quy ước

- Bài viết: `src/content/posts/*.md`, dự án: `src/content/projects/*.md`.
- Dùng Content Collections, schema rõ ràng; với Astro hiện hành kiểm tra cú pháp `src/content.config.ts`, `defineCollection`, `glob` loader và `render` trong tài liệu chính thức.
- Frontmatter bài: title, description, slug, pubDate, updatedDate tùy chọn, tags, draft, featured, cover tùy chọn và coverAlt bắt buộc nếu có cover.
- Slug ASCII kebab-case, duy nhất trong collection; duplicate phải làm build thất bại. Không lấy tiêu đề tiếng Việt làm URL tùy tiện.
- Ngày dùng ISO; bỏ draft khỏi mọi output production gồm routes, chỉ mục tìm kiếm, tag, sitemap, RSS và danh sách liên quan. Bài có ngày tương lai cũng không xuất bản trước ngày đã định ở múi giờ Asia/Ho_Chi_Minh. Vì đây là static site, muốn tự xuất bản đúng ngày phải có build theo lịch; bản đầu chỉ xuất bản khi build/push, ghi rõ trong README.
- Thời gian đọc tính từ nội dung; sort ngày giảm dần với slug làm khóa phụ. Mục lục tự sinh từ heading H2/H3.
- Hỗ trợ bảng, danh sách, blockquote, ảnh, liên kết và fenced code có syntax highlight. Nút copy code phải thông báo thành công/thất bại, xử lý khi Clipboard API không khả dụng.
- Markdown là nội dung tin cậy do chủ repo viết. Không nhận Markdown/HTML từ người lạ và render trực tiếp.

### 7.2 Bài mẫu

```markdown
---
title: "Khởi đầu hành trình lập trình"
description: "Những điều tôi học được khi bắt đầu xây dựng dự án web."
slug: "khoi-dau-hanh-trinh-lap-trinh"
pubDate: "2026-10-30"
tags: ["hoc-tap", "lap-trinh"]
draft: false
featured: true
---

## Vì sao tôi bắt đầu?

Đây là nơi ghi lại trải nghiệm học tập của tôi.

## Điều tôi đã học

- Chia dự án thành các công việc nhỏ.
- Viết tài liệu để dễ tiếp tục vào lần sau.

> Mỗi bước nhỏ đều giúp hành trình rõ ràng hơn.
```

Ảnh bài viết nên đặt cạnh nội dung và được pipeline Astro xử lý qua import/schema image, hoặc có quy ước public asset rõ ràng. Agent phải cung cấp một bài mẫu có ảnh chạy được dưới cả `/` và `/repo/`; không giả định đường dẫn `/images/...` viết trong Markdown tự được thêm base. Có thể cung cấp component render/remark transform cho ảnh public, nhưng chỉ chọn một quy ước và hướng dẫn chính xác.

### 7.3 Quy trình đăng bài cho chủ trang

1. Sao chép template bài trong `templates/post.md` sang thư mục posts; đặt tên file rõ nghĩa.
2. Điền frontmatter và nội dung. Khi đang viết, để `draft: true`.
3. Xem trước bằng `npm run dev`; kiểm tra heading, ảnh, code và liên kết.
4. Đổi `draft: false`, kiểm tra ngày và chạy `npm run check`, `npm run build`.
5. Commit/push; GitHub Actions build/deploy. Nếu build lỗi, sửa theo log; phiên bản đang chạy vẫn là bản trước đó.
6. Có thể sửa `.md` trực tiếp trên GitHub rồi commit. Không có nút “đăng bài” hay giao diện admin trong website bản đầu.

## 8. Tổ chức mã nguồn đề xuất

```text
.github/workflows/deploy.yml
AGENTS.md
IMPLEMENTATION_PLAN.md
README.md
ASSETS.md
astro.config.mjs
package.json
package-lock.json
src/
  content.config.ts
  config/site.ts
  content/posts/
  content/projects/
  components/
    Header.astro
    Footer.astro
    HeroScene.astro
    Reveal.astro
    ProjectCard.astro
    PostCard.astro
    TableOfContents.astro
    MotionToggle.astro
  layouts/
    BaseLayout.astro
    PostLayout.astro
    ProjectLayout.astro
  pages/
    index.astro
    about.astro
    contact.astro
    404.astro
    posts/index.astro
    posts/[slug].astro
    projects/index.astro
    projects/[slug].astro
    tags/[tag].astro
    search-index.json.ts
    rss.xml.ts
  scripts/
    motion.ts
    navigation.ts
    search.ts
  styles/
    tokens.css
    global.css
    typography.css
    motion.css
  utils/
    urls.ts
    content.ts
public/
  images/
  fonts/
  favicon.svg
templates/post.md
templates/project.md
```

Không cần bám tên từng file nếu có lý do hợp lý; phải giữ cấu hình, nội dung, layout và motion tách biệt. Chỉ prerender endpoint tìm kiếm/RSS; không tạo API runtime.

## 9. GitHub Pages và URL

Hai trường hợp cần hỗ trợ:

| Kiểu | URL | Cấu hình |
|---|---|---|
| User site | `https://USERNAME.github.io/` | Repo `USERNAME.github.io`, site là origin, base `/` |
| Project site | `https://USERNAME.github.io/REPO/` | site là origin, base `/REPO/` |

- USERNAME/REPO là placeholder, không phải tài khoản đã được xác nhận. Cho phép cấu hình bằng biến môi trường hoặc file cấu hình; document cách đổi.
- Viết URL helper duy nhất cho internal links và public assets. Không prefix base hai lần. External URL, hash và mailto phải được giữ nguyên.
- Dùng đường dẫn static thật với trailing slash nhất quán; `getStaticPaths()` cho mọi route động. Không dùng SPA fallback hay router chỉ chạy client.
- Sitemap, canonical, RSS và Open Graph dùng URL tuyệt đối chính xác, tính cả base path.
- Workflow chạy khi push nhánh chính và `workflow_dispatch`; cài bằng lockfile, check, build, upload Pages artifact, deploy bằng Actions được tài liệu chính thức khuyến nghị ở thời điểm triển khai.
- Quyền tối thiểu: contents read, pages write, id-token write; environment github-pages; concurrency phù hợp. Không ghi token vào source.
- README hướng dẫn Settings → Pages → Source: GitHub Actions và cách đọc log. Không khẳng định đã deploy nếu chưa có deployment thành công.
- Tên miền riêng, CNAME và DNS là hạng mục tùy chọn sau khi biết domain thật.

## 10. Chất lượng và tiêu chí nghiệm thu

### Trải nghiệm và khả năng tiếp cận

- Hoạt động ở độ rộng 360, 390, 768, 1440 và 2560px; không tràn ngang toàn trang. Bảng/code dài được cuộn trong khung riêng.
- Có skip link, landmark semantic, một H1 mỗi trang, heading tuần tự, alt hữu ích, focus visible, target chạm khoảng 44px trở lên.
- Nội dung chính đạt tương phản WCAG AA: chữ thường 4.5:1, chữ lớn 3:1; kiểm tra cả nền có ảnh/sương.
- Menu, tìm kiếm, lọc tag, copy code, giảm hiệu ứng và back-to-top dùng được bằng bàn phím.
- Không có kết quả thì hiển thị thông báo và cách xóa bộ lọc. Tìm kiếm không phân biệt hoa thường; chuẩn hóa dấu tiếng Việt và đ/Đ khi khớp.
- Liên hệ chỉ dùng địa chỉ thật đã cấu hình. Nếu thiếu email thì hiển thị hướng dẫn cấu hình ở chế độ phát triển, không tạo form gửi thành công giả.

### Hiệu năng

- Mục tiêu Lighthouse trên production build với cấu hình đo ghi rõ: Performance ≥90, Accessibility ≥95, SEO ≥95. Đây là mục tiêu kiểm thử, không cam kết cho mọi thiết bị/mạng.
- Mục tiêu Core Web Vitals khi có dữ liệu thực: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms. Không gọi Lighthouse là phép đo INP thực tế.
- Hero image không lazy-load; có dimensions và responsive formats AVIF/WebP. Ảnh dưới fold lazy-load; tránh video nền trong MVP.
- Ngân sách khởi điểm: hero mobile ≤300KB, desktop ≤600KB; JavaScript route đầu ≤150KB gzip; nội dung tải đầu ≤1.5MB trên mobile. Nếu vượt phải ghi lý do và phương án giảm.
- Animate transform/opacity; không liên tục animate layout hoặc blur lớn. Không tạo nhiều animation loop. Dừng chuyển động khi tab ẩn.
- Trải nghiệm mobile ưu tiên native scroll, giảm số lớp và bỏ particle.

### Kiểm thử bắt buộc

1. `npm ci`, `npm run check`, `npm run build` thành công; cung cấp script thật trong package.json.
2. Chạy preview của output production. Truy cập trực tiếp và refresh mọi loại route, bài viết/tag/dự án và trang 404.
3. Kiểm tra build dưới cả base `/` và `/portfolio-test/`: điều hướng, ảnh Markdown, font, CSS/JS, favicon, tìm kiếm, RSS, sitemap và canonical.
4. Fixture nội dung kiểm tra draft/ngày tương lai không rò vào output; duplicate slug và frontmatter sai phải báo lỗi rõ.
5. Kiểm tra `prefers-reduced-motion`, nút giảm hiệu ứng, mobile touch, chỉ bàn phím, JS tắt, Back/Forward và nhiều lần chuyển trang không tăng listener/loop.
6. Kiểm tra liên kết nội bộ và đường dẫn asset trên output; không có console error hoặc request 404 cho asset.
7. Chụp screenshot desktop/mobile của Trang chủ, Bài viết và Dự án; xem trực tiếp để sửa lỗi dấu tiếng Việt, chồng chữ, cắt ảnh và menu.
8. Ghi báo cáo những gì đã chạy, kết quả, lỗi còn lại. Kiểm tra chưa thực hiện phải ghi “Chưa kiểm tra”, không tự báo đã đạt.

## 11. Lộ trình thực hiện

Ước lượng cho một người có nền tảng web và agent hỗ trợ, chưa tính thời gian tự sản xuất hình ảnh hoặc sửa nội dung cá nhân. Đây là giờ công, không phải lịch cam kết.

| Giai đoạn | Công việc | Đầu ra kiểm chứng | Ước lượng |
|---|---|---|---|
| 1. Nền móng | Khởi tạo, cấu hình site/base, content schema, URL helper | Build được dưới root và subpath | 3–5 giờ |
| 2. Giao diện cốt lõi | Token, font, layout, header/footer, hero, responsive | Trang chủ và About tĩnh hoàn chỉnh | 5–8 giờ |
| 3. Nội dung | Posts, projects, detail, tag, TOC, code, tìm kiếm | Thêm Markdown tạo được trang đúng | 6–9 giờ |
| 4. Motion | Reveal, parallax, fog, hover, progress, reduced motion | Chuyển động không ảnh hưởng đọc/thao tác | 4–7 giờ |
| 5. Hoàn thiện | SEO, RSS, sitemap, 404, asset optimization | Không lỗi route/asset, metadata đầy đủ | 3–5 giờ |
| 6. QA và bàn giao | Ma trận kiểm thử, workflow, README, screenshot | Source và hướng dẫn deploy dùng được | 4–6 giờ |
| Tổng | MVP đầy đủ | Portfolio sẵn sàng triển khai | 25–40 giờ |

Mốc duyệt nội bộ: sau giai đoạn 2 kiểm tra art direction bằng screenshot; sau giai đoạn 3 xác nhận chức năng; sau giai đoạn 6 mới coi là hoàn thành. Không dừng chờ người dùng sau từng mốc nếu công việc đã được giao trọn gói và không có câu hỏi chặn.

Mở rộng sau MVP: Lenis, chuyển trang nâng cao, một cảnh pin ngắn, theme sáng/tối, tiếng Anh, giscus hoặc CMS bên ngoài. Mỗi tính năng phải được cân nhắc chi phí và sự cần thiết; không đưa vào bản đầu tự động.

## 12. Phân công nếu dùng nhiều agent

| Agent | Phạm vi sở hữu | Hợp đồng phối hợp |
|---|---|---|
| Lead/integrator | Config, schema, URL helpers, package, workflow, tích hợp | Chốt interface và version trước khi chia việc |
| UI | Component, layout, CSS, các trang giới thiệu | Dùng token và kiểu dữ liệu đã thống nhất |
| Content | Post/project routes, tag, tìm kiếm, template | Lọc published qua utility chung; không sửa schema riêng |
| Motion/QA | Script motion, reduced motion, kiểm thử và báo cáo | Không đổi markup contract nếu chưa phối hợp |

Một file chỉ có một owner tại một thời điểm. Nếu chỉ có một agent, triển khai tuần tự theo giai đoạn. Lead chịu trách nhiệm chạy lại toàn bộ kiểm tra sau tích hợp; không coi phần việc riêng lẻ là website hoàn chỉnh.

## 13. Bộ bàn giao cần có

- Mã nguồn chạy được, lockfile, cấu hình Node và `.gitignore` phù hợp.
- Ít nhất 3 bài Markdown mẫu và 2 dự án mẫu, gắn nhãn minh bạch; không giả làm thành tích thật.
- `README.md`: cài/chạy/build/preview, sửa thông tin cá nhân, đăng bài, thêm ảnh, thêm dự án, đổi base, bật Pages, khắc phục lỗi thường gặp.
- `ASSETS.md`: nguồn, giấy phép, asset placeholder cần thay.
- Workflow Pages, template bài/dự án, báo cáo kiểm thử và screenshot QA.
- Danh sách còn cần người dùng điền: GitHub username/repo, email, avatar, ảnh dự án, link demo và nội dung giới thiệu.

## 14. Prompt giao việc cho agent

```text
Hãy triển khai portfolio theo AGENTS.md trong repository này. Đọc toàn bộ tài liệu và kiểm tra source hiện có trước. Tạo IMPLEMENTATION_PLAN.md rồi thực hiện đủ MVP qua sáu giai đoạn, ưu tiên Astro static + Markdown Content Collections + GitHub Pages.

Giữ phong cách kiếm hiệp sơn thủy và mực tàu, nhiều chuyển động tinh tế nhưng dễ đọc, responsive và tôn trọng reduced motion. Đảm bảo mọi URL/asset hoạt động dưới root lẫn project base path; không xây backend hoặc SPA fallback.

Chủ động dùng placeholder có nhãn khi thiếu dữ liệu, không bịa thành tích/liên kết. Chạy các kiểm tra bắt buộc, xem screenshot, sửa lỗi, ghi trung thực phần chưa kiểm tra. Bàn giao source, hướng dẫn đăng bài Markdown và workflow GitHub Pages. Chuẩn bị deploy; chỉ publish khi đã được yêu cầu. Tiếp tục đến khi MVP hoàn chỉnh, chỉ hỏi khi gặp trở ngại không thể giải quyết từ repo và tài liệu.
```

## 15. Tài liệu kỹ thuật tham chiếu

Đối chiếu tài liệu chính thức ngày 30/10/2026; khi triển khai phải xác nhận API/action tương thích với phiên bản thực tế được cài.

- Astro Markdown: https://docs.astro.build/en/guides/markdown-content/
- Astro Content Collections: https://docs.astro.build/en/guides/content-collections/
- Astro GitHub Pages: https://docs.astro.build/en/guides/deploy/github/
- GitHub Pages giới hạn: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

Không khóa sẵn số phiên bản framework hay GitHub Action từ bản kế hoạch; agent phải chọn bản ổn định hiện hành tương thích và ghi lại trong source/lockfile.
