export interface SiteConfig {
  siteUrl: string;
  base: string;
  siteTitle: string;
  siteDescription: string;
  author: {
    displayName: string;
    fullName: string;
    role: string;
    bio: string;
    email: string;
    location: string;
    socials: {
      github?: string;
      linkedin?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  nav: Array<{
    label: string;
    path: string;
    sublabel?: string;
  }>;
}

export const siteConfig: SiteConfig = {
  siteUrl: import.meta.env.SITE || 'https://ArthurTran0222.github.io',
  base: import.meta.env.BASE_URL || '/',
  siteTitle: 'Arthur Heisenberg | Kiếm Khách Công Nghệ',
  siteDescription: 'Portfolio cá nhân & bút ký công nghệ mang mỹ học sơn thủy kiếm hiệp Where Winds Meet: mực tàu, sương khói và những dòng code chuẩn mực.',
  author: {
    displayName: 'Arthur Heisenberg',
    fullName: 'Trần Trọng Nghĩa',
    role: 'Sinh viên Công nghệ thông tin',
    bio: 'Bước vào chốn giang hồ công nghệ với nhiệt huyết tuổi trẻ, lấy code làm kiếm, lấy tư duy làm tâm pháp. Yêu thích thiết kế giao diện tinh tế, hiệu năng cao và giải pháp tĩnh bền vững.',
    // Email để trống mặc định; trang Contact sẽ hướng dẫn người dùng cấu hình địa chỉ thật
    email: '',
    location: 'Việt Nam',
    socials: {
      github: 'https://github.com/ArthurTran0222',
      linkedin: '',
      facebook: '',
    },
  },
  nav: [
    { label: 'Trang chủ', path: '/', sublabel: 'Khởi đầu' },
    { label: 'Giới thiệu', path: '/about/', sublabel: 'Hành trình' },
    { label: 'Dự án', path: '/projects/', sublabel: 'Tác phẩm' },
    { label: 'Bài viết', path: '/posts/', sublabel: 'Bút ký' },
    { label: 'Liên hệ', path: '/contact/', sublabel: 'Kết giao' },
  ],
};
