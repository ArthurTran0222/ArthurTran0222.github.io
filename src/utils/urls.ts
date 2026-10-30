import { siteConfig } from '../config/site';

/**
 * Trả về base path hiện hành (ví dụ: '/' hoặc '/portfolio-test/')
 */
export function getBasePath(): string {
  const base = import.meta.env.BASE_URL || '/';
  if (!base.startsWith('/')) {
    return `/${base}`;
  }
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * URL helper duy nhất cho các liên kết nội bộ và public assets.
 * - Không prefix base hai lần.
 * - External URL (http://, https://), anchor (#), mailto: và tel: được giữ nguyên vẹn.
 * - Chuẩn hóa trailing slash cho các trang nội bộ (không áp dụng cho file tĩnh có đuôi mở rộng).
 */
export function withBase(path: string): string {
  if (!path) return getBasePath();

  // Giữ nguyên các URL ngoại bộ, hash, mailto, tel
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('#') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }

  const base = getBasePath();

  // Loại bỏ base nếu đường dẫn đã vô tình chứa base từ trước
  let cleanPath = path;
  if (base !== '/' && cleanPath.startsWith(base)) {
    cleanPath = cleanPath.slice(base.length);
  }

  // Loại bỏ dấu gạch chéo đầu
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }

  // Nếu là root path
  if (!cleanPath) {
    return base;
  }

  // Tách query params hoặc hash nếu có
  const [pathname, ...rest] = cleanPath.split(/(?=[?#])/);
  const suffix = rest.join('');

  // Kiểm tra xem pathname có phải là file tĩnh có đuôi mở rộng không (ví dụ .svg, .css, .jpg)
  const isFile = /\.[a-zA-Z0-9]+$/.test(pathname);

  let formattedPath = pathname;
  if (!isFile && !formattedPath.endsWith('/')) {
    formattedPath = `${formattedPath}/`;
  }

  return `${base}${formattedPath}${suffix}`;
}

/**
 * Tạo URL tuyệt đối chính xác cho Canonical, Open Graph, RSS và Sitemap
 */
export function toAbsoluteUrl(path: string): string {
  const relativeWithBase = withBase(path);
  if (relativeWithBase.startsWith('http://') || relativeWithBase.startsWith('https://')) {
    return relativeWithBase;
  }

  const rawOrigin = siteConfig.siteUrl || 'https://arthur-heisenberg.github.io';
  const origin = rawOrigin.replace(/\/+$/, '');
  const cleanRelative = relativeWithBase.startsWith('/') ? relativeWithBase : `/${relativeWithBase}`;

  return `${origin}${cleanRelative}`;
}
