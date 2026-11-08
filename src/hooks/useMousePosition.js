import { useState, useEffect, useRef, useCallback } from 'react';
import { lerp } from '../utils/mathUtils';

/**
 * Custom hook that tracks mouse position with smooth interpolation.
 * Returns normalized (-1 to 1) and raw pixel coordinates.
 *
 * @returns {{ x: number, y: number, rawX: number, rawY: number }}
 */
export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rawRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const normalizedX = (clientX / window.innerWidth) * 2 - 1;
    const normalizedY = (clientY / window.innerHeight) * 2 - 1;

    targetRef.current.x = normalizedX;
    targetRef.current.y = normalizedY;
    rawRef.current.x = clientX;
    rawRef.current.y = clientY;
  }, []);

  useEffect(() => {
    const LERP_FACTOR = 0.12;

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, LERP_FACTOR);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, LERP_FACTOR);

      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y,
        rawX: rawRef.current.x,
        rawY: rawRef.current.y,
      });

      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleMouseMove]);

  return position;
}
