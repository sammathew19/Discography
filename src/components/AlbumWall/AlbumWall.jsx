import { useState, useMemo } from 'react';
import { albumsData } from '../../data/albumsData';
import './AlbumWall.css';

export default function AlbumWall() {
  const [selectedDecade, setSelectedDecade] = useState('all');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlbums = useMemo(() => {
    return albumsData.filter((alb) => {
      const matchDecade = selectedDecade === 'all' || alb.era === selectedDecade;
      const matchSearch =
        searchQuery === '' ||
        alb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alb.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alb.genre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDecade && matchSearch;
    });
  }, [selectedDecade, searchQuery]);

  return (
    <section className="album-wall" id="album-archive">
      <div className="album-wall__container">
        {/* Section Header */}
        <div className="album-wall__header">
          <div className="album-wall__meta">
            <span className="album-wall__num">06 // THE LIVING RECORD COLLECTION</span>
            <h2 className="album-wall__title">THE SOUND ARCHIVE</h2>
            <p className="album-wall__subtitle">
              50 monumental records that defined dancefloors, engineered sonic revolutions, and altered the trajectory of modern culture.
            </p>
          </div>

          {/* Decade Filter Controls */}
          <div className="album-wall__filter-row">
            <div className="album-wall__decades">
              {[
                { id: 'all', label: 'ALL ERAS' },
                { id: 'era-70s', label: '70s DISCO' },
                { id: 'era-80s', label: '80s SYNTH' },
                { id: 'era-90s', label: '90s RAVE' },
                { id: 'era-2000s', label: '2000s Y2K' },
                { id: 'era-2010s', label: '2010s+ CLUB' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  className={`album-wall__decade-btn ${selectedDecade === btn.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedDecade(btn.id)}
                  data-cursor="pointer"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="album-wall__search-wrap">
              <input
                type="text"
                placeholder="Search artists, tracks, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="album-wall__search-input"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Album Grid */}
        <div className="album-wall__grid">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="album-card"
              style={{
                '--album-color': album.color,
                '--album-accent': album.accentColor,
              }}
              onClick={() => setSelectedAlbum(album)}
              data-cursor="pointer"
            >
              <div className="album-card__cover">
                <div className="album-card__artwork">
                  <div className="album-card__initials">{album.iconLetter}</div>
                  <div className="album-card__sheen"></div>
                  <div className="album-card__vinyl-edge"></div>
                </div>
                <div className="album-card__badge-year">{album.year}</div>
                <div className="album-card__badge-bpm">{album.bpm}</div>
              </div>

              <div className="album-card__meta">
                <h4 className="album-card__title">{album.title}</h4>
                <p className="album-card__artist">{album.artist}</p>
                <div className="album-card__genre-pill">{album.genre}</div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlbums.length === 0 && (
          <div className="album-wall__empty">
            <p>No albums matched your search. Try another query or select "ALL ERAS".</p>
          </div>
        )}
      </div>

      {/* Album Modal Detail Experience */}
      {selectedAlbum && (
        <div className="album-modal" onClick={() => setSelectedAlbum(null)}>
          <div className="album-modal__dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="album-modal__close"
              onClick={() => setSelectedAlbum(null)}
              aria-label="Close modal"
              data-cursor="pointer"
            >
              ✕
            </button>

            <div className="album-modal__body">
              <div
                className="album-modal__artwork"
                style={{
                  '--modal-color': selectedAlbum.color,
                  '--modal-accent': selectedAlbum.accentColor,
                }}
              >
                <div className="album-modal__art-inner">
                  <span className="album-modal__giant-mono">{selectedAlbum.iconLetter}</span>
                  <div className="album-modal__spinning-vinyl"></div>
                </div>
              </div>

              <div className="album-modal__info">
                <span className="album-modal__era-tag">
                  {selectedAlbum.era.replace('era-', '').toUpperCase()} // {selectedAlbum.year}
                </span>
                <h3 className="album-modal__title">{selectedAlbum.title}</h3>
                <h4 className="album-modal__artist">{selectedAlbum.artist}</h4>

                <div className="album-modal__tags">
                  <span className="album-modal__tag-genre">{selectedAlbum.genre}</span>
                  <span className="album-modal__tag-bpm">{selectedAlbum.bpm}</span>
                  <span className="album-modal__tag-track">★ {selectedAlbum.highlightTrack}</span>
                </div>

                <div className="album-modal__significance">
                  <h5>HISTORICAL SIGNIFICANCE</h5>
                  <p>{selectedAlbum.significance}</p>
                </div>

                <div className="album-modal__actions">
                  <button
                    className="album-modal__play-cue"
                    onClick={() => alert(`Now playing preview concept for: ${selectedAlbum.title} — ${selectedAlbum.highlightTrack}`)}
                    data-cursor="pointer"
                  >
                    ▶ CUE TRACK: {selectedAlbum.highlightTrack}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
