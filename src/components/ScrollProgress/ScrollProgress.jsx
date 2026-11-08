import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollProgress.css';

gsap.registerPlugin(ScrollTrigger);

const ERAS = [
  { id: '70s', label: '1970s', color: '#D4AF37' },
  { id: '80s', label: '1980s', color: '#FF00FF' },
  { id: '90s', label: '1990s', color: '#39FF14' },
  { id: '2000s', label: '2000s', color: '#89CFF0' },
  { id: '2010s', label: '2010s', color: '#F5F5F5' },
];

/**
 * Scroll progress indicator with era markers.
 * Displays a vertical line on the right side with progress and era indicators.
 *
 * @param {{ currentEra: string }} props
 */
function ScrollProgress({ currentEra = '70s' }) {
  const lineRef = useRef(null);
  const fillRef = useRef(null);
  const labelRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  /* Animate the fill line */
  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleY(${progress})`;
    }
  }, [progress]);

  /* Animate label changes */
  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentEra]);

  const normalizedEra = currentEra.replace('era-', '');
  const currentEraData = ERAS.find((e) => e.id === normalizedEra || e.id === currentEra) || ERAS[0];

  return (
    <div className="scroll-progress" aria-hidden="true">
      {/* Era label (vertical text) */}
      <div className="scroll-progress__label" ref={labelRef}>
        <span
          className="scroll-progress__label-text"
          style={{ color: currentEraData.color }}
        >
          {currentEraData.label}
        </span>
      </div>

      {/* Track line */}
      <div className="scroll-progress__track" ref={lineRef}>
        {/* Fill */}
        <div
          className="scroll-progress__fill"
          ref={fillRef}
          style={{
            background: `linear-gradient(to bottom, 
              ${ERAS[0].color} 0%, 
              ${ERAS[1].color} 25%, 
              ${ERAS[2].color} 50%, 
              ${ERAS[3].color} 75%, 
              ${ERAS[4].color} 100%
            )`,
          }}
        />

        {/* Era marker dots */}
        {ERAS.map((era, index) => {
          const dotPosition = index / (ERAS.length - 1);
          const isActive = era.id === currentEra || era.id === normalizedEra;
          const isPast = progress >= dotPosition;

          return (
            <div
              key={era.id}
              className={`scroll-progress__marker ${isActive ? 'scroll-progress__marker--active' : ''} ${isPast ? 'scroll-progress__marker--past' : ''}`}
              style={{
                top: `${dotPosition * 100}%`,
                '--marker-color': era.color,
              }}
            >
              <div className="scroll-progress__marker-dot" />
              {isActive && (
                <div className="scroll-progress__marker-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Percentage */}
      <div className="scroll-progress__percentage">
        <span className="scroll-progress__percentage-value">
          {Math.round(progress * 100)}
        </span>
      </div>
    </div>
  );
}

export default ScrollProgress;
