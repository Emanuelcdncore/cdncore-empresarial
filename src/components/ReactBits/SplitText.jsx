import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'chars',
  tag = 'p',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef(null);

  const parts = useMemo(() => {
    if (!text) return [];
    if (splitType === 'words') {
      return text.split(' ').map((w, i) => ({ text: w, index: i, space: i > 0 }));
    }
    return text.split('').map((c, i) => ({ text: c, index: i, space: false }));
  }, [text, splitType]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll('.st-unit');
    if (!spans.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onComplete: onLetterAnimationComplete,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, delay, duration, ease]);

  const Tag = tag || 'p';
  return (
    <Tag ref={containerRef} className={className}>
      {parts.map(({ text: t, index, space }) => (
        <span key={index} style={{ display: 'inline-block' }}>
          {space && <span>&nbsp;</span>}
          <span className="st-unit" style={{ display: 'inline-block', willChange: 'transform, opacity' }}>{t}</span>
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
