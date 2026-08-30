import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Sparkles, Crosshair, Zap, MousePointer2 } from 'lucide-react';

export type CursorStyleMode = 'shark' | 'cyber' | 'glow' | 'particles' | 'off';

interface BubbleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speedY: number;
}

interface WaterRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<CursorStyleMode>(() => {
    return (localStorage.getItem('preferred_cursor_mode') as CursorStyleMode) || 'shark';
  });

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [bubbles, setBubbles] = useState<BubbleParticle[]>([]);
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [sharkAngle, setSharkAngle] = useState(-45); // Natural pointer tilt
  const [tailWiggle, setTailWiggle] = useState(0);

  // Position references
  const cursorPosRef = useRef({ x: -100, y: -100 });
  const prevPosRef = useRef({ x: -100, y: -100 });
  const sharkDomRef = useRef<HTMLDivElement>(null);
  const followerDomRef = useRef<HTMLDivElement>(null);
  const followerPosRef = useRef({ x: -100, y: -100 });
  const bubbleIdRef = useRef(0);
  const rippleIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const currentAngleRef = useRef(-45);
  const speedRef = useRef(0);
  const lastMovedTimeRef = useRef(Date.now());

  // Detect touch devices
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Save mode preference & manage body cursor hiding
  useEffect(() => {
    localStorage.setItem('preferred_cursor_mode', cursorMode);
    
    if (!isTouchDevice && cursorMode !== 'off') {
      document.documentElement.classList.add('hide-default-cursor');
    } else {
      document.documentElement.classList.remove('hide-default-cursor');
    }

    return () => {
      document.documentElement.classList.remove('hide-default-cursor');
    };
  }, [cursorMode, isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice || cursorMode === 'off') return;

    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });

      if (!isVisible) setIsVisible(true);

      const dx = targetX - prevPosRef.current.x;
      const dy = targetY - prevPosRef.current.y;
      const dist = Math.hypot(dx, dy);
      speedRef.current = Math.min(25, dist);
      lastMovedTimeRef.current = Date.now();

      if (dist > 1.5) {
        // Calculate swimming heading angle towards motion direction
        const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        
        let diff = rawAngle - currentAngleRef.current;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        currentAngleRef.current += diff * 0.35;
        setSharkAngle(currentAngleRef.current);
        
        prevPosRef.current = { x: targetX, y: targetY };

        // Generate wake bubbles when shark swims
        if (Math.random() > 0.4) {
          const bubbleColors = ['#38bdf8', '#06b6d4', '#67e8f9', '#a5f3fc', '#ffffff'];
          const angleRad = (currentAngleRef.current * Math.PI) / 180;
          const newBubble: BubbleParticle = {
            id: ++bubbleIdRef.current,
            x: targetX - Math.cos(angleRad) * 44 + (Math.random() * 8 - 4),
            y: targetY - Math.sin(angleRad) * 44 + (Math.random() * 8 - 4),
            size: Math.random() * 4 + 2,
            color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
            opacity: 0.75,
            speedY: -(Math.random() * 1.5 + 0.4)
          };
          setBubbles((prev) => [...prev.slice(-24), newBubble]);
        }
      }

      // Check hovered interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor]'
        ) as HTMLElement | null;

        if (interactiveEl) {
          setIsHovered(true);
          const customLabel = interactiveEl.getAttribute('data-cursor');
          if (customLabel) {
            setHoverLabel(customLabel);
          } else if (interactiveEl.closest('#projects')) {
            setHoverLabel('HUNT');
          } else if (interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA') {
            setHoverLabel('TYPE');
          } else if (interactiveEl.tagName === 'A') {
            setHoverLabel('CHOMP');
          } else if (interactiveEl.tagName === 'BUTTON' || interactiveEl.getAttribute('role') === 'button') {
            setHoverLabel('STRIKE');
          } else {
            setHoverLabel('TARGET');
          }
        } else {
          setIsHovered(false);
          setHoverLabel(null);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple: WaterRipple = {
        id: ++rippleIdRef.current,
        x: e.clientX,
        y: e.clientY,
        color: '#38bdf8'
      };
      setRipples((prev) => [...prev.slice(-5), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // High performance animation loop
    let tickCount = 0;
    const render = () => {
      tickCount++;
      const sharkSpeed = 0.95; // Instantaneous pointer response for precision
      const followerSpeed = 0.22;

      cursorPosRef.current.x += (targetX - cursorPosRef.current.x) * sharkSpeed;
      cursorPosRef.current.y += (targetY - cursorPosRef.current.y) * sharkSpeed;

      followerPosRef.current.x += (targetX - followerPosRef.current.x) * followerSpeed;
      followerPosRef.current.y += (targetY - followerPosRef.current.y) * followerSpeed;

      // Idle swimming wiggle when standing still
      const timeSinceMove = Date.now() - lastMovedTimeRef.current;
      if (timeSinceMove > 100) {
        // Return gently to classic 45-degree pointer angle or gentle oscillation
        const targetIdleAngle = -45;
        let diff = targetIdleAngle - currentAngleRef.current;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        currentAngleRef.current += diff * 0.05;
        setSharkAngle(currentAngleRef.current);
      }

      // Tail oscillation
      const wiggleSpeed = speedRef.current > 2 ? 0.35 : 0.08;
      setTailWiggle(Math.sin(tickCount * wiggleSpeed) * (speedRef.current > 2 ? 14 : 6));

      if (sharkDomRef.current) {
        sharkDomRef.current.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0)`;
      }

      if (followerDomRef.current) {
        followerDomRef.current.style.transform = `translate3d(${followerPosRef.current.x}px, ${followerPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorMode, isTouchDevice, isVisible]);

  // Bubble animation
  useEffect(() => {
    if (bubbles.length === 0) return;
    const timer = setTimeout(() => {
      setBubbles((prev) =>
        prev
          .filter((b) => b.opacity > 0.08)
          .map((b) => ({
            ...b,
            y: b.y + b.speedY,
            opacity: b.opacity * 0.84,
            size: Math.max(0.6, b.size * 0.92)
          }))
      );
    }, 35);
    return () => clearTimeout(timer);
  }, [bubbles]);

  // Ripple cleanup
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (isTouchDevice || cursorMode === 'off') {
    return (
      <FloatingCursorPicker
        currentMode={cursorMode}
        onSelectMode={setCursorMode}
        isOpen={showStyleMenu}
        onToggleOpen={() => setShowStyleMenu(!showStyleMenu)}
      />
    );
  }

  return (
    <>
      {/* Dynamic Cursor Hiding Stylesheet */}
      <style>{`
        .hide-default-cursor,
        .hide-default-cursor * {
          cursor: none !important;
        }
      `}</style>

      {/* Water / Sonar Splash Ripples on Click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] rounded-full border border-cyan-400/90 animate-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '42px',
            height: '42px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 24px rgba(56, 189, 248, 0.8)'
          }}
        />
      ))}

      {/* Underwater Bubbles Trail */}
      <div className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full pointer-events-none transition-transform"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              backgroundColor: b.color,
              opacity: b.opacity,
              boxShadow: `0 0 8px ${b.color}`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Main Cursor: Shark Structured Pointer */}
      <div
        ref={sharkDomRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {cursorMode === 'shark' && (
          <div
            className="relative select-none pointer-events-none"
            style={{
              width: '64px',
              height: '38px',
              // Anchor snout apex (x=58, y=19 in SVG) directly at mouse coordinates
              transformOrigin: '58px 19px',
              transform: `translate(-58px, -19px) rotate(${sharkAngle}deg)`,
              transition: 'transform 0.05s linear'
            }}
          >
            {/* SVG Shark Pointer Graphic with Tail, Fins, Gills, Teeth & Laser Apex */}
            <svg
              width="64"
              height="38"
              viewBox="0 0 64 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`drop-shadow-[0_0_14px_rgba(6,182,212,0.9)] transition-all duration-150 ${
                isClicking ? 'scale-115' : isHovered ? 'scale-110' : 'scale-100'
              }`}
            >
              <defs>
                {/* Shark Body Metallic Ocean Gradient */}
                <linearGradient id="sharkBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#083344" />
                  <stop offset="35%" stopColor="#0891b2" />
                  <stop offset="70%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>

                {/* Shark Belly Gradient */}
                <linearGradient id="sharkBellyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#cffafe" />
                  <stop offset="100%" stopColor="#a5f3fc" />
                </linearGradient>

                {/* Neon Edge Highlight */}
                <linearGradient id="sharkNeonEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#67e8f9" />
                </linearGradient>

                <filter id="sharkGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#38bdf8" />
                </filter>
              </defs>

              {/* Animated Crescent Shark Caudal Tail Fin (Oscillating) */}
              <g
                style={{
                  transformOrigin: '14px 19px',
                  transform: `rotate(${tailWiggle}deg)`
                }}
              >
                {/* Upper Tail Lobe */}
                <path
                  d="M14 19 C10 14, 4 6, 2 2 C3 8, 5 15, 8 19 Z"
                  fill="url(#sharkBodyGrad)"
                  stroke="#38bdf8"
                  strokeWidth="0.8"
                />
                {/* Lower Tail Lobe */}
                <path
                  d="M14 19 C10 24, 5 32, 3 36 C4 30, 6 23, 8 19 Z"
                  fill="url(#sharkBodyGrad)"
                  stroke="#38bdf8"
                  strokeWidth="0.8"
                />
                {/* Tail Keel Finlet */}
                <path
                  d="M14 17 L10 19 L14 21 Z"
                  fill="#0e7490"
                />
              </g>

              {/* Dorsal Fin (Upper Shark Fin) */}
              <path
                d="M26 14 C28 9, 32 3, 34 2 C35 7, 38 12, 40 13 Z"
                fill="url(#sharkBodyGrad)"
                stroke="#38bdf8"
                strokeWidth="1"
                filter="url(#sharkGlowFilter)"
              />

              {/* Pelvic Fin (Lower Stabilizer Fin) */}
              <path
                d="M25 24 C28 29, 30 33, 31 34 C33 30, 34 26, 35 24 Z"
                fill="#0891b2"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />

              {/* Main Torpedo Body & Snout Pointer */}
              <path
                d="M12 19 C15 12, 28 10, 48 14 C55 16, 58 18.5, 58 19 C58 19.5, 55 22, 48 24 C28 28, 15 26, 12 19 Z"
                fill="url(#sharkBodyGrad)"
                stroke="url(#sharkNeonEdge)"
                strokeWidth="1.4"
                filter="url(#sharkGlowFilter)"
              />

              {/* Shark Countershading White Belly */}
              <path
                d="M16 20 C22 24.5, 36 25, 49 22.5 C43 25, 27 25.5, 16 20 Z"
                fill="url(#sharkBellyGrad)"
                opacity="0.95"
              />

              {/* Pectoral Fin (Wing-like Side Fin) */}
              <path
                d="M34 21 C38 27, 43 31, 46 32 C45 28, 43 24, 41 21 Z"
                fill="#0891b2"
                stroke="#67e8f9"
                strokeWidth="0.8"
              />

              {/* 5 Hydrodynamic Gill Slits */}
              <line x1="38" y1="16" x2="37" y2="22" stroke="#083344" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="40.5" y1="16" x2="39.5" y2="22" stroke="#083344" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="43" y1="16" x2="42" y2="22" stroke="#083344" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="45.5" y1="16.5" x2="44.5" y2="21.5" stroke="#083344" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="48" y1="17" x2="47" y2="21" stroke="#083344" strokeWidth="1.2" strokeLinecap="round" />

              {/* Shark Eye (Predatory Glow: Red on click, Amber on interactive hover, Pure Cyan normally) */}
              <circle
                cx="52"
                cy="16.5"
                r={isClicking ? 2.6 : isHovered ? 2.3 : 1.8}
                fill={isClicking ? '#ef4444' : isHovered ? '#f59e0b' : '#38bdf8'}
                stroke="#082f49"
                strokeWidth="0.7"
              />
              <circle
                cx="52.6"
                cy="16.1"
                r="0.8"
                fill="#ffffff"
              />

              {/* Sharp Teeth / Chomp Jaws on Strike / Hover */}
              {isClicking ? (
                <path
                  d="M51 19.5 L53 18.5 L54.5 20 L56 18.5 L57.5 19.5"
                  stroke="#ffffff"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : isHovered ? (
                <path
                  d="M52 19.8 L54 19 L55.5 20 L57 19.2"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}

              {/* Exact Snout Pointer Apex Crosshair Dot (Click Target at 58, 19) */}
              <circle
                cx="58"
                cy="19"
                r={isClicking ? 2.5 : isHovered ? 2 : 1.5}
                fill="#38bdf8"
                className="animate-pulse"
              />
              <circle
                cx="58"
                cy="19"
                r={isClicking ? 4.5 : isHovered ? 3.5 : 2.5}
                fill="none"
                stroke="#67e8f9"
                strokeWidth="0.8"
                opacity="0.8"
              />
            </svg>
          </div>
        )}

        {/* Fallback Cyber Mode */}
        {cursorMode === 'cyber' && (
          <div
            className={`w-3.5 h-3.5 rounded-full transition-all duration-150 relative -translate-x-1/2 -translate-y-1/2 ${
              isClicking
                ? 'scale-150 bg-emerald-400 shadow-[0_0_16px_#10b981]'
                : isHovered
                ? 'scale-125 bg-cyan-300 shadow-[0_0_12px_#06b6d4]'
                : 'bg-cyan-400 shadow-[0_0_10px_#06b6d4]'
            }`}
          />
        )}

        {/* Fallback Glow Mode */}
        {cursorMode === 'glow' && (
          <div
            className={`w-4 h-4 rounded-full bg-cyan-400 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 ${
              isClicking ? 'scale-150 shadow-[0_0_24px_#06b6d4]' : 'shadow-[0_0_14px_#06b6d4]'
            }`}
          />
        )}

        {/* Fallback Particles Mode */}
        {cursorMode === 'particles' && (
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_12px_#10b981] -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>

      {/* Trailing Sonar Ring & Action Tag */}
      <div
        ref={followerDomRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ${
            isHovered ? 'w-16 h-16' : isClicking ? 'w-8 h-8 scale-90' : 'w-10 h-10'
          }`}
        >
          {/* Sonar / Hydro Ring */}
          <div
            className={`absolute inset-0 rounded-full border border-dashed transition-all duration-300 ${
              isHovered
                ? 'border-cyan-400 animate-spin opacity-90 shadow-[0_0_16px_rgba(6,182,212,0.5)]'
                : 'border-cyan-500/30 opacity-40'
            }`}
            style={{ animationDuration: isHovered ? '4s' : '12s' }}
          />

          {/* Action Callout Tag on Hover */}
          {hoverLabel && (
            <span className="absolute -bottom-6 px-2.5 py-0.5 rounded bg-black/90 border border-cyan-500/80 text-[10px] font-mono font-bold text-cyan-300 tracking-wider shadow-xl whitespace-nowrap backdrop-blur-md animate-pulse">
              🦈 {hoverLabel}
            </span>
          )}
        </div>
      </div>

      {/* Floating Style Picker / Mode Switcher in Bottom Right */}
      <FloatingCursorPicker
        currentMode={cursorMode}
        onSelectMode={setCursorMode}
        isOpen={showStyleMenu}
        onToggleOpen={() => setShowStyleMenu(!showStyleMenu)}
      />
    </>
  );
};

interface FloatingCursorPickerProps {
  currentMode: CursorStyleMode;
  onSelectMode: (mode: CursorStyleMode) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const FloatingCursorPicker: React.FC<FloatingCursorPickerProps> = ({
  currentMode,
  onSelectMode,
  isOpen,
  onToggleOpen
}) => {
  const modes: { id: CursorStyleMode; name: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { id: 'shark', name: 'Shark Predator', icon: Waves, desc: 'Interactive swimming shark pointer with chomp & wake' },
    { id: 'cyber', name: 'Cyber Reticle', icon: Crosshair, desc: 'HUD targeting brackets & glow' },
    { id: 'glow', name: 'Neon Aura', icon: Sparkles, desc: 'Luminous fluid trailing ring' },
    { id: 'particles', name: 'Kinetic Sparks', icon: Zap, desc: 'Color particle trail emission' },
    { id: 'off', name: 'Standard Pointer', icon: MousePointer2, desc: 'Native OS cursor' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 p-3 bg-[#0d121f]/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl w-68 text-xs font-mono space-y-1.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 font-semibold px-1">
              <span className="text-cyan-300 flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cursor Pointer</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Style</span>
            </div>

            <div className="space-y-1 pt-1">
              {modes.map((m) => {
                const Icon = m.icon;
                const isSelected = currentMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelectMode(m.id);
                      onToggleOpen();
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-inner'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div
                      className={`p-1 rounded-lg ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold flex items-center justify-between">
                        <span>{m.name}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={onToggleOpen}
        className="p-2.5 rounded-full bg-[#0d121f]/90 border border-slate-700/80 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 shadow-xl backdrop-blur-md transition-all flex items-center gap-2 group"
        title="Change Cursor Design"
      >
        <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-[11px] font-mono hidden md:inline pr-1">
          Cursor: <strong className="text-cyan-300 uppercase">{currentMode}</strong>
        </span>
      </motion.button>
    </div>
  );
};
