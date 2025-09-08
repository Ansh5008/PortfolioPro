import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
}

export function ScrollTriggerWrapper({
  children,
  animation = 'fadeIn',
  trigger,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  duration = 1,
  delay = 0,
  stagger = 0,
  className = '',
}: ScrollTriggerProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const triggerElement = trigger ? document.querySelector(trigger) : element;
    if (!triggerElement) return;

    // Set initial state based on animation type
    const initialState: any = { opacity: 0 };
    const animateToState: any = { opacity: 1, duration, delay };

    switch (animation) {
      case 'slideUp':
        initialState.y = 50;
        animateToState.y = 0;
        break;
      case 'slideLeft':
        initialState.x = 50;
        animateToState.x = 0;
        break;
      case 'slideRight':
        initialState.x = -50;
        animateToState.x = 0;
        break;
      case 'scale':
        initialState.scale = 0.8;
        animateToState.scale = 1;
        break;
    }

    gsap.set(element, initialState);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start,
          end,
          scrub,
          toggleActions: 'play none none reverse',
        },
      });

      if (stagger > 0) {
        const children = element.children;
        tl.to(children, { ...animateToState, stagger });
      } else {
        tl.to(element, animateToState);
      }
    }, element);

    return () => ctx.revert();
  }, [animation, trigger, start, end, scrub, duration, delay, stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}