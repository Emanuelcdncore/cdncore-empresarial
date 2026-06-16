import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseBlur = 4,
  containerClassName = '',
  textClassName = '',
  wordAnimationEnd = 'bottom 85%',
}) {
  const containerRef = useRef(null);

  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, i) => ({ word, index: i }));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scroller = scrollContainerRef?.current ?? window;
    const wordEls = el.querySelectorAll('.sr-word');

    gsap.fromTo(
      wordEls,
      { opacity: baseOpacity, filter: enableBlur ? `blur(${baseBlur}px)` : 'none' },
      {
        opacity: 1,
        filter: enableBlur ? 'blur(0px)' : 'none',
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 80%',
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); });
    };
  }, [scrollContainerRef, enableBlur, baseOpacity, baseBlur, wordAnimationEnd]);

  return (
    <p ref={containerRef} className={`scroll-reveal-container ${containerClassName}`}>
      {words.map(({ word, index }) =>
        /^\s+$/.test(word)
          ? <span key={index}>{word}</span>
          : <span key={index} className={`sr-word inline-block ${textClassName}`}>{word}</span>
      )}
    </p>
  );
}
