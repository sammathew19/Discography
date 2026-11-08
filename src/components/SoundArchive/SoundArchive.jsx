import { useState } from 'react';
import { artistsData } from '../../data/artistsData';
import './SoundArchive.css';

export default function SoundArchive() {
  const [selectedEra, setSelectedEra] = useState('all');

  const filteredArtists = artistsData.filter(
    (a) => selectedEra === 'all' || a.era === selectedEra
  );

  return (
    <section className="sound-archive" id="sound-archive">
      <div className="sound-archive__container">
        {/* Header */}
        <div className="sound-archive__header">
          <span className="sound-archive__num">08 // THE TITANS OF THE BOOTH</span>
          <h2 className="sound-archive__title">THE ARTIST ENCYCLOPEDIA</h2>
          <p className="sound-archive__subtitle">
            Meet the composers, DJs, vocalists, and sonic sculptors whose imagination transformed nightlife into a global cultural phenomenon.
          </p>

          <div className="sound-archive__filter-tabs">
            {[
              { id: 'all', label: 'ALL ARTISTS' },
              { id: 'era-70s', label: '70s PIONEERS' },
              { id: 'era-80s', label: '80s ARCHITECTS' },
              { id: 'era-90s', label: '90s ALCHEMISTS' },
              { id: 'era-2000s', label: '2000s ICONS' },
              { id: 'era-2010s', label: 'MODERN VISIONARIES' },
            ].map((btn) => (
              <button
                key={btn.id}
                className={`sound-archive__tab ${selectedEra === btn.id ? 'is-active' : ''}`}
                onClick={() => setSelectedEra(btn.id)}
                data-cursor="pointer"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Artists Grid */}
        <div className="sound-archive__artists-grid">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="artist-card"
              style={{ '--artist-accent': artist.color || '#d4af37' }}
            >
              <div className="artist-card__top">
                <span className="artist-card__era">
                  {artist.era.replace('era-', '').toUpperCase()}
                </span>
                <span className="artist-card__role">{artist.role}</span>
              </div>

              <h3 className="artist-card__name">{artist.name}</h3>
              <p className="artist-card__bio">{artist.bio}</p>

              <div className="artist-card__genres">
                {artist.genres.map((g, i) => (
                  <span key={i} className="artist-card__genre-pill">
                    {g}
                  </span>
                ))}
              </div>

              <div className="artist-card__works">
                <span className="artist-card__works-label">KEY ANTHEMS:</span>
                <ul className="artist-card__works-list">
                  {artist.notableWorks.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>

              {artist.legacy && (
                <div className="artist-card__legacy">
                  <span>HISTORIC IMPACT:</span>
                  <p>{artist.legacy}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
