import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LOADING_MESSAGES = [
  'Warming up the turntables...',
  'Charging the synthesizers...',
  'Setting up the dance floor...',
  'Cueing the first track...',
];

/**
 * Creative loading screen with animated text, disco ball, and progress bar.
 * Plays a smooth exit animation on completion.
 *
 * @param {{ onComplete: Function }} props
 */
function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const progressBarRef = useRef(null);
  const messageRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  /* Simulated loading progress */
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 8 + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        /* Brief pause before exit */
        setTimeout(() => {
          setIsExiting(true);
        }, 400);
      }
      setProgress(Math.min(current, 100));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  /* Cycle loading messages */
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* Animate message transitions */
  useEffect(() => {
    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [messageIndex]);

  /* Entrance animation */
  useEffect(() => {
    if (!titleRef.current) return;

    const letters = titleRef.current.querySelectorAll('.loading__title-letter');

    gsap.fromTo(
      letters,
      { y: 80, opacity: 0, rotateX: 90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'back.out(1.4)',
        delay: 0.2,
      }
    );
  }, []);

  /* Exit animation */
  useEffect(() => {
    if (!isExiting || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.to(containerRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    });
  }, [isExiting, onComplete]);

  const titleText = 'DISCOGRAPHY';

  return (
    <div className="loading" ref={containerRef}>
      {/* Film grain overlay */}
      <div className="loading__grain" />

      {/* Background animated gradients */}
      <div className="loading__bg">
        <div className="loading__bg-orb loading__bg-orb--1" />
        <div className="loading__bg-orb loading__bg-orb--2" />
        <div className="loading__bg-orb loading__bg-orb--3" />
      </div>

      <div className="loading__content">
        {/* Disco ball icon */}
        <div className="loading__disco-ball">
          <div className="loading__disco-ball-sphere">
            {[...Array(8)].map((_, row) => (
              <div key={row} className="loading__disco-row" style={{ '--row': row }}>
                {[...Array(12)].map((_, col) => (
                  <div
                    key={col}
                    className="loading__disco-tile"
                    style={{ '--col': col, '--delay': (row * 12 + col) * 0.03 }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="loading__disco-light loading__disco-light--1" />
          <div className="loading__disco-light loading__disco-light--2" />
          <div className="loading__disco-light loading__disco-light--3" />
        </div>

        {/* Title */}
        <h1 className="loading__title" ref={titleRef}>
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="loading__title-letter"
              style={{ '--char-index': i }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="loading__subtitle">
          50 Years of Music History
        </p>

        {/* Progress bar */}
        <div className="loading__progress">
          <div className="loading__progress-track">
            <div
              className="loading__progress-fill"
              ref={progressBarRef}
              style={{ width: `${progress}%` }}
            />
            <div
              className="loading__progress-glow"
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className="loading__progress-info">
            <span className="loading__progress-percent">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading message */}
        <p className="loading__message" ref={messageRef} key={messageIndex}>
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
