import { useEffect, useRef, useState } from 'react';
import locationPin from '@/assets/Location_Pin_Core.png';

declare global { interface Window { L: any } }

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS  = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const LAT = 40.22831908063358;
const LNG = -7.49888183428806;
const MIN_ZOOM = 10;
const MAX_ZOOM = 19;
const DEFAULT_ZOOM = 15;

const DARK_TILES  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

function loadScript(src: string) {
  return new Promise<void>((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = () => res(); s.onerror = rej;
    document.head.appendChild(s);
  });
}
function loadStyle(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = href;
  document.head.appendChild(l);
}

export function CustomMap() {
  const mapRef       = useRef<HTMLDivElement>(null);
  const instanceRef  = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');

    const init = () => {
      if (!window.L || !mapRef.current || instanceRef.current) return;
      const map = window.L.map(mapRef.current, {
        zoomControl: false, attributionControl: false,
        dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
        keyboard: false, touchZoom: false, boxZoom: false,
      }).setView([LAT, LNG], DEFAULT_ZOOM);

      tileLayerRef.current = window.L.tileLayer(isDark ? DARK_TILES : LIGHT_TILES, {
        subdomains: 'abcd', maxZoom: MAX_ZOOM, tileSize: 512, zoomOffset: -1,
      }).addTo(map);

      const icon = window.L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="position:relative;width:64px;height:64px;pointer-events:none;">
          <div class="marker-pulse" style="position:absolute;top:32px;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:linear-gradient(to right,rgba(139,92,246,0.2),rgba(236,72,153,0.2));pointer-events:none;z-index:0;"></div>
          <img src="${locationPin}" alt="" style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:30px;height:40px;z-index:1;pointer-events:none;" />
        </div>`,
        iconSize: [64, 64], iconAnchor: [32, 52], popupAnchor: [0, -52],
      });

      window.L.marker([LAT, LNG], { icon }).addTo(map)
        .bindPopup('CDNCore — Parkurbis, Covilhã');

      map.on('zoomend', () => setZoom(map.getZoom()));
      instanceRef.current = map;
    };

    loadStyle(LEAFLET_CSS);
    loadScript(LEAFLET_JS).then(() => setTimeout(init, 50)).catch(console.error);

    return () => {
      if (instanceRef.current) { try { instanceRef.current.remove(); } catch {} instanceRef.current = null; }
    };
  }, []);

  // Swap tile layer when theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (!instanceRef.current || !window.L) return;
      const isDark = document.documentElement.classList.contains('dark');
      if (tileLayerRef.current) { instanceRef.current.removeLayer(tileLayerRef.current); }
      tileLayerRef.current = window.L.tileLayer(isDark ? DARK_TILES : LIGHT_TILES, {
        subdomains: 'abcd', maxZoom: MAX_ZOOM, tileSize: 512, zoomOffset: -1,
      }).addTo(instanceRef.current);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const btnStyle: React.CSSProperties = {
    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(13,17,22,0.85)', border: '1px solid rgba(139,92,246,0.4)',
    backdropFilter: 'blur(8px)', color: '#d4d4d8', fontSize: 18,
    fontFamily: 'monospace', lineHeight: 1, cursor: 'pointer', transition: 'all 0.2s',
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 250, overflow: 'hidden' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* Online badge */}
      <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 8, zIndex: 1000 }}>
        <div style={{ width: 8, height: 8, background: '#34d399', borderRadius: '50%', animation: 'map-pulse 1.5s ease-in-out infinite' }} />
        <span style={{ color: '#34d399', fontFamily: 'monospace', fontSize: 12 }}>ONLINE</span>
      </div>

      {/* Zoom controls */}
      <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', flexDirection: 'column', gap: 2, zIndex: 1000 }}>
        <button onClick={() => instanceRef.current?.zoomIn()} disabled={zoom >= MAX_ZOOM}
          style={{ ...btnStyle, borderRadius: '6px 6px 0 0', opacity: zoom >= MAX_ZOOM ? 0.4 : 1 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.35)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,17,22,0.85)'; e.currentTarget.style.color = '#d4d4d8'; }}
          aria-label="Zoom in">+</button>
        <button onClick={() => instanceRef.current?.zoomOut()} disabled={zoom <= MIN_ZOOM}
          style={{ ...btnStyle, borderRadius: '0 0 6px 6px', opacity: zoom <= MIN_ZOOM ? 0.4 : 1 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.35)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,17,22,0.85)'; e.currentTarget.style.color = '#d4d4d8'; }}
          aria-label="Zoom out">−</button>
      </div>

      {/* Open in Maps */}
      <a href="https://www.google.com/maps/search/?api=1&query=40.22831908063358,-7.49888183428806"
        target="_blank" rel="noopener noreferrer"
        className="map-open-btn"
        style={{ position: 'absolute', bottom: 14, left: 14, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 6, background: 'rgba(139,92,246,0.25)',
          border: '1px solid rgba(139,92,246,0.4)', backdropFilter: 'blur(8px)',
          fontSize: 12, fontFamily: 'monospace', textDecoration: 'none', transition: 'all 0.2s' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Open in Maps
      </a>

      <style>{`
        @keyframes map-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.2);opacity:.7} }
        @keyframes map-ping { 0%{transform:translate(-50%,-50%) scale(1);opacity:1} 75%,100%{transform:translate(-50%,-50%) scale(2);opacity:0} }
        .marker-pulse { animation: map-ping 1.5s cubic-bezier(0,0,.2,1) infinite; }
        .leaflet-container { background: transparent !important; border: none !important; }
        .leaflet-tile-pane img { border: none !important; }
        /* dark mode */
        .map-open-btn { color: #d4d4d8; }
        .map-open-btn:hover { background: rgba(139,92,246,0.45) !important; color: #fff; }
        /* light mode */
        html:not(.dark) .map-open-btn { color: #111; }
        html:not(.dark) .map-open-btn:hover { color: #111; }
        /* pin image: white by default, black in light mode */
        html:not(.dark) .custom-map-marker img { filter: invert(1); }
      `}</style>
    </div>
  );
}
