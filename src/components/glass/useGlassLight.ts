import { useEffect, useRef, useState } from 'react';

export function useGlassLight(interactive: boolean) {
  const ref = useRef<HTMLElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setIsInteractive(interactive && !reduced && finePointer);
  }, [interactive]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isInteractive) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--glass-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--glass-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty('--glass-x', '50%');
      el.style.setProperty('--glass-y', '50%');
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isInteractive]);

  return ref;
}
