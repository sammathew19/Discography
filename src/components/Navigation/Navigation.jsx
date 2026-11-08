import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation({ currentEra = 'era-70s', onNavigate, soundEnabled = false, toggleSound }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME', number: '00' },
    { id: 'era-70s', label: 'THE 70s · DISCO FEVER', number: '01' },
    { id: 'era-80s', label: 'THE 80s · SYNTH REVOLUTION', number: '02' },
    { id: 'era-90s', label: 'THE 90s · UNDERGROUND RAVE', number: '03' },
    { id: 'era-2000s', label: 'THE 2000s · Y2K POP', number: '04' },
    { id: 'era-2010s', label: 'THE 2010s+ · NEW CLUB CULTURE', number: '05' },
    { id: 'album-archive', label: 'ALBUM ARCHIVE', number: '06' },
    { id: 'the-movement', label: 'THE MOVEMENT', number: '07' },
    { id: 'sound-archive', label: 'SOUND ARCHIVE', number: '08' },
    { id: 'finale', label: 'FINALE', number: '09' },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`disco-nav ${scrolled ? 'disco-nav--scrolled' : ''} disco-nav--${currentEra}`}>
        <div className="disco-nav__left">
          <button
            className="disco-nav__logo"
            onClick={() => handleLinkClick('hero')}
            data-cursor="magnetic"
          >
            <span className="disco-nav__logo-icon">🪩</span>
            <span className="disco-nav__logo-text">DISCOGRAPHY</span>
          </button>
          <div className="disco-nav__era-pill">
            <span className="disco-nav__era-dot"></span>
            <span className="disco-nav__era-name">
              {currentEra.replace('era-', '').toUpperCase()}
            </span>
          </div>
        </div>

        <div className="disco-nav__right">
          <button
            className={`disco-nav__sound-btn ${soundEnabled ? 'is-active' : ''}`}
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Procedural Club Audio' : 'Enable Procedural Club Audio'}
            data-cursor="pointer"
          >
            <span className="disco-nav__sound-icon">
              {soundEnabled ? '🔊 SOUND ON' : '🔈 SOUND OFF'}
            </span>
            <span className="disco-nav__sound-wave">
              <span className="bar bar--1"></span>
              <span className="bar bar--2"></span>
              <span className="bar bar--3"></span>
            </span>
          </button>

          <button
            className={`disco-nav__toggle ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            data-cursor="magnetic"
          >
            <span className="disco-nav__burger-line line-1"></span>
            <span className="disco-nav__burger-line line-2"></span>
            <span className="disco-nav__burger-line line-3"></span>
          </button>
        </div>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <div className={`disco-nav-overlay ${isOpen ? 'is-active' : ''} disco-nav-overlay--${currentEra}`}>
        <div className="disco-nav-overlay__bg"></div>
        <div className="disco-nav-overlay__content">
          <div className="disco-nav-overlay__meta">
            <p className="disco-nav-overlay__subtitle">IMMERSIVE ARCHIVE · 1970 — 2026</p>
            <p className="disco-nav-overlay__quote">“Dance is the hidden language of the soul.”</p>
          </div>
          <nav className="disco-nav-overlay__menu">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                className="disco-nav-overlay__link"
                onClick={() => handleLinkClick(item.id)}
                style={{ '--delay': `${idx * 0.04}s` }}
                data-cursor="hover"
              >
                <span className="disco-nav-overlay__link-num">{item.number}</span>
                <span className="disco-nav-overlay__link-text">{item.label}</span>
                <span className="disco-nav-overlay__link-arrow">→</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
