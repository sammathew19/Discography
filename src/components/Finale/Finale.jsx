import './Finale.css';

export default function Finale({ onRestart }) {
  return (
    <section className="finale" id="finale">
      <div className="finale__vortex-mesh">
        <div className="finale__glow f-gold"></div>
        <div className="finale__glow f-pink"></div>
        <div className="finale__glow f-green"></div>
        <div className="finale__glow f-cyan"></div>
      </div>

      <div className="finale__content">
        <div className="finale__badge-wrap">
          <span className="finale__badge">50 YEARS OF FREEDOM // 1970 — 2026</span>
        </div>

        <h2 className="finale__manifesto">
          <span className="finale__line l-1">MUSIC CHANGES.</span>
          <span className="finale__line l-2">CULTURE EVOLVES.</span>
          <span className="finale__line l-3">THE DANCE NEVER ENDS.</span>
        </h2>

        <p className="finale__epilogue">
          From the golden mirror balls of Studio 54 to the neon grids of the 80s, the illegal warehouse raves of the 90s, the liquid-chrome optimism of Y2K, and the deconstructed club experiments of tomorrow—the four-on-the-floor beat remains humanity’s eternal sanctuary.
        </p>

        <div className="finale__mashup-symbols">
          <span className="symbol s-disco" title="1970s Disco Ball">🪩</span>
          <span className="symbol s-synth" title="1980s Synthesizer">🎹</span>
          <span className="symbol s-acid" title="1990s Acid 303">⚡</span>
          <span className="symbol s-y2k" title="2000s Chrome">💿</span>
          <span className="symbol s-future" title="2020s Hyperpop">✦</span>
        </div>

        <div className="finale__cta-wrap">
          <button
            className="finale__restart-btn"
            onClick={onRestart}
            data-cursor="magnetic"
          >
            <span className="finale__restart-icon">↑</span>
            <span className="finale__restart-text">RESTART THE EXPEDITION</span>
          </button>
        </div>

        <footer className="finale__footer">
          <div className="finale__footer-top">
            <span className="finale__footer-brand">DISCOGRAPHY</span>
            <span className="finale__footer-tagline">DANCE THROUGH MUSIC HISTORY</span>
          </div>
          <div className="finale__footer-meta">
            <p>Designed & built as an experimental interactive digital museum and sonic celebration.</p>
            <p>© 1970–2026 DISCOGRAPHY. An ode to every dancer who ever found peace in the strobe light.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
