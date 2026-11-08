import { useState, useEffect } from 'react';
import { SoundProvider } from './hooks/useSoundManager';
import useSoundManager from './hooks/useSoundManager';
import useLenis from './hooks/useLenis';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Cursor from './components/Cursor/Cursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Era70s from './components/eras/Era70s';
import Era80s from './components/eras/Era80s';
import Era90s from './components/eras/Era90s';
import Era2000s from './components/eras/Era2000s';
import Era2010s from './components/eras/Era2010s';
import EraTransition from './components/Transitions/EraTransition';
import AlbumWall from './components/AlbumWall/AlbumWall';
import DanceCulture from './components/DanceCulture/DanceCulture';
import SoundArchive from './components/SoundArchive/SoundArchive';
import Finale from './components/Finale/Finale';
import './App.css';

function MainExperience() {
  const [loaded, setLoaded] = useState(false);
  const [currentEra, setCurrentEra] = useState('era-70s');
  const { soundEnabled, toggleSound, playTransition } = useSoundManager();
  const { scrollTo } = useLenis();

  // Track active section on scroll to update current era
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const eraSections = [
        { id: 'era-70s', era: 'era-70s' },
        { id: 'era-80s', era: 'era-80s' },
        { id: 'era-90s', era: 'era-90s' },
        { id: 'era-2000s', era: 'era-2000s' },
        { id: 'era-2010s', era: 'era-2010s' },
        { id: 'album-archive', era: 'era-70s' },
        { id: 'the-movement', era: 'era-80s' },
        { id: 'sound-archive', era: 'era-90s' },
        { id: 'finale', era: 'era-2010s' },
      ];

      for (let i = eraSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(eraSections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          if (currentEra !== eraSections[i].era) {
            setCurrentEra(eraSections[i].era);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentEra]);

  const handleNavigate = (sectionId) => {
    if (playTransition) playTransition();
    const el = document.getElementById(sectionId);
    if (el) {
      scrollTo(el, { offset: -60 });
    }
  };

  const handleRestart = () => {
    if (playTransition) playTransition();
    scrollTo(0);
  };

  return (
    <div className={`discography-app discography-app--${currentEra}`}>
      {/* Loading Screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Custom Interactive Cursor */}
      <Cursor currentEra={currentEra} />

      {/* Fixed Vertical Scroll Progress with Era Markers */}
      <ScrollProgress currentEra={currentEra} />

      {/* Global Navigation Header */}
      <Navigation
        currentEra={currentEra}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
      />

      {/* ─── Hero Section with 3D Disco Ball ─── */}
      <Hero soundEnabled={soundEnabled} toggleSound={toggleSound} />

      {/* ─── Five Musical Universes & Cinematic Transitions ─── */}
      <main className="discography-main">
        {/* ERA 01: 70s Disco Fever */}
        <Era70s />

        {/* Cinematic Transition 70s -> 80s */}
        <EraTransition
          fromEra="era-70s"
          toEra="era-80s"
          title="FROM GOLDEN VELVET TO NEON CIRCUITS"
          subtitle="The disco ball reflections expand into electric blue grids and silicon synthesizer arpeggios."
        />

        {/* ERA 02: 80s The Synth Revolution */}
        <Era80s />

        {/* Cinematic Transition 80s -> 90s */}
        <EraTransition
          fromEra="era-80s"
          toEra="era-90s"
          title="GLITCH TRANSMISSION // ENTER THE UNDERGROUND"
          subtitle="Neon skylines fracture into strobing warehouse darkness, acid squelches, and high-velocity breakbeats."
        />

        {/* ERA 03: 90s Underground Rave Culture */}
        <Era90s />

        {/* Cinematic Transition 90s -> 2000s */}
        <EraTransition
          fromEra="era-90s"
          toEra="era-2000s"
          title="INDUSTRIAL GRIME DISSOLVES TO LIQUID CHROME"
          subtitle="Warehouse fog condenses into sleek millennium cyber-surfaces, MP3 clicks, and glossy dance-pop ecstasy."
        />

        {/* ERA 04: 2000s Y2K Pop */}
        <Era2000s />

        {/* Cinematic Transition 2000s -> 2010s */}
        <EraTransition
          fromEra="era-2000s"
          toEra="era-2010s"
          title="CYBERNETIC MORPH TO THE DECONSTRUCTED FUTURE"
          subtitle="Glossy bubble pop dissolves into minimalist brutalism, hyperpop velocity, and global livestream frequencies."
        />

        {/* ERA 05: 2010s-2020s The New Club Culture */}
        <Era2010s />

        {/* ─── Landmark Sections ─── */}
        {/* The 50-Album Interactive Archive */}
        <AlbumWall />

        {/* The Movement: Dance Culture Evolution */}
        <DanceCulture />

        {/* The Sound Archive: Artist Encyclopedia */}
        <SoundArchive />

        {/* The Grand Finale: Music Never Ends */}
        <Finale onRestart={handleRestart} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <MainExperience />
    </SoundProvider>
  );
}
