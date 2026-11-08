import { useState } from 'react';
import EraSection from '../EraSection/EraSection';
import { erasData } from '../../data/erasData';
import './Era70s.css';

export default function Era70s() {
  const era = erasData.find((e) => e.id === 'era-70s') || erasData[0];
  const [activeFloorTile, setActiveFloorTile] = useState(4);

  const floorColors = [
    '#D4AF37', '#FF6B9D', '#2D1B69', '#E8741A',
    '#9B51E0', '#FFB800', '#FF1493', '#8A2BE2',
    '#FF4500', '#D4AF37', '#2D1B69', '#FF6B9D',
    '#E8741A', '#FFB800', '#9B51E0', '#FF1493'
  ];

  return (
    <EraSection era={era} index={0}>
      <div className="era70">
        {/* Massive Editorial Lead */}
        <div className="era70__hero-split">
          <div className="era70__lead-col">
            <span className="era70__dropcap">D</span>
            <p className="era70__lead-text">
              Disco was never merely music—it was an underground sanctuary of communion. In the darkened lofts of downtown Manhattan and beneath the crystal chandeliers of Studio 54, marginalized communities forged an egalitarian cathedral of sound. Powered by continuous turntable mixing, towering sound stacks, and Philly soul orchestral arrangements, the four-on-the-floor heartbeat dismantled cultural boundaries.
            </p>
          </div>

          <div className="era70__interactive-floor-card">
            <div className="era70__floor-header">
              <span className="era70__card-tag">INTERACTIVE DANCEFLOOR</span>
              <span className="era70__card-sub">Studio 54 Kinetic Floor Emulator</span>
            </div>
            
            <div className="era70__floor-grid">
              {floorColors.map((col, idx) => (
                <button
                  key={idx}
                  className={`era70__floor-tile ${activeFloorTile === idx ? 'is-active' : ''}`}
                  style={{
                    '--tile-color': col,
                    animationDelay: `${(idx % 4) * 0.15 + Math.floor(idx / 4) * 0.1}s`,
                  }}
                  onClick={() => setActiveFloorTile(idx)}
                  onMouseEnter={() => setActiveFloorTile(idx)}
                  data-cursor="pointer"
                  aria-label={`Dance floor light tile ${idx + 1}`}
                >
                  <span className="era70__tile-pulse"></span>
                </button>
              ))}
            </div>
            <p className="era70__floor-caption">Hover or tap tiles to shift light pulses across the floor</p>
          </div>
        </div>

        {/* Studio 54 Velvet Rope & Cultural Artifacts */}
        <div className="era70__showcase-grid">
          <div className="era70__card era70__card--feature">
            <div className="era70__card-icon">🪩</div>
            <h3 className="era70__card-title">The Invention of the 12-inch Single</h3>
            <p className="era70__card-body">
              In 1975, mixer Tom Moulton ran out of 7-inch blanks while cutting a reference lacquer for Gloria Gaynor. Recording engineer José Rodriguez cut it onto a 12-inch disc instead, spacing the grooves wider. The result? Staggering bass dynamics, deeper low-end response, and extended breaks that forever transformed how music was engineered for clubs.
            </p>
            <div className="era70__vinyl-disc">
              <div className="era70__disc-groove"></div>
              <div className="era70__disc-center">12″ SINGLE</div>
            </div>
          </div>

          <div className="era70__card">
            <span className="era70__card-num">01</span>
            <h4 className="era70__card-heading">The Loft & David Mancuso</h4>
            <p className="era70__card-body">
              On Valentine’s Day 1970, David Mancuso hosted "Love Saves the Day" at 647 Broadway. No alcohol, no commercial branding, pure audiophile Klipschorn sound—establishing the template for underground dance culture for the next 50 years.
            </p>
          </div>

          <div className="era70__card">
            <span className="era70__card-num">02</span>
            <h4 className="era70__card-heading">Giorgio Moroder’s Synthesizer Spark</h4>
            <p className="era70__card-body">
              In 1977, Donna Summer and Giorgio Moroder unleashed "I Feel Love". By replacing live brass with Moog modular arpeggiators, they created electronic disco and lit the fuse for modern dance music worldwide.
            </p>
          </div>

          <div className="era70__card">
            <span className="era70__card-num">03</span>
            <h4 className="era70__card-heading">Studio 54 & High Glamour</h4>
            <p className="era70__card-body">
              Steve Rubell and Ian Schrager opened the former CBS studio on West 54th Street in 1977. Andy Warhol, Bianca Jagger, and Grace Jones mingled with downtown dancers under theatrical lighting rigs and falling glitter storms.
            </p>
          </div>
        </div>

        {/* Flowing Decade Timeline */}
        <div className="era70__timeline-wrap">
          <h3 className="era70__section-subtitle">THE DEFINING MILESTONES</h3>
          <div className="era70__moments-flow">
            {era.culturalMoments.map((m, i) => (
              <div key={i} className="era70__moment-card">
                <span className="era70__moment-year">{m.year}</span>
                <h4 className="era70__moment-title">{m.title}</h4>
                <p className="era70__moment-desc">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Iconic Venues Pill Strip */}
        <div className="era70__venues-strip">
          <span className="era70__venues-label">LEGENDARY SANCTUARIES:</span>
          <div className="era70__venues-list">
            {era.iconicVenues.map((v, i) => (
              <span key={i} className="era70__venue-pill">{v}</span>
            ))}
          </div>
        </div>
      </div>
    </EraSection>
  );
}
