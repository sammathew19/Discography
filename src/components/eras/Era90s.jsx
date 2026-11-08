import { useState } from 'react';
import EraSection from '../EraSection/EraSection';
import { erasData } from '../../data/erasData';
import './Era90s.css';

export default function Era90s() {
  const era = erasData.find((e) => e.id === 'era-90s') || erasData[2];

  // Interactive Roland TB-303 Acid Filter simulator
  const [cutoff, setCutoff] = useState(65);
  const [resonance, setResonance] = useState(80);
  const [waveform, setWaveform] = useState('saw'); // 'saw' or 'square'

  return (
    <EraSection era={era} index={2}>
      <div className="era90">
        {/* Gritty Industrial Manifesto */}
        <div className="era90__banner">
          <div className="era90__warning-stripe">
            <span>/// WARNING: REPETITIVE BEATS PROHIBITED BY ORDER OF UK PARLIAMENT 1994 ///</span>
          </div>
          <div className="era90__banner-body">
            <div className="era90__banner-left">
              <span className="era90__flyer-date">SATURDAY · 03:00 AM · SECRET LOCATION</span>
              <h3 className="era90__rave-title">WAREHOUSE LIBERATION & THE TB-303</h3>
              <p className="era90__manifesto-text">
                When the 1990s struck, youth culture abandoned polished clubs for cavernous concrete power plants, airplane hangars, and orbital motorways. Fueled by the squelch of the Roland TB-303, chopped Amen breaks, and pirate radio frequencies, dance music became an act of raw cultural defiance.
              </p>
            </div>
            
            {/* Interactive TB-303 Acid Knob Box */}
            <div className="era90__synth-box">
              <div className="era90__synth-header">
                <span className="era90__synth-title">ROLAND TB-303 BASS LINE</span>
                <span className="era90__synth-acid-badge">ACID FILTER</span>
              </div>

              <div className="era90__visualizer-scope">
                <div
                  className="era90__acid-wave"
                  style={{
                    filter: `drop-shadow(0 0 ${resonance / 4}px #39ff14)`,
                    height: `${cutoff}%`,
                  }}
                >
                  <svg viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                      d={
                        waveform === 'saw'
                          ? `M0,100 L50,0 L50,100 L100,0 L100,100 L150,0 L150,100 L200,0 L200,100 L250,0 L250,100 L300,0 L300,100 L350,0 L350,100 L400,0`
                          : `M0,100 L0,10 L50,10 L50,90 L100,90 L100,10 L150,10 L150,90 L200,90 L200,10 L250,10 L250,90 L300,90 L300,10 L350,10 L350,90 L400,90`
                      }
                      fill="none"
                      stroke="#39ff14"
                      strokeWidth={resonance > 60 ? '3' : '2'}
                    />
                  </svg>
                </div>
              </div>

              <div className="era90__knob-controls">
                <div className="era90__control-group">
                  <label>CUTOFF FREQ: {cutoff}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={cutoff}
                    onChange={(e) => setCutoff(Number(e.target.value))}
                    data-cursor="pointer"
                  />
                </div>
                <div className="era90__control-group">
                  <label>RESONANCE (PEAK): {resonance}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={resonance}
                    onChange={(e) => setResonance(Number(e.target.value))}
                    data-cursor="pointer"
                  />
                </div>
                <div className="era90__toggle-row">
                  <button
                    className={`era90__wave-btn ${waveform === 'saw' ? 'is-active' : ''}`}
                    onClick={() => setWaveform('saw')}
                    data-cursor="pointer"
                  >
                    SAWTOOTH
                  </button>
                  <button
                    className={`era90__wave-btn ${waveform === 'square' ? 'is-active' : ''}`}
                    onClick={() => setWaveform('square')}
                    data-cursor="pointer"
                  >
                    SQUARE WAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 90s Pillars & Subcultures */}
        <div className="era90__subculture-grid">
          <div className="era90__card era90__card--flyer">
            <div className="era90__card-stamp">PLUR // 1992</div>
            <h4 className="era90__card-title">The UK Criminal Justice Act of 1994</h4>
            <p className="era90__card-text">
              In response to illegal gatherings like the Castlemorton Common festival, the UK government passed Section 63 of the Criminal Justice Bill, giving police powers to ban gatherings of 100+ persons where music played was "wholly or predominantly characterized by the emission of a succession of repetitive beats." The Prodigy retaliated with their seminal album <em>Music for the Jilted Generation</em>.
            </p>
          </div>

          <div className="era90__card era90__card--tresor">
            <div className="era90__card-stamp">BERLIN // 1991</div>
            <h4 className="era90__card-title">Tresor & Post-Wall Berlin</h4>
            <p className="era90__card-text">
              Following the fall of the Berlin Wall in November 1989, youth from East and West united in abandoned industrial spaces. In March 1991, Tresor opened inside a subterranean bank vault beneath Potsdamer Platz. Detroit techno titans found their European spiritual homeland amidst heavy concrete walls and smoke machines.
            </p>
          </div>

          <div className="era90__card era90__card--jungle">
            <div className="era90__card-stamp">PIRATE RADIO // 1994</div>
            <h4 className="era90__card-title">The Amen Break & Jungle / DnB</h4>
            <p className="era90__card-text">
              In East London, producers took Gregory Sylvester Coleman’s 6-second drum break from The Winstons’ 1969 track "Amen, Brother", pitched it up to 160 BPM, and sliced it with Akai samplers into syncopated, syncopated polyrhythms. Combined with Jamaican dub reggae sub-basslines, Jungle and Drum & Bass were born.
            </p>
          </div>
        </div>

        {/* Legendary Rave Movements */}
        <div className="era90__movements-strip">
          <h4 className="era90__movements-head">UNDERGROUND GENRES OF REBELLION</h4>
          <div className="era90__genre-tags">
            {['ACID HOUSE', 'DETROIT TECHNO', 'JUNGLE', 'DRUM & BASS', 'BIG BEAT', 'GOA TRANCE', 'HARDCORE GABBER', 'PROGRESSIVE HOUSE'].map((g, i) => (
              <span key={i} className="era90__genre-badge">
                <span className="era90__genre-dot"></span>
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </EraSection>
  );
}
