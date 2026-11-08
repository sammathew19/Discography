import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiscoBall from './DiscoBall';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const TITLE_TEXT = 'DISCOGRAPHY';

function Hero({ soundEnabled = false, toggleSound }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const introRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const overlayRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  /* ─── Entrance Animation Timeline ─── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.3,
      });

      timelineRef.current = tl;

      // 1. Background fades from pure black
      tl.fromTo(
        heroRef.current,
        { backgroundColor: '#000000' },
        { backgroundColor: '#050505', duration: 1.2 }
      );

      // 2. Canvas (disco ball) fades in
      tl.fromTo(
        canvasContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'power2.inOut' },
        0.3
      );

      // 3. Letters animate in one by one
      const letters = titleRef.current?.querySelectorAll('.hero__letter');
      if (letters && letters.length > 0) {
        tl.fromTo(
          letters,
          {
            y: 80,
            opacity: 0,
            rotationX: -60,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.04,
            ease: 'back.out(1.4)',
          },
          0.8
        );
      }

      // 4. Letter-spacing animation on title
      tl.to(
        titleRef.current?.querySelector('h1'),
        {
          letterSpacing: '0.15em',
          duration: 1.2,
          ease: 'power2.out',
        },
        1.6
      );

      // 5. Subtitle slides in with letter-spacing
      tl.fromTo(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
          letterSpacing: '1em',
        },
        {
          y: 0,
          opacity: 1,
          letterSpacing: '0.5em',
          duration: 1.0,
          ease: 'power2.out',
        },
        1.8
      );

      // 6. Intro text fades in
      tl.fromTo(
        introRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        2.2
      );

      // 7. Scroll indicator pulses in
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        2.6
      );

      // 8. Overlay vignette fades to final state
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        0.5
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ─── Scroll-Driven Animation (ScrollTrigger) ─── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Title fades out and scales
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
        },
        scale: 0.5,
        opacity: 0,
        y: -60,
        ease: 'none',
      });

      // Subtitle fades
      gsap.to(subtitleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=80%',
          scrub: 1,
        },
        opacity: 0,
        y: -30,
        ease: 'none',
      });

      // Intro fades
      gsap.to(introRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=60%',
          scrub: 1,
        },
        opacity: 0,
        ease: 'none',
      });

      // Scroll indicator fades out quickly
      gsap.to(scrollIndicatorRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=30%',
          scrub: 0.5,
        },
        opacity: 0,
        y: 20,
        ease: 'none',
      });

      // Background color shift
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
        },
        backgroundColor: '#0A0508',
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ─── Render Letters ─── */
  const renderLetters = useCallback(() => {
    return TITLE_TEXT.split('').map((letter, index) => (
      <span className="hero__letter" key={index}>
        {letter}
      </span>
    ));
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* Three.js Canvas */}
      <div className="hero__canvas-container" ref={canvasContainerRef}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.1} color="#F5F0E8" />
          <DiscoBall scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="hero__content" ref={contentRef}>
        <div className="hero__title" ref={titleRef}>
          <h1>{renderLetters()}</h1>
          <p className="hero__subtitle" ref={subtitleRef}>
            DANCE THROUGH MUSIC HISTORY.
          </p>
        </div>

        <p className="hero__intro" ref={introRef}>
          An immersive journey through five decades of music, dance, fashion,
          and nightlife culture.
        </p>

        <div className="hero__scroll-indicator" ref={scrollIndicatorRef}>
          <span className="hero__scroll-text">SCROLL TO EXPLORE</span>
          <div className="hero__scroll-line" />
        </div>

        <button
          className={`hero__sound-toggle ${
            !soundEnabled ? 'hero__sound-toggle--muted' : ''
          }`}
          onClick={toggleSound}
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          <div className="hero__sound-icon">
            <div className="hero__sound-icon-speaker" />
            <div className="hero__sound-wave hero__sound-wave--1" />
            <div className="hero__sound-wave hero__sound-wave--2" />
          </div>
        </button>
      </div>

      {/* Overlay (vignette + grain) */}
      <div className="hero__overlay" ref={overlayRef} />
    </section>
  );
}

export default Hero;
