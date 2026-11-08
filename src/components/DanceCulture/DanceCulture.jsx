import { useState } from 'react';
import { danceData } from '../../data/danceData';
import './DanceCulture.css';

export default function DanceCulture() {
  const [activeEraIdx, setActiveEraIdx] = useState(0);
  const currentDanceEra = danceData[activeEraIdx];

  return (
    <section className="dance-culture" id="the-movement">
      <div className="dance-culture__container">
        {/* Section Title */}
        <div className="dance-culture__header">
          <span className="dance-culture__num">07 // THE PHYSICAL MANIFESTATION</span>
          <h2 className="dance-culture__title">THE MOVEMENT</h2>
          <p className="dance-culture__subtitle">
            Music is not only an auditory vibration—it is a physical transformation. Discover how dancers through five decades translated electronic frequencies into kinetic street and club language.
          </p>

          {/* Era Selector Pills */}
          <div className="dance-culture__nav-tabs">
            {danceData.map((d, idx) => (
              <button
                key={d.eraId}
                className={`dance-culture__tab-btn ${activeEraIdx === idx ? 'is-active' : ''}`}
                onClick={() => setActiveEraIdx(idx)}
                data-cursor="pointer"
              >
                <span className="dance-culture__tab-decade">{d.decade}</span>
                <span className="dance-culture__tab-name">{d.title.split('&')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Era Spotlight */}
        <div className="dance-culture__spotlight">
          <div className="dance-culture__spotlight-intro">
            <div className="dance-culture__tagline-box">
              <span className="dance-culture__era-badge">{currentDanceEra.decade} DANCE REVOLUTION</span>
              <h3 className="dance-culture__era-h">{currentDanceEra.title}</h3>
              <p className="dance-culture__era-context">{currentDanceEra.culturalContext}</p>
            </div>

            {/* Kinetic Pulse Graphic */}
            <div className="dance-culture__kinetic-ring">
              <div className="dance-culture__ring-wave r1"></div>
              <div className="dance-culture__ring-wave r2"></div>
              <div className="dance-culture__ring-wave r3"></div>
              <div className="dance-culture__figure-silhouette">🕺</div>
            </div>
          </div>

          {/* Dance Styles Cards */}
          <div className="dance-culture__dances-grid">
            {currentDanceEra.dances.map((dance, i) => (
              <div key={i} className="dance-card">
                <div className="dance-card__header">
                  <span className="dance-card__index">0{i + 1}</span>
                  <span className="dance-card__tempo">{dance.tempo}</span>
                </div>
                <h4 className="dance-card__name">{dance.name}</h4>
                <div className="dance-card__origin">📍 {dance.origin}</div>
                <p className="dance-card__desc">{dance.description}</p>
                <div className="dance-card__sig-move">
                  <span className="dance-card__sig-label">SIGNATURE TECHNIQUE:</span>
                  <span className="dance-card__sig-val">{dance.signatureMove}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
