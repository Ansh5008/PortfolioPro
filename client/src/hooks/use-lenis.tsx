import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

let lenis: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    // Initialize Lenis
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Integrate with GSAP
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger integration
    lenis.on('scroll', (e: any) => {
      gsap.ticker.tick();
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return lenis;
}

export function scrollTo(target: string | number, options?: any) {
  lenis?.scrollTo(target, options);
}

export function getLenis() {
  return lenis;
}