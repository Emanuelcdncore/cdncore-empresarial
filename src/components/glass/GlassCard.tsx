import React from 'react';
import { clsx } from 'clsx';
import { useGlassLight } from './useGlassLight';
import './GlassCard.css';

type GlassVariant = 'frosted' | 'surface' | 'nav' | 'inset';
type GlassGlow = 'purple' | 'cyan' | 'neutral' | 'brand';
type GlassPadding = 'none' | 'sm' | 'md' | 'lg';
type GlassRadius = 'md' | 'lg' | 'pill';
type GlassBorder = 'subtle' | 'luminous' | 'none';

const glowClass: Record<GlassGlow, string> = {
  purple: 'glass-card--glow-purple',
  cyan: 'glass-card--glow-cyan',
  neutral: 'glass-card--glow-neutral',
  brand: 'glass-card--glow-brand',
};

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: GlassVariant;
  interactive?: boolean;
  glow?: GlassGlow;
  padding?: GlassPadding;
  radius?: GlassRadius;
  border?: GlassBorder;
  as?: 'div' | 'article' | 'section';
}

export function GlassCard({
  children,
  variant = 'surface',
  interactive = true,
  glow = 'purple',
  padding = 'md',
  radius = 'md',
  border = 'luminous',
  as: Component = 'div',
  className,
  ...rest
}: GlassCardProps) {
  const lightRef = useGlassLight(interactive && variant !== 'inset');
  const isInteractive = interactive && variant !== 'inset';

  return (
    <Component
      ref={lightRef as React.Ref<HTMLDivElement>}
      className={clsx(
        'glass-card',
        `glass-card--${variant}`,
        glowClass[glow],
        `glass-card--padding-${padding}`,
        radius !== 'md' && `glass-card--radius-${radius}`,
        border !== 'luminous' && `glass-card--border-${border}`,
        isInteractive && 'glass-card--interactive',
        className
      )}
      {...rest}
    >
      <div className="glass-card__backdrop" aria-hidden="true" />
      <div className="glass-card__fill" aria-hidden="true" />
      <div className="glass-card__glow" aria-hidden="true" />
      {isInteractive && <div className="glass-card__ambient" aria-hidden="true" />}
      {border !== 'none' && <div className="glass-card__border" aria-hidden="true" />}
      <div className="glass-card__inner">{children}</div>
    </Component>
  );
}

export default GlassCard;
