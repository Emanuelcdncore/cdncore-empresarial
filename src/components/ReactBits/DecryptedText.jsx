import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const styles = { wrapper: { display: 'inline-block', whiteSpace: 'pre-wrap' }, srOnly: { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 } };

export default function DecryptedText({ text, speed = 50, maxIterations = 10, sequential = false, revealDirection = 'start', useOriginalCharsOnly = false, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+', className = '', parentClassName = '', encryptedClassName = '', animateOn = 'hover', clickMode = 'once', ...props }) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const [direction, setDirection] = useState('forward');
  const containerRef = useRef(null);
  const orderRef = useRef([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef(null);

  const availableChars = useMemo(() => useOriginalCharsOnly ? Array.from(new Set(text.split(''))).filter(c => c !== ' ') : characters.split(''), [useOriginalCharsOnly, text, characters]);
  const shuffleText = useCallback((orig, revealed) => orig.split('').map((c, i) => { if (c === ' ') return ' '; if (revealed.has(i)) return orig[i]; return availableChars[Math.floor(Math.random() * availableChars.length)]; }).join(''), [availableChars]);
  const fillAllIndices = useCallback(() => { const s = new Set(); for (let i = 0; i < text.length; i++) s.add(i); return s; }, [text]);
  const removeRandomIndices = useCallback((set, count) => { const arr = Array.from(set); for (let i = 0; i < count && arr.length > 0; i++) arr.splice(Math.floor(Math.random() * arr.length), 1); return new Set(arr); }, []);
  const computeOrder = useCallback(len => { const o = []; if (revealDirection === 'start') { for (let i = 0; i < len; i++) o.push(i); } else if (revealDirection === 'end') { for (let i = len-1; i >= 0; i--) o.push(i); } else { const m = Math.floor(len/2); let off = 0; while (o.length < len) { const idx = off % 2 === 0 ? m + off/2 : m - Math.ceil(off/2); if (idx >= 0 && idx < len) o.push(idx); off++; } } return o.slice(0, len); }, [revealDirection]);
  const triggerDecrypt = useCallback(() => { if (sequential) { orderRef.current = computeOrder(text.length); pointerRef.current = 0; setRevealedIndices(new Set()); } else { setRevealedIndices(new Set()); } setDirection('forward'); setIsAnimating(true); }, [sequential, computeOrder, text.length]);
  const encryptInstantly = useCallback(() => { const e = new Set(); setRevealedIndices(e); setDisplayText(shuffleText(text, e)); setIsDecrypted(false); }, [text, shuffleText]);

  useEffect(() => {
    if (!isAnimating) return;
    let currentIteration = 0;
    const getNextIndex = s => { switch (revealDirection) { case 'start': return s.size; case 'end': return text.length - 1 - s.size; default: { const m = Math.floor(text.length/2); const off = Math.floor(s.size/2); const ni = s.size % 2 === 0 ? m + off : m - off - 1; if (ni >= 0 && ni < text.length && !s.has(ni)) return ni; for (let i = 0; i < text.length; i++) if (!s.has(i)) return i; return 0; } } };
    intervalRef.current = setInterval(() => {
      setRevealedIndices(prev => {
        if (sequential) {
          if (direction === 'forward') { if (prev.size < text.length) { const ni = getNextIndex(prev); const nr = new Set(prev); nr.add(ni); setDisplayText(shuffleText(text, nr)); return nr; } else { clearInterval(intervalRef.current); setIsAnimating(false); setIsDecrypted(true); return prev; } }
          if (direction === 'reverse') { if (pointerRef.current < orderRef.current.length) { const idx = orderRef.current[pointerRef.current++]; const nr = new Set(prev); nr.delete(idx); setDisplayText(shuffleText(text, nr)); if (nr.size === 0) { clearInterval(intervalRef.current); setIsAnimating(false); setIsDecrypted(false); } return nr; } else { clearInterval(intervalRef.current); setIsAnimating(false); setIsDecrypted(false); return prev; } }
        } else {
          if (direction === 'forward') { setDisplayText(shuffleText(text, prev)); currentIteration++; if (currentIteration >= maxIterations) { clearInterval(intervalRef.current); setIsAnimating(false); setDisplayText(text); setIsDecrypted(true); } return prev; }
          if (direction === 'reverse') { let cs = prev.size === 0 ? fillAllIndices() : prev; const rc = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations))); const ns = removeRandomIndices(cs, rc); setDisplayText(shuffleText(text, ns)); currentIteration++; if (ns.size === 0 || currentIteration >= maxIterations) { clearInterval(intervalRef.current); setIsAnimating(false); setIsDecrypted(false); setDisplayText(shuffleText(text, new Set())); return new Set(); } return ns; }
        }
        return prev;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, direction, fillAllIndices, removeRandomIndices]);

  useEffect(() => { if (animateOn !== 'view' && animateOn !== 'inViewHover') return; const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting && !hasAnimated) { triggerDecrypt(); setHasAnimated(true); } }), { threshold: 0.1 }); const el = containerRef.current; if (el) obs.observe(el); return () => { if (el) obs.unobserve(el); }; }, [animateOn, hasAnimated, triggerDecrypt]);
  useEffect(() => { if (animateOn === 'click') { encryptInstantly(); } else { setDisplayText(text); setIsDecrypted(true); } setRevealedIndices(new Set()); setDirection('forward'); }, [animateOn, text, encryptInstantly]);

  const triggerHoverDecrypt = useCallback(() => { if (isAnimating) return; setRevealedIndices(new Set()); setIsDecrypted(false); setDisplayText(text); setDirection('forward'); setIsAnimating(true); }, [isAnimating, text]);
  const resetToPlainText = useCallback(() => { clearInterval(intervalRef.current); setIsAnimating(false); setRevealedIndices(new Set()); setDisplayText(text); setIsDecrypted(true); setDirection('forward'); }, [text]);
  const handleClick = () => { if (animateOn !== 'click') return; if (clickMode === 'once') { if (isDecrypted) return; triggerDecrypt(); } if (clickMode === 'toggle') { if (isDecrypted) { const fa = fillAllIndices(); setRevealedIndices(fa); setDisplayText(shuffleText(text, fa)); if (sequential) { orderRef.current = computeOrder(text.length).slice().reverse(); pointerRef.current = 0; } setDirection('reverse'); setIsAnimating(true); } else { setDirection('forward'); triggerDecrypt(); } } };
  const animateProps = animateOn === 'hover' || animateOn === 'inViewHover' ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText } : animateOn === 'click' ? { onClick: handleClick } : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...animateProps} {...props}>
      <span style={styles.srOnly}>{displayText}</span>
      <span aria-hidden="true">{displayText.split('').map((char, index) => { const revealed = revealedIndices.has(index) || (!isAnimating && isDecrypted); return <span key={index} className={revealed ? className : encryptedClassName}>{char}</span>; })}</span>
    </motion.span>
  );
}
