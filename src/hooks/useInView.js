import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook that uses IntersectionObserver to track element visibility.
 *
 * @param {Object} options
 * @param {number|number[]} options.threshold - Visibility threshold (default: 0.1)
 * @param {string} options.rootMargin - Root margin (default: "0px")
 * @param {boolean} options.triggerOnce - Only trigger once (default: false)
 * @returns {[React.RefObject, boolean]} [ref, inView]
 */
export default function useInView(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
  } = options;

  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (triggerOnce && hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        if (triggerOnce) {
          if (isIntersecting && !hasTriggeredRef.current) {
            setInView(true);
            hasTriggeredRef.current = true;
            observer.unobserve(el);
          }
        } else {
          setInView(isIntersecting);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}
