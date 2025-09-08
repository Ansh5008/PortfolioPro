import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollNavbarProps {
  children: React.ReactNode;
  className?: string;
  hideOnScroll?: boolean;
  backgroundOnScroll?: boolean;
}

export function ScrollNavbar({
  children,
  className = '',
  hideOnScroll = false,
  backgroundOnScroll = true,
}: ScrollNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      // Hide/show navbar on scroll
      if (hideOnScroll) {
        ScrollTrigger.create({
          start: 'top -80',
          end: 99999,
          onUpdate: (self) => {
            if (self.direction === -1) {
              gsap.to(nav, { yPercent: 0, duration: 0.3 });
            } else {
              gsap.to(nav, { yPercent: -100, duration: 0.3 });
            }
          },
        });
      }

      // Background change on scroll
      if (backgroundOnScroll) {
        ScrollTrigger.create({
          start: 'top -1',
          end: 99999,
          onToggle: (self) => {
            setIsScrolled(self.isActive);
          },
        });
      }

      // Scroll progress indicator
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, [hideOnScroll, backgroundOnScroll]);

  return (
    <>
      <div
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && backgroundOnScroll
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700'
            : 'bg-transparent'
        } ${className}`}
      >
        {children}
        
        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
      
      {/* Spacer to prevent content jump */}
      <div className="h-16" />
    </>
  );
}

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-700 ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}