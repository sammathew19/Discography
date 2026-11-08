import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

/**
 * Sound Manager Context & Provider
 * Manages procedurally generated audio using Web Audio API.
 * No audio files needed — everything is synthesized.
 */

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const ambientNodesRef = useRef([]);
  const masterGainRef = useRef(null);

  /** Lazily initialize AudioContext on first user interaction */
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();

      /* Master gain */
      const masterGain = audioCtxRef.current.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(audioCtxRef.current.destination);
      masterGainRef.current = masterGain;
    }

    /* Resume if suspended */
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    return audioCtxRef.current;
  }, []);

  /** Create the ambient drone/pad sound */
  const startAmbient = useCallback(() => {
    const ctx = getAudioContext();
    const master = masterGainRef.current;

    /* Stop any existing ambient nodes */
    stopAmbient();

    const nodes = [];

    /* --- Sub bass hum (45 Hz sine) --- */
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.value = 45;
    subGain.gain.value = 0.08;
    subOsc.connect(subGain);
    subGain.connect(master);
    subOsc.start();
    nodes.push({ osc: subOsc, gain: subGain });

    /* --- Low hum (90 Hz triangle) --- */
    const humOsc = ctx.createOscillator();
    const humGain = ctx.createGain();
    humOsc.type = 'triangle';
    humOsc.frequency.value = 90;
    humGain.gain.value = 0.04;
    humOsc.connect(humGain);
    humGain.connect(master);
    humOsc.start();
    nodes.push({ osc: humOsc, gain: humGain });

    /* --- Atmospheric pad (filtered sawtooth chord) --- */
    const padFrequencies = [110, 164.81, 220, 329.63]; /* Am chord */
    padFrequencies.forEach((freq) => {
      const padOsc = ctx.createOscillator();
      const padGain = ctx.createGain();
      const padFilter = ctx.createBiquadFilter();

      padOsc.type = 'sawtooth';
      padOsc.frequency.value = freq;

      /* Slow detune LFO for subtle movement */
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + Math.random() * 0.2;
      lfoGain.gain.value = 3;
      lfo.connect(lfoGain);
      lfoGain.connect(padOsc.detune);
      lfo.start();

      padFilter.type = 'lowpass';
      padFilter.frequency.value = 400;
      padFilter.Q.value = 2;

      /* Slow filter sweep */
      const filterLfo = ctx.createOscillator();
      const filterLfoGain = ctx.createGain();
      filterLfo.type = 'sine';
      filterLfo.frequency.value = 0.05 + Math.random() * 0.05;
      filterLfoGain.gain.value = 200;
      filterLfo.connect(filterLfoGain);
      filterLfoGain.connect(padFilter.frequency);
      filterLfo.start();

      padGain.gain.value = 0.012;

      padOsc.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(master);
      padOsc.start();

      nodes.push(
        { osc: padOsc, gain: padGain },
        { osc: lfo, gain: lfoGain },
        { osc: filterLfo, gain: filterLfoGain }
      );
    });

    ambientNodesRef.current = nodes;
  }, [getAudioContext]);

  /** Stop all ambient sounds */
  const stopAmbient = useCallback(() => {
    ambientNodesRef.current.forEach(({ osc }) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        /* Already stopped */
      }
    });
    ambientNodesRef.current = [];
  }, []);

  /** Toggle sound on/off */
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      const ctx = getAudioContext();

      if (next) {
        startAmbient();
        /* Fade in master gain */
        masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.5);
      } else {
        /* Fade out then stop */
        masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => stopAmbient(), 600);
      }

      return next;
    });
  }, [getAudioContext, startAmbient, stopAmbient]);

  /**
   * Play a procedurally generated whoosh/sweep transition sound.
   * Short burst — does not require ambient to be active.
   */
  const playTransition = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    const master = masterGainRef.current;
    const now = ctx.currentTime;

    /* --- Noise burst (whoosh) --- */
    const bufferSize = ctx.sampleRate * 0.6;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(4000, now + 0.15);
    noiseFilter.frequency.exponentialRampToValueAtTime(800, now + 0.5);
    noiseFilter.Q.value = 1.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noiseSource.start(now);
    noiseSource.stop(now + 0.6);

    /* --- Rising sweep tone --- */
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweepOsc.type = 'sine';
    sweepOsc.frequency.setValueAtTime(100, now);
    sweepOsc.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
    sweepOsc.frequency.exponentialRampToValueAtTime(600, now + 0.5);

    sweepGain.gain.setValueAtTime(0, now);
    sweepGain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    sweepOsc.connect(sweepGain);
    sweepGain.connect(master);
    sweepOsc.start(now);
    sweepOsc.stop(now + 0.55);

    /* --- Sub impact --- */
    const impactOsc = ctx.createOscillator();
    const impactGain = ctx.createGain();
    impactOsc.type = 'sine';
    impactOsc.frequency.setValueAtTime(80, now);
    impactOsc.frequency.exponentialRampToValueAtTime(30, now + 0.3);

    impactGain.gain.setValueAtTime(0.3, now);
    impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    impactOsc.connect(impactGain);
    impactGain.connect(master);
    impactOsc.start(now);
    impactOsc.stop(now + 0.45);
  }, [soundEnabled, getAudioContext]);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [stopAmbient]);

  const value = {
    soundEnabled,
    toggleSound,
    playTransition,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

/**
 * Hook to access sound manager context.
 * @returns {{ soundEnabled: boolean, toggleSound: Function, playTransition: Function }}
 */
export default function useSoundManager() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundManager must be used within a SoundProvider');
  }
  return context;
}
