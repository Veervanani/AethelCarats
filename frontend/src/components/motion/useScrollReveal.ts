import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    let observer: IntersectionObserver | null = null;

    const startObserving = () => {
      if (observer) observer.disconnect();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fj-reveal-active');
              if (observer) {
                observer.unobserve(entry.target);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      const elements = document.querySelectorAll('.fj-reveal, .fj-reveal-img');
      elements.forEach((el) => {
        if (!el.classList.contains('fj-reveal-active')) {
          observer?.observe(el);
        }
      });
    };

    // Delay observer initialization until DOM layout and image heights have stabilized (450ms)
    const timer = setTimeout(startObserving, 450);

    // Also re-sync after window load and on resize/route change
    window.addEventListener('load', startObserving);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', startObserving);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
};
