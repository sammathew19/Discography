import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook that tracks scroll progress of a referenced element.
 * Uses GSAP ScrollTrigger internally for high-performance scroll tracking.
 *
 * @param {React.RefObject} ref - Reference to the DOM element to track
 * @param {Object} options - ScrollTrigger options
 * @param {string} options.start - ScrollTrigger start position (default: "top bottom")
 * @param {string} options.end - ScrollTrigger end position (default: "bottom top")
 * @param {boolean|number} options.scrub - Scrub setting (default: true)
 * @returns {number} progress - Value from 0 to 1
 */
export default function useScrollProgress(ref, options = {}) {
  const [progress, setProgress] = useState(0);

  const {
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options;

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      scrub: typeof scrub === 'number' ? scrub : scrub ? 0.1 : false,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [ref, start, end, scrub]);

  return progress;
}
