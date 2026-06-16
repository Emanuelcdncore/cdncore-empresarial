import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

type NodeLogoItem = { node: React.ReactNode; title?: string; href?: string; ariaLabel?: string };
type ImageLogoItem = { src: string; alt?: string; title?: string; href?: string; srcSet?: string; sizes?: string; width?: number; height?: number };
type LogoItem = NodeLogoItem | ImageLogoItem;

const toCssLength = (v: number | string | undefined) =>
  typeof v === 'number' ? `${v}px` : v ?? undefined;

const useResizeObserver = (
  callback: () => void,
  elements: React.RefObject<HTMLElement | null>[],
  deps: unknown[]
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback);
      callback();
      return () => window.removeEventListener('resize', callback);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const obs = new ResizeObserver(callback);
      obs.observe(ref.current);
      return obs;
    });
    callback();
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps]);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  deps: unknown[]
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll<HTMLImageElement>('img') ?? [];
    if (images.length === 0) { onLoad(); return; }
    let remaining = images.length;
    const handle = () => { if (--remaining === 0) onLoad(); };
    images.forEach((img) => {
      if (img.complete) handle();
      else {
        img.addEventListener('load', handle, { once: true });
        img.addEventListener('error', handle, { once: true });
      }
    });
    return () => images.forEach((img) => {
      img.removeEventListener('load', handle);
      img.removeEventListener('error', handle);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, seqRef, ...deps]);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0,${-offsetRef.current}px,0)`
        : `translate3d(${-offsetRef.current}px,0,0)`;
    }

    const animate = (ts: number) => {
      if (lastTs.current === null) lastTs.current = ts;
      const dt = Math.max(0, ts - lastTs.current) / 1000;
      lastTs.current = ts;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * ease;

      if (seqSize > 0) {
        let next = ((offsetRef.current + velocityRef.current * dt) % seqSize + seqSize) % seqSize;
        offsetRef.current = next;
        track.style.transform = isVertical
          ? `translate3d(0,${-next}px,0)`
          : `translate3d(${-next}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTs.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoLoop = memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    return 0;
  }, [hoverSpeed]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dir = isVertical
      ? direction === 'up' ? 1 : -1
      : direction === 'left' ? 1 : -1;
    return mag * dir * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const cw = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect();
    const sw = rect?.width ?? 0;
    const sh = rect?.height ?? 0;

    if (isVertical) {
      const ph = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && ph > 0) {
        containerRef.current.style.height = `${Math.ceil(ph)}px`;
      }
      if (sh > 0) {
        setSeqHeight(Math.ceil(sh));
        const vp = containerRef.current?.clientHeight ?? ph ?? sh;
        setCopyCount(Math.max(MIN_COPIES, Math.ceil(vp / sh) + COPY_HEADROOM));
      }
    } else if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      setCopyCount(Math.max(MIN_COPIES, Math.ceil(cw / sw) + COPY_HEADROOM));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const cssVars = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
  }), [gap, logoHeight, fadeOutColor]);

  const rootClass = useMemo(() => [
    'logoloop',
    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className,
  ].filter(Boolean).join(' '), [isVertical, fadeOut, scaleOnHover, className]);

  const handleEnter = useCallback(() => { if (hoverSpeed !== undefined) setIsHovered(true); }, [hoverSpeed]);
  const handleLeave = useCallback(() => { if (hoverSpeed !== undefined) setIsHovered(false); }, [hoverSpeed]);

  const renderLogoItem = useCallback((item: LogoItem, key: React.Key) => {
    if (renderItem) {
      return <li className="logoloop__item" key={key} role="listitem">{renderItem(item, key)}</li>;
    }
    const isNode = 'node' in item;
    const content = isNode ? (
      <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>{item.node}</span>
    ) : (
      <img src={item.src} srcSet={item.srcSet} sizes={item.sizes} width={item.width} height={item.height} alt={item.alt ?? ''} title={item.title} loading="lazy" decoding="async" draggable={false} />
    );
    const label = isNode ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
    const inner = item.href ? (
      <a className="logoloop__link" href={item.href} aria-label={label || 'logo link'} target="_blank" rel="noreferrer noopener">{content}</a>
    ) : content;
    return <li className="logoloop__item" key={key} role="listitem">{inner}</li>;
  }, [renderItem]);

  const lists = useMemo(() => Array.from({ length: copyCount }, (_, ci) => (
    <ul
      className="logoloop__list"
      key={`copy-${ci}`}
      role="list"
      aria-hidden={ci > 0}
      ref={ci === 0 ? seqRef : undefined}
    >
      {logos.map((item, ii) => renderLogoItem(item, `${ci}-${ii}`))}
    </ul>
  )), [copyCount, logos, renderLogoItem]);

  const containerStyle = useMemo(() => ({
    width: isVertical
      ? toCssLength(width) === '100%' ? undefined : toCssLength(width)
      : (toCssLength(width) ?? '100%'),
    ...(cssVars as React.CSSProperties),
    ...style,
  }), [width, cssVars, style, isVertical]);

  return (
    <div ref={containerRef} className={rootClass} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div className="logoloop__track" ref={trackRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {lists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
