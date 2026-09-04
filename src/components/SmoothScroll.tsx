'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function SmoothScroll() {
  useEffect(() => {
    const initLenis = () => {
      if (typeof (window as any).Lenis === 'undefined' || (window as any).__lenis) return;

      const lenis = new (window as any).Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      (window as any).__lenis = lenis;

      if (typeof (window as any).ScrollTrigger !== 'undefined') {
        lenis.on('scroll', (window as any).ScrollTrigger.update);
      }

      if (typeof (window as any).gsap !== 'undefined' && (window as any).gsap.ticker) {
        (window as any).gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
      } else {
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };

    if ((window as any).Lenis) {
      initLenis();
    }
  }, []);

  return (
    <Script
      src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof (window as any).Lenis !== 'undefined' && !(window as any).__lenis) {
          const lenis = new (window as any).Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
          });

          (window as any).__lenis = lenis;

          if (typeof (window as any).ScrollTrigger !== 'undefined') {
            lenis.on('scroll', (window as any).ScrollTrigger.update);
          }

          if (typeof (window as any).gsap !== 'undefined' && (window as any).gsap.ticker) {
            (window as any).gsap.ticker.add((time: number) => {
              lenis.raf(time * 1000);
            });
          } else {
            function raf(time: number) {
              lenis.raf(time);
              requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
          }
        }
      }}
    />
  );
}
