import confetti from 'canvas-confetti';

// Safe AudioContext singleton
let audioCtx: AudioContext | null = null;
let isAudioMuted: boolean = false;

// Check localStorage for audio preference if available
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('sababa_sound_muted');
    if (saved === 'true') isAudioMuted = true;
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function isSoundMuted(): boolean {
  return isAudioMuted;
}

export function setSoundMuted(muted: boolean): void {
  isAudioMuted = muted;
  try {
    localStorage.setItem('sababa_sound_muted', muted ? 'true' : 'false');
  } catch {
    // Ignore
  }
}

export function toggleSoundMute(): boolean {
  setSoundMuted(!isAudioMuted);
  return isAudioMuted;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Voice selection preferences and voice caching
let preferredGender: 'female' | 'male' = 'female';
let selectedVoiceURI: string | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voice caching & load saved preferences
if (typeof window !== 'undefined') {
  try {
    const savedGender = localStorage.getItem('sababa_voice_gender');
    if (savedGender === 'male' || savedGender === 'female') {
      preferredGender = savedGender;
    }
    const savedURI = localStorage.getItem('sababa_voice_uri');
    if (savedURI) {
      selectedVoiceURI = savedURI;
    }
  } catch {
    // Ignore storage errors
  }

  if ('speechSynthesis' in window) {
    const updateVoices = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

export function getVoiceGender(): 'female' | 'male' {
  return preferredGender;
}

export function setVoiceGender(gender: 'female' | 'male'): void {
  preferredGender = gender;
  try {
    localStorage.setItem('sababa_voice_gender', gender);
  } catch {
    // Ignore
  }
}

export function getSelectedVoiceURI(): string | null {
  return selectedVoiceURI;
}

export function setSelectedVoiceURI(uri: string | null): void {
  selectedVoiceURI = uri;
  try {
    if (uri) {
      localStorage.setItem('sababa_voice_uri', uri);
    } else {
      localStorage.removeItem('sababa_voice_uri');
    }
  } catch {
    // Ignore
  }
}

export function getAvailableEnglishVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  return voices.filter((v) => v.lang.startsWith('en') && !isRoboticDistortedVoice(v.name));
}

function isRoboticDistortedVoice(name: string): boolean {
  const lower = name.toLowerCase();
  const blacklisted = [
    'bad news', 'bells', 'cellos', 'trinoids', 'zarvox', 'whisper', 
    'wobble', 'organ', 'boing', 'albert', 'deranged', 'hysterical', 
    'pipe organ', 'junior'
  ];
  return blacklisted.some((b) => lower.includes(b));
}

/**
 * Find the most natural, human-sounding voice available in the current browser.
 * Strongly prioritizes natural female educator voices (Google US English, Samantha, Jenny, Aria)
 * to avoid metallic robotic artifacts.
 */
export function getBestVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. User explicitly picked a specific voice URI
  if (selectedVoiceURI) {
    const userChoice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (userChoice) return userChoice;
  }

  const englishVoices = voices.filter((v) => v.lang.startsWith('en') && !isRoboticDistortedVoice(v.name));
  if (englishVoices.length === 0) return voices[0] || null;

  if (preferredGender === 'female') {
    // Tier 1: Premium online / neural / warm female teacher voices
    const topTierFemaleNames = [
      'google us english', // High clarity standard female on Chrome/Android
      'google uk english female',
      'jenny', // Microsoft Natural Jenny
      'aria',  // Microsoft Natural Aria
      'samantha', // Apple macOS / iOS top natural female
      'victoria',
      'karen',
      'ava',
      'moira',
      'tessa',
      'fiona',
      'serena',
      'allison',
      'zira' // Microsoft Zira female
    ];

    for (const name of topTierFemaleNames) {
      const match = englishVoices.find((v) => v.name.toLowerCase().includes(name));
      if (match) return match;
    }

    // Tier 2: Any English voice with "female", "natural", or "neural"
    const generalFemale = englishVoices.find((v) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('female') ||
        ((n.includes('natural') || n.includes('neural') || n.includes('online')) &&
          !n.includes('guy') && !n.includes('david') && !n.includes('mark') && !n.includes('george'))
      );
    });
    if (generalFemale) return generalFemale;
  } else {
    // User prefers male voice:
    const topTierMaleNames = ['guy', 'david', 'alex', 'daniel', 'fred', 'george', 'google uk english male'];
    for (const name of topTierMaleNames) {
      const match = englishVoices.find((v) => v.name.toLowerCase().includes(name));
      if (match) return match;
    }
  }

  // Tier 3: Any high quality en-US / en-GB voice
  const standardEn = englishVoices.find((v) => v.lang.startsWith('en-US')) ||
                     englishVoices.find((v) => v.lang.startsWith('en-GB')) ||
                     englishVoices[0];
  return standardEn || null;
}

/**
 * Text-to-Speech using native Web Speech API with smooth, natural cadence
 * Configured at natural 1.0 pitch to eliminate metallic comb-filtering.
 */
export function speakEnglish(text: string, rate: number = 0.85, onEnd?: () => void): void {
  if (isAudioMuted) {
    if (onEnd) onEnd();
    return;
  }
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate; // Clear, measured pace for ESL learners
    utterance.pitch = 1.0; // Clean natural human formant (no metallic DSP shift)

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    const voice = getBestVoice();
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Speech error:', err);
    if (onEnd) onEnd();
  }
}

