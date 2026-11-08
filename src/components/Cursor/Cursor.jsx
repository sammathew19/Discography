import React, { useEffect, useRef, useState, useCallback } from 'react';
import { lerp } from '../../utils/mathUtils';
import './Cursor.css';

/**
 * Custom animated cursor component.
 * Features an outer ring with delayed follow and inner dot.
 * Adapts appearance based on current music era.
 *
 * @param {{ currentEra: string }} props
 */
function Cursor({ currentEra = '70s' }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const trailRefs = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });
  const outerPosRef = useRef({ x: -100, y: -100 });
  const innerPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Detect touch device */
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  /* Track mouse position */
  const handleMouseMove = useCallback((e) => {
    posRef.current.x = e.clientX;
    posRef.current.y = e.clientY;
    if (!visible) setVisible(true);
  }, [visible]);

  /* Track hover states */
  const handleMouseOver = useCallback((e) => {
    const target = e.target.closest('[data-cursor], a, button');
    if (target) {
      setHovering(true);
      setCursorType(target.getAttribute('data-cursor') || 'pointer');
    }
  }, []);

  const handleMouseOut = useCallback((e) => {
    const target = e.target.closest('[data-cursor], a, button');
    if (target) {
      setHovering(false);
      setCursorType('default');
    }
  }, []);

  /* Hide when mouse leaves window */
  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setVisible(true);
  }, []);

  /* Animation loop */
  useEffect(() => {
    if (isTouch) return;

    const animate = () => {
      /* Outer ring follows with delay */
      outerPosRef.current.x = lerp(outerPosRef.current.x, posRef.current.x, 0.12);
      outerPosRef.current.y = lerp(outerPosRef.current.y, posRef.current.y, 0.12);

      /* Inner dot follows immediately */
      innerPosRef.current.x = lerp(innerPosRef.current.x, posRef.current.x, 0.6);
      innerPosRef.current.y = lerp(innerPosRef.current.y, posRef.current.y, 0.6);

      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${outerPosRef.current.x}px, ${outerPosRef.current.y}px) translate(-50%, -50%)`;
      }

      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${innerPosRef.current.x}px, ${innerPosRef.current.y}px) translate(-50%, -50%)`;
      }

      /* Trail particles (for sparkle effects) */
      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          const factor = 0.06 + i * 0.02;
          const trailX = lerp(
            parseFloat(trail.dataset.x || posRef.current.x),
            posRef.current.x,
            factor
          );
          const trailY = lerp(
            parseFloat(trail.dataset.y || posRef.current.y),
            posRef.current.y,
            factor
          );
          trail.dataset.x = trailX;
          trail.dataset.y = trailY;
          trail.style.transform =
            `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, handleMouseMove, handleMouseOver, handleMouseOut, handleMouseLeave, handleMouseEnter]);

  if (isTouch) return null;

  const normalizedEra = currentEra.replace('era-', '').replace('s', '');
  const eraClass = `cursor--era-${normalizedEra}`;
  const trailCount = normalizedEra === '70' ? 5 : 0;

  return (
    <div
      className={`cursor ${eraClass} ${hovering ? 'cursor--hovering' : ''} ${visible ? 'cursor--visible' : ''}`}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        ref={outerRef}
        className={`cursor__outer cursor__outer--${cursorType}`}
      >
        <div className="cursor__outer-ring" />
        {/* Era-specific decorations */}
        {currentEra === '70s' && (
          <div className="cursor__sparkles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="cursor__sparkle" style={{ '--i': i }} />
            ))}
          </div>
        )}
        {currentEra === '90s' && (
          <div className="cursor__glitch-lines">
            <span className="cursor__glitch-line" />
            <span className="cursor__glitch-line" />
          </div>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className={`cursor__inner cursor__inner--${cursorType}`}
      />

      {/* 70s sparkle trail */}
      {currentEra === '70s' && [...Array(trailCount)].map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="cursor__trail"
          style={{
            '--trail-index': i,
            '--trail-size': `${4 - i * 0.5}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Cursor;
