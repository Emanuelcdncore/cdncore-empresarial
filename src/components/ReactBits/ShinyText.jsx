import { useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 2, className = '', color = '#b5b5b5', shineColor = '#ffffff', spread = 120, yoyo = false, pauseOnHover = false, direction = 'left', delay = 0 }) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);
  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame(time => {
    if (disabled || isPaused) { lastTimeRef.current = null; return; }
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return; }
    elapsedRef.current += time - lastTimeRef.current;
    lastTimeRef.current = time;
    const cycleDuration = animationDuration + delayDuration;
    if (yoyo) {
      const fullCycle = cycleDuration * 2;
      const ct = elapsedRef.current % fullCycle;
      if (ct < animationDuration) progress.set(directionRef.current === 1 ? (ct / animationDuration) * 100 : 100 - (ct / animationDuration) * 100);
      else if (ct < cycleDuration) progress.set(directionRef.current === 1 ? 100 : 0);
      else if (ct < cycleDuration + animationDuration) { const rt = ct - cycleDuration; progress.set(directionRef.current === 1 ? 100 - (rt / animationDuration) * 100 : (rt / animationDuration) * 100); }
      else progress.set(directionRef.current === 1 ? 0 : 100);
    } else {
      const ct = elapsedRef.current % cycleDuration;
      progress.set(ct < animationDuration ? (directionRef.current === 1 ? (ct / animationDuration) * 100 : 100 - (ct / animationDuration) * 100) : (directionRef.current === 1 ? 100 : 0));
    }
  });

  const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);
  return (
    <motion.span className={`shiny-text ${className}`} style={{ backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundPosition }}
      onMouseEnter={() => { if (pauseOnHover) setIsPaused(true); }} onMouseLeave={() => { if (pauseOnHover) setIsPaused(false); }}>
      {text}
    </motion.span>
  );
};

export default ShinyText;