/**
 * Speak isolated phonics target sound and word using Web Speech API
 * Specially tuned with natural female voice for clear Hebrew P vs F distinction.
 */
export function speakPhonicsTargetSound(letter: string, word?: string, onEnd?: () => void): void {
  if (isAudioMuted) {
    if (onEnd) onEnd();
    return;
  }
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    let phrase = '';
    const upper = letter.toUpperCase();

    if (upper === 'P') {
      phrase = word ? `Letter P. Sound puh. ${word}.` : 'Letter P. Sound puh.';
    } else if (upper === 'F') {
      phrase = word ? `Letter F. Sound fff. ${word}.` : 'Letter F. Sound fff.';
    } else if (upper === 'B') {
      phrase = word ? `Letter B. Sound buh. ${word}.` : 'Letter B. Sound buh.';
    } else if (upper === 'V') {
      phrase = word ? `Letter V. Sound vvv. ${word}.` : 'Letter V. Sound vvv.';
    } else if (upper === 'TH') {
      phrase = word ? `Letters T H. Sound thhh. ${word}.` : 'Letters T H. Sound thhh.';
    } else {
      phrase = word ? `Sound ${letter}... ${word}.` : `Sound ${letter}.`;
    }

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'en-US';
    utterance.rate = 0.78; // Measured natural educational tempo
    utterance.pitch = 1.0; // Natural warm pitch

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    const voice = getBestVoice();
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Phonics speech error:', err);
    if (onEnd) onEnd();
  }
}

/**
 * Speak isolated phoneme sound only (/p/, /f/, /b/, etc.)
 */
export function speakPhonemeOnly(letter: string, onEnd?: () => void): void {
  if (isAudioMuted) {
    if (onEnd) onEnd();
    return;
  }
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const upper = letter.toUpperCase();
    let phonemeText = '';
    if (upper === 'P') phonemeText = 'Puh... puh!';
    else if (upper === 'F') phonemeText = 'Fff... fff!';
    else if (upper === 'B') phonemeText = 'Buh... buh!';
    else if (upper === 'V') phonemeText = 'Vvv... vvv!';
    else if (upper === 'TH') phonemeText = 'Thh... thh!';
    else phonemeText = letter;

    const utterance = new SpeechSynthesisUtterance(phonemeText);
    utterance.lang = 'en-US';
    utterance.rate = 0.75;
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    const voice = getBestVoice();
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Phoneme speech error:', err);
    if (onEnd) onEnd();
  }
}

/**
 * Gentle, warm, encouraging success tone (Soft marimba/harp pentatonic arpeggio)
 * Engineered using Web Audio API with a gentle lowpass filter to prevent piercing sounds in classrooms.
 */
export function playGentleSuccessTone(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Gentle, uplifting F major pentatonic harmony: F4, A4, C5, E5
  const notes = [349.23, 440.0, 523.25, 659.25];
  const now = ctx.currentTime;

  // Master warm filter to keep tone gentle and child-friendly
  const masterFilter = ctx.createBiquadFilter();
  masterFilter.type = 'lowpass';
  masterFilter.frequency.setValueAtTime(2400, now);
  masterFilter.Q.setValueAtTime(0.7, now);
  masterFilter.connect(ctx.destination);

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator(); // Soft harmonic overtone
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.07);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2, now + idx * 0.07);

    // Warm envelope: gentle soft attack and exponential soothing decay
    gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
    gain.gain.linearRampToValueAtTime(0.16, now + idx * 0.07 + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.38);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(masterFilter);

    osc.start(now + idx * 0.07);
    subOsc.start(now + idx * 0.07);

    osc.stop(now + idx * 0.07 + 0.4);
    subOsc.stop(now + idx * 0.07 + 0.4);
  });
}

/**
 * Cheerful sparkling tone specifically triggered when student earns XP
 * Two light bell-like tones with gentle shimmering vibrato.
 */
export function playXpEarnedTone(points: number = 25): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Scale frequency slightly if big milestone points
  const baseFreq = points >= 35 ? 587.33 : 523.25; // D5 or C5
  const secondFreq = points >= 35 ? 880.0 : 783.99; // A5 or G5

  [baseFreq, secondFreq].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.09);

    gain.gain.setValueAtTime(0.0001, now + idx * 0.09);
    gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.09 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.32);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.09);
    osc.stop(now + idx * 0.09 + 0.34);
  });
}

/**
 * Ascending pentatonic chime (Success sound backward-compatible alias)
 */
export function playSuccessSound(): void {
  playGentleSuccessTone();
}

/**
 * Gentle warm boop for soft retry (encouraging, non-punitive)
 */
export function playSoftRetrySound(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.16);

  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.22);
}

export function playIncorrectTone(): void {
  playSoftRetrySound();
}

/**
 * Bubble pop sound for tapping word tokens
 */
export function playPopSound(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(620, now);
  osc.frequency.exponentialRampToValueAtTime(920, now + 0.05);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * Synthetic acoustic simulation of /p/ plosive pop
 */
export function playAcousticPlosiveP(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}

/**
 * Synthetic acoustic simulation of /f/ continuous friction
 */
export function playAcousticFricativeF(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.18; // 180ms of shaped white noise
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 3500;
  filter.Q.value = 1.2;

  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.19);
}

/**
 * Launch celebratory confetti for exercise or unit completion
 */
export function triggerCelebration(): void {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.65 },
    colors: ['#0284c7', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
  });
}
