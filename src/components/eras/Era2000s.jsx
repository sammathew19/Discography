import { useState } from 'react';
import EraSection from '../EraSection/EraSection';
import { erasData } from '../../data/erasData';
import './Era2000s.css';

export default function Era2000s() {
  const era = erasData.find((e) => e.id === 'era-2000s') || erasData[3];

  // Interactive Y2K MP3 / iPod Click-Wheel simulation
  const [selectedTrack, setSelectedTrack] = useState(0);
  const mp3Tracks = [
    { title: 'One More Time', artist: 'Daft Punk', year: '2001', bitrate: '128 kbps MP3' },
    { title: 'Can’t Get You Out of My Head', artist: 'Kylie Minogue', year: '2001', bitrate: '192 kbps MP3' },
    { title: 'D.A.N.C.E.', artist: 'Justice', year: '2007', bitrate: '320 kbps MP3' },
    { title: 'Paper Planes', artist: 'M.I.A.', year: '2007', bitrate: '256 kbps MP3' },
    { title: 'Dancing On My Own', artist: 'Robyn', year: '2010', bitrate: 'VBR MP3' },
  ];

  return (
    <EraSection era={era} index={3}>
      <div className="era00">
        {/* Liquid Chrome Y2K Title Area */}
        <div className="era00__chrome-card">
          <div className="era00__floating-bubble b-1"></div>
          <div className="era00__floating-bubble b-2"></div>
          <div className="era00__chrome-header">
            <span className="era00__pill-tag">Y2K CYBER-OPTIMISM // 2000–2009</span>
            <h3 className="era00__chrome-title">LIQUID CHROME & PEER-TO-PEER</h3>
            <p className="era00__lead-desc">
              The turn of the millennium was an explosion of metallic futurism, iridescent bubble graphics, and peer-to-peer file sharing. From Napster to the original iPod, physical CD shelves evaporated into digital playlists, while French electro and dance-pop redefined mainstream television.
            </p>
          </div>

          {/* Interactive iPod / MP3 Player Widget */}
          <div className="era00__player-widget">
            <div className="era00__player-screen">
              <div className="era00__player-topbar">
                <span> iPod Mini</span>
                <span>🔋 100%</span>
              </div>
              <div className="era00__player-now">
                <span className="era00__track-count">TRACK {selectedTrack + 1} OF {mp3Tracks.length}</span>
                <h5 className="era00__track-title">{mp3Tracks[selectedTrack].title}</h5>
                <p className="era00__track-artist">{mp3Tracks[selectedTrack].artist}</p>
                <div className="era00__track-codec">{mp3Tracks[selectedTrack].bitrate}</div>
              </div>
              <div className="era00__player-progress">
                <div className="era00__player-bar"></div>
              </div>
            </div>

            <div className="era00__click-wheel">
              <button
                className="era00__wheel-btn btn-menu"
                onClick={() => setSelectedTrack((prev) => (prev > 0 ? prev - 1 : mp3Tracks.length - 1))}
                data-cursor="pointer"
              >
                MENU
              </button>
              <button
                className="era00__wheel-btn btn-prev"
                onClick={() => setSelectedTrack((prev) => (prev > 0 ? prev - 1 : mp3Tracks.length - 1))}
                data-cursor="pointer"
              >
                ⏮
              </button>
              <button
                className="era00__wheel-btn btn-next"
                onClick={() => setSelectedTrack((prev) => (prev + 1) % mp3Tracks.length)}
                data-cursor="pointer"
              >
                ⏭
              </button>
              <button
                className="era00__wheel-btn btn-play"
                onClick={() => setSelectedTrack((prev) => (prev + 1) % mp3Tracks.length)}
                data-cursor="pointer"
              >
                ⏯
              </button>
              <div
                className="era00__wheel-center"
                onClick={() => setSelectedTrack((prev) => (prev + 1) % mp3Tracks.length)}
                data-cursor="pointer"
              >
                SELECT
              </div>
            </div>
          </div>
        </div>

        {/* 2000s Defining Cultural Milestones */}
        <div className="era00__milestones-grid">
          <div className="era00__mcard era00__mcard--pyramid">
            <span className="era00__mcard-tag">COACHELLA // APRIL 29, 2006</span>
            <h4>The Daft Punk LED Pyramid Miracle</h4>
            <p>
              Under the Sahara Tent in Indio, California, Thomas Bangalter and Guy-Manuel de Homem-Christo unveiled an awe-inspiring 24-foot LED pyramid loaded with synthesized custom mashups. It converted an entire generation of rock fans into electronic dance music acolytes, launching modern worldwide festival EDM culture.
            </p>
            <div className="era00__pyramid-wireframe">
              <div className="era00__triangle">▲</div>
            </div>
          </div>

          <div className="era00__mcard">
            <span className="era00__mcard-tag">PARIS // 2007</span>
            <h4>Ed Banger & The Bloghouse Era</h4>
            <p>
              Armed with Akai MPCs and GarageBand, producers like Justice, SebastiAn, and Uffie distorted compressed electro lines into deafening rock-club energy, shared across MP3 blogs like Gorilla vs. Bear and Discobelle.
            </p>
          </div>

          <div className="era00__mcard">
            <span className="era00__mcard-tag">LONDON & IBIZA // 2000</span>
            <h4>The Superclub Golden Age</h4>
            <p>
              Cavernous multi-room institutions like Fabric London, Ministry of Sound, and Space Ibiza attracted pilgrimage dancers every weekend, turning resident superstar DJs into global touring jet-set champions.
            </p>
          </div>
        </div>

        {/* Aesthetic Badges */}
        <div className="era00__badges-row">
          <span className="era00__badge">METALLIC FROSTED PLASTIC</span>
          <span className="era00__badge">CYBER-AESTHETICS</span>
          <span className="era00__badge">AUTOTUNE CHER EFFECT</span>
          <span className="era00__badge">FLASH ANIMATION SITES</span>
          <span className="era00__badge">LIMELIGHT & WINAMP SKINS</span>
        </div>
      </div>
    </EraSection>
  );
}
