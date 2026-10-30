/**
 * Script điều khiển chuyển động, IntersectionObserver Reveal và Reading Progress
 */

export function initMotion() {
  // Đánh dấu JS đã sẵn sàng
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js-ready');

  const prefersReduced =
    document.documentElement.getAttribute('data-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal section khi cuộn
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    // Nếu reduced-motion hoặc trình duyệt không hỗ trợ IO: hiện ngay lập tức
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Chỉ chạy một lần
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // 2. Reading Progress Bar (nếu có trên trang bài viết)
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    let ticking = false;

    function updateProgress() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        progressBar!.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
      }
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(updateProgress);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // 3. Tạm dừng chuyển động lặp khi chuyển tab ẩn
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.body.classList.add('tab-paused');
    } else {
      document.body.classList.remove('tab-paused');
    }
  });
}

// Chạy khởi tạo
if (typeof window !== 'undefined') {
  initMotion();
}
