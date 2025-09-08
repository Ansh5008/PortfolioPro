import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

let lenis: Lenis | null = null;

// Advanced Lenis configuration matching lenis.darkroom.engineering
export function useLenis() {
  useEffect(() => {
    // Add lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis');
    
    // Initialize Lenis with advanced settings
    lenis = new Lenis({
      // Duration for programmatic scrolling (not affecting smooth scroll physics)
      duration: 1.2,
      
      // Custom easing function for natural feel - exponential ease out
      easing: (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      
      // Lerp intensity (0-1) - lower values create smoother, more delayed scroll
      lerp: 0.1,
      
      // Mouse wheel multiplier
      wheelMultiplier: 1,
      
      // Touch scroll multiplier
      touchMultiplier: 2,
      
      // Disable infinite scroll
      infinite: false,
      
      // Orientation (vertical scrolling)
      orientation: 'vertical' as const,
      
      // Gesture direction
      gestureOrientation: 'vertical' as const,
      
      // Smooth scroll physics
      smoothWheel: true,
      
      // Normalize wheel delta across browsers
      normalizeWheel: true,
      
      // Auto-resize on window resize
      autoResize: true,
    });

    // RAF loop for smooth animation frame updates
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger integration - sync with Lenis scroll
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
      // Update GSAP ScrollTrigger
      gsap.ticker.tick();
      
      // Custom scroll event for advanced animations
      document.dispatchEvent(new CustomEvent('lenisScroll', {
        detail: { scroll, limit, velocity, direction, progress }
      }));
    });

    // Prevent default scroll behavior on programmatic scrolling
    const preventScroll = (e: Event) => {
      if (lenis?.isScrolling) {
        e.preventDefault();
      }
    };

    // Handle window resize
    const handleResize = () => {
      lenis?.resize();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      document.documentElement.classList.remove('lenis');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', preventScroll);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return lenis;
}

// Enhanced scrollTo function with advanced options
export function scrollTo(target: string | number, options?: {
  offset?: number;
  lerp?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: () => void;
}) {
  if (!lenis) return;
  
  const defaultOptions = {
    offset: 0,
    lerp: 0.1,
    duration: 1.2,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    immediate: false,
    lock: false,
    force: false,
  };

  const finalOptions = { ...defaultOptions, ...options };
  
  lenis.scrollTo(target, finalOptions);
}

// Get current Lenis instance
export function getLenis() {
  return lenis;
}

// Utility functions for advanced scroll control
export function stopScroll() {
  lenis?.stop();
}

export function startScroll() {
  lenis?.start();
}

export function getScrollProgress() {
  if (!lenis) return 0;
  return lenis.progress || 0;
}

export function getScrollVelocity() {
  if (!lenis) return 0;
  return lenis.velocity || 0;
}