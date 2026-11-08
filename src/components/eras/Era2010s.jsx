import { useState } from 'react';
import EraSection from '../EraSection/EraSection';
import { erasData } from '../../data/erasData';
import './Era2010s.css';

export default function Era2010s() {
  const era = erasData.find((e) => e.id === 'era-2010s') || erasData[4];

  // Interactive Boiler Room Livestream Simulator
  const [streamActive, setStreamActive] = useState(true);
  const [activeSession, setActiveSession] = useState(0);

  const sessions = [
    { dj: 'Fred again..', city: 'London', venue: 'Boiler Room Studio', viewers: '2.4M' },
    { dj: 'Peggy Gou', city: 'Berlin', venue: 'Dekmantel Festival', viewers: '1.8M' },
    { dj: 'Kaytranada', city: 'Montreal', venue: 'Warehouse Broadcast', viewers: '3.1M' },
    { dj: 'Four Tet', city: 'London', venue: 'Alexandra Palace', viewers: '1.2M' },
  ];

  return (
    <EraSection era={era} index={4}>
      <div className="era10">
        {/* Minimal Brutalist Title Card */}
        <div className="era10__brutalist-hero">
          <div className="era10__top-meta">
            <span className="era10__live-indicator">
              <span className="era10__red-dot"></span> BROADCASTING LIVE // GLOBAL FEEDS
            </span>
            <span className="era10__coord">52.5200° N, 13.4050° E [BERLIN]</span>
          </div>

          <h3 className="era10__giant-lead">
            DECONSTRUCTED SOUND & HYPER-ACCELERATION
          </h3>

          <p className="era10__statement">
            Modern club culture lives simultaneously inside the concrete walls of Berghain and across frictionless smartphone livestream networks. Micro-genres evolve in weeks rather than decades. Boundary-shattering visionaries like SOPHIE synthesized synthetic materials into acoustic architecture, while African Amapiano and Latin deconstructed club rewired the global dancing body.
          </p>
        </div>

        {/* Interactive Boiler Room Broadcasting Window */}
        <div className="era10__stream-terminal">
          <div className="era10__terminal-bar">
            <div className="era10__terminal-title">
              <span className="era10__br-pill">BOILER ROOM</span>
              <span>BROADCAST SESSION #0947</span>
            </div>
            <div className="era10__terminal-stats">
              <span>{sessions[activeSession].viewers} WATCHING</span>
              <button
                className="era10__toggle-stream"
                onClick={() => setStreamActive(!streamActive)}
                data-cursor="pointer"
              >
                {streamActive ? '🔴 LIVE FEED' : '⚪ PAUSED'}
              </button>
            </div>
          </div>

          <div className={`era10__stream-monitor ${streamActive ? 'is-streaming' : ''}`}>
            <div className="era10__feed-overlay">
              <div className="era10__rec-text">LIVE STREAM · 1080P · 60FPS</div>
              <div className="era10__dj-info">
                <h4>{sessions[activeSession].dj}</h4>
                <p>{sessions[activeSession].venue} // {sessions[activeSession].city}</p>
              </div>
            </div>

            <div className="era10__audio-visualizer-bars">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="era10__vis-bar"
                  style={{
                    animationDuration: `${0.4 + (i % 8) * 0.1}s`,
                    animationDelay: `${(i % 5) * 0.08}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="era10__session-selector">
            {sessions.map((s, idx) => (
              <button
                key={idx}
                className={`era10__session-btn ${activeSession === idx ? 'is-active' : ''}`}
                onClick={() => setActiveSession(idx)}
                data-cursor="pointer"
              >
                <span className="era10__session-num">0{idx + 1}</span>
                <span className="era10__session-dj">{s.dj}</span>
                <span className="era10__session-city">{s.city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modern Culture Triad */}
        <div className="era10__triad-grid">
          <div className="era10__card">
            <span className="era10__card-sub">01 // SOUND DESIGN</span>
            <h4 className="era10__card-h">SOPHIE & Material Synthesis</h4>
            <p className="era10__card-p">
              Armed with the Elektron Monomachine, visionary Scottish artist SOPHIE refused acoustic samples, synthesizing hyper-realistic sounds of latex, metal, bubbles, and elastic physics from raw waveforms. Her vision dismantled the barrier between underground noise and chart pop.
            </p>
          </div>

          <div className="era10__card">
            <span className="era10__card-sub">02 // INSTITUTIONAL RECOGNITION</span>
            <h4 className="era10__card-h">Berghain as High Art</h4>
            <p className="era10__card-p">
              In 2016, a German federal court officially designated Berlin’s former thermal power plant Berghain as a cultural institution entitled to lower cultural tax status—legally codifying techno alongside classical opera as essential human culture.
            </p>
          </div>

          <div className="era10__card">
            <span className="era10__card-sub">03 // GLOBAL DIASPORA</span>
            <h4 className="era10__card-h">Amapiano & Global Poly-Rhythms</h4>
            <p className="era10__card-p">
              From Pretoria and Soweto, South Africa, Amapiano merged deep house, kwaito, and jazzy keyboards with distinctive, percussive "log-drum" basslines, becoming the most influential cross-continental dance music movement of the 2020s.
            </p>
          </div>
        </div>

        {/* Future Club Matrix */}
        <div className="era10__future-strip">
          <div className="era10__future-header">
            <span>THE CONTEMPORARY CONTINUUM</span>
            <h3>THE DANCE FLOOR WILL NEVER PERISH</h3>
          </div>
          <p className="era10__future-body">
            Across 50 years—from 1970s discotheques to 1980s neon grids, 1990s illegal warehouses, 2000s superclubs, and modern deconstructed festivals—the essential purpose of the dance floor has never altered: a sacred space where human beings gather in the dark to lose themselves and find each other.
          </p>
        </div>
      </div>
    </EraSection>
  );
}
