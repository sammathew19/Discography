import { useState, useEffect } from 'react';
import EraSection from '../EraSection/EraSection';
import { erasData } from '../../data/erasData';
import './Era80s.css';

export default function Era80s() {
  const era = erasData.find((e) => e.id === 'era-80s') || erasData[1];
  
  // Interactive TR-808 Step Sequencer simulation
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sequence, setSequence] = useState({
    bassDrum: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    snare:    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    hiHat:    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    clap:     [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false],
  });

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 16);
    }, 130);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleStep = (instrument, index) => {
    setSequence((prev) => ({
      ...prev,
      [instrument]: prev[instrument].map((val, i) => (i === index ? !val : val)),
    }));
  };

  return (
    <EraSection era={era} index={1}>
      <div className="era80">
        {/* Neon City Perspective Wireframe Header */}
        <div className="era80__neon-banner">
          <div className="era80__grid-horizon"></div>
          <div className="era80__neon-text-wrap">
            <span className="era80__vhs-tag">REC ● SP [00:19:84]</span>
            <h3 className="era80__glitch-title" data-text="SILICON & SYNTHESIZERS">
              SILICON & SYNTHESIZERS
            </h3>
            <p className="era80__neon-lead">
              The 1980s decoupled music from acoustic constraints. With the introduction of the MIDI protocol in 1983 and the thunderous boom of the Roland TR-808, human musicians wired their heartbeats directly into silicon circuits.
            </p>
          </div>
        </div>

        {/* Interactive Roland TR-808 Rhythm Programmer */}
        <div className="era80__sequencer-card">
          <div className="era80__sequencer-header">
            <div className="era80__seq-brand">
              <span className="era80__seq-logo">ROLAND TR-808</span>
              <span className="era80__seq-sub">RHYTHM COMPOSER · 16-STEP MATRIX</span>
            </div>
            <button
              className={`era80__seq-btn ${isPlaying ? 'is-playing' : ''}`}
              onClick={() => setIsPlaying(!isPlaying)}
              data-cursor="pointer"
            >
              {isPlaying ? '⏸ PAUSE PATTERN' : '▶ PLAY 808 BEAT'}
            </button>
          </div>

          <div className="era80__step-counter">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className={`era80__counter-dot ${activeStep === i ? 'is-current' : ''}`}
              >
                {i + 1}
              </span>
            ))}
          </div>

          <div className="era80__track-rows">
            {Object.entries(sequence).map(([inst, steps]) => (
              <div key={inst} className="era80__track-row">
                <span className="era80__track-name">
                  {inst === 'bassDrum' ? 'BD (BASS)' : inst === 'snare' ? 'SD (SNARE)' : inst === 'hiHat' ? 'CH (HAT)' : 'CP (CLAP)'}
                </span>
                <div className="era80__track-steps">
                  {steps.map((on, sIdx) => {
                    const isBeat = sIdx % 4 === 0;
                    return (
                      <button
                        key={sIdx}
                        className={`era80__step-pad ${on ? 'is-on' : ''} ${activeStep === sIdx ? 'is-active-step' : ''} ${isBeat ? 'is-downbeat' : ''}`}
                        onClick={() => toggleStep(inst, sIdx)}
                        data-cursor="pointer"
                        aria-label={`Step ${sIdx + 1} for ${inst}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="era80__seq-foot">Tap pads to program your own 808 rhythm in real time</p>
        </div>

        {/* 80s Cultural Pillars */}
        <div className="era80__pillars-grid">
          <div className="era80__pillar">
            <div className="era80__pillar-badge">01 // THE VISUAL REVOLUTION</div>
            <h4 className="era80__pillar-title">MTV & Cinematic Identity</h4>
            <p className="era80__pillar-desc">
              Launching in August 1981, Music Television transformed musicians from invisible record voices into global audiovisual icons. Songs were now accompanied by high-concept narrative cinema, leather jackets, neon makeup, and dance routines that swept the planet.
            </p>
            <div className="era80__scanline-box">
              <span>VHS SCANLINE TRANSMISSION</span>
            </div>
          </div>

          <div className="era80__pillar">
            <div className="era80__pillar-badge">02 // MANCHESTER WAREHOUSES</div>
            <h4 className="era80__pillar-title">New Order & The Haçienda</h4>
            <p className="era80__pillar-desc">
              In industrial Manchester, New Order financed Factory Records’ cavernous club, The Haçienda (FAC 51). Their 1983 anthem "Blue Monday" became the biggest-selling 12" single in vinyl history, welding British post-punk to New York electro club sequencers.
            </p>
            <div className="era80__scanline-box">
              <span>FAC 51 // THE HAÇIENDA</span>
            </div>
          </div>

          <div className="era80__pillar">
            <div className="era80__pillar-badge">03 // THE BIRTH OF TECHNO</div>
            <h4 className="era80__pillar-title">The Belleville Three</h4>
            <p className="era80__pillar-desc">
              High school friends Juan Atkins, Derrick May, and Kevin Saunderson fused Kraftwerk’s mechanical European synthesizer lines with Parliament funk in Detroit, Michigan. Atkins named the emergent genre "Techno", forging a machine-age sanctuary for post-industrial Detroit.
            </p>
            <div className="era80__scanline-box">
              <span>DETROIT // 313 MOTOR CITY</span>
            </div>
          </div>
        </div>

        {/* Synthesizers That Changed The World */}
        <div className="era80__gear-section">
          <h4 className="era80__gear-title">SACRED HARDWARE OF THE SYNTH ERA</h4>
          <div className="era80__gear-grid">
            <div className="era80__gear-card">
              <span className="era80__gear-code">ROLAND TR-808</span>
              <h5>The Bass Machine</h5>
              <p>Reverberated low-end bass kicks that became the heartbeat of hip-hop, electro, and modern dance music.</p>
            </div>
            <div className="era80__gear-card">
              <span className="era80__gear-code">YAMAHA DX7</span>
              <h5>Digital FM Synthesis</h5>
              <p>The first commercially ubiquitous digital synth, heard on thousands of 80s pop ballads and electric piano tracks.</p>
            </div>
            <div className="era80__gear-card">
              <span className="era80__gear-code">LINNDRUM LM-1</span>
              <h5>Sampled Drum Royalty</h5>
              <p>Prince’s weapon of choice, famous for its dry, tuned acoustic snare and rimshot programmed on "1999".</p>
            </div>
            <div className="era80__gear-card">
              <span className="era80__gear-code">FAIRLIGHT CMI</span>
              <h5>The First Sampler Workstation</h5>
              <p>Enabled Kate Bush, Peter Gabriel, and Art of Noise to sample real-world objects and turn everyday sounds into music.</p>
            </div>
          </div>
        </div>
      </div>
    </EraSection>
  );
}
