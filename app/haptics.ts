export type HapticKind =
  | "success"
  | "warning"
  | "error"
  | "light"
  | "medium"
  | "heavy"
  | "soft"
  | "rigid"
  | "selection"
  | "nudge"
  | "strong";

type Pulse = { duration: number; intensity: number; delay: number };

const patterns: Record<HapticKind, Pulse[]> = {
  success: [{ duration: 30, intensity: 0.5, delay: 0 }, { duration: 40, intensity: 1, delay: 60 }],
  warning: [{ duration: 40, intensity: 0.8, delay: 0 }, { duration: 40, intensity: 0.6, delay: 100 }],
  error: [{ duration: 40, intensity: 0.7, delay: 0 }, { duration: 40, intensity: 0.7, delay: 40 }, { duration: 40, intensity: 0.9, delay: 40 }],
  light: [{ duration: 15, intensity: 0.4, delay: 0 }],
  medium: [{ duration: 25, intensity: 0.7, delay: 0 }],
  heavy: [{ duration: 35, intensity: 1, delay: 0 }],
  soft: [{ duration: 40, intensity: 0.5, delay: 0 }],
  rigid: [{ duration: 10, intensity: 1, delay: 0 }],
  selection: [{ duration: 8, intensity: 0.3, delay: 0 }],
  nudge: [{ duration: 80, intensity: 0.8, delay: 0 }, { duration: 50, intensity: 0.3, delay: 80 }],
  strong: [{ duration: 90, intensity: 1, delay: 0 }],
};

let audioContext: AudioContext | null = null;

function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function userActivated() {
  const activation = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
  return activation?.hasBeenActive ?? true;
}

function context() {
  const AudioContextClass = window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext || audioContext.state === "closed") {
    audioContext = new AudioContextClass({ latencyHint: "interactive" });
  }
  return audioContext;
}

export async function warmHaptics() {
  if (!userActivated()) return false;
  const activeContext = context();
  if (!activeContext) return false;
  try {
    if (activeContext.state !== "running") await activeContext.resume();
  } catch {
    return false;
  }

  if (activeContext.state !== "running") return false;
  const buffer = activeContext.createBuffer(1, 1, activeContext.sampleRate);
  const source = activeContext.createBufferSource();
  source.buffer = buffer;
  source.connect(activeContext.destination);
  source.start();
  source.onended = () => source.disconnect();
  return true;
}

export function playThemeSwell(direction: "up" | "down") {
  if (typeof window === "undefined") return;
  const activeContext = context();
  if (!activeContext) return;

  const play = () => {
    const start = activeContext.currentTime + 0.02;
    const end = start + 0.36;
    const [startPitch, endPitch] = direction === "up" ? [330, 494] : [494, 330];
    const [startCutoff, endCutoff] = direction === "up" ? [500, 3200] : [3200, 700];

    const gain = activeContext.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.14, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);

    const filter = activeContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(startCutoff, start);
    filter.frequency.exponentialRampToValueAtTime(endCutoff, end);
    filter.connect(gain);
    gain.connect(activeContext.destination);

    const oscillator = activeContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(startPitch, start);
    oscillator.frequency.exponentialRampToValueAtTime(endPitch, end);
    oscillator.connect(filter);
    oscillator.start(start);
    oscillator.stop(start + 0.45);
    oscillator.onended = () => {
      oscillator.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  };

  if (activeContext.state === "running") play();
  else void warmHaptics().then((ready) => ready && play());
}

export function dragHaptic(phase: "lift" | "drop", touch = false) {
  if (typeof window === "undefined") return;

  if (touch && "vibrate" in navigator) {
    navigator.vibrate(phase === "lift" ? 8 : [10, 20, 7]);
  }
  if (!finePointer()) return;

  const activeContext = context();
  if (!activeContext) return;
  const play = () => {
    const start = activeContext.currentTime + 0.008;
    const duration = phase === "lift" ? 0.055 : 0.08;
    const oscillator = activeContext.createOscillator();
    const toneGain = activeContext.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(phase === "lift" ? 260 : 330, start);
    oscillator.frequency.exponentialRampToValueAtTime(phase === "lift" ? 340 : 210, start + duration);
    toneGain.gain.setValueAtTime(0.0001, start);
    toneGain.gain.exponentialRampToValueAtTime(phase === "lift" ? 0.016 : 0.022, start + 0.008);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(toneGain);
    toneGain.connect(activeContext.destination);

    const noiseDuration = phase === "lift" ? 0.012 : 0.018;
    const buffer = activeContext.createBuffer(1, Math.ceil(activeContext.sampleRate * noiseDuration), activeContext.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) channel[index] = (Math.random() * 2 - 1) * Math.exp(-index / 90);
    const noise = activeContext.createBufferSource();
    const filter = activeContext.createBiquadFilter();
    const noiseGain = activeContext.createGain();
    noise.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = phase === "lift" ? 1800 : 1350;
    filter.Q.value = 1.2;
    noiseGain.gain.setValueAtTime(phase === "lift" ? 0.018 : 0.024, start);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, start + noiseDuration);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(activeContext.destination);

    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
    noise.start(start);
    oscillator.onended = () => {
      oscillator.disconnect();
      toneGain.disconnect();
      noise.disconnect();
      filter.disconnect();
      noiseGain.disconnect();
    };
  };

  if (activeContext.state === "running") play();
  else void warmHaptics().then((ready) => ready && play());
}

function noisePulse(activeContext: AudioContext, start: number, intensity: number, volume: number, kind: HapticKind) {
  const soft = kind === "soft";
  const duration = soft ? 0.012 : 0.006;
  const buffer = activeContext.createBuffer(1, Math.max(1, Math.floor(activeContext.sampleRate * duration)), activeContext.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = (Math.random() * 2 - 1) * Math.exp(-index / (soft ? 55 : 24));
  }

  const source = activeContext.createBufferSource();
  const filter = activeContext.createBiquadFilter();
  const gain = activeContext.createGain();
  const pitch = kind === "rigid" || kind === "error" ? 1.2 : kind === "selection" ? 1.35 : soft ? 0.65 : 1;
  filter.type = "bandpass";
  filter.frequency.value = (1800 + intensity * 2800) * pitch;
  filter.Q.value = soft ? 3 : 8;
  gain.gain.value = Math.max(0, Math.min(1, volume)) * (0.18 + intensity * 0.42);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(activeContext.destination);

  const oscillator = activeContext.createOscillator();
  const toneGain = activeContext.createGain();
  const toneDuration = soft ? 0.032 : 0.018;
  oscillator.type = soft ? "sine" : "triangle";
  oscillator.frequency.setValueAtTime((soft ? 250 : 430) + intensity * 260, start);
  toneGain.gain.setValueAtTime(0.0001, start);
  toneGain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume * (0.022 + intensity * 0.026)), start + 0.002);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, start + toneDuration);
  oscillator.connect(toneGain);
  toneGain.connect(activeContext.destination);

  source.start(start);
  oscillator.start(start);
  oscillator.stop(start + toneDuration + 0.004);
  source.onended = () => {
    source.disconnect();
    filter.disconnect();
    gain.disconnect();
  };
  oscillator.onended = () => {
    oscillator.disconnect();
    toneGain.disconnect();
  };
}

export function haptic(kind: HapticKind, volume = 0.45, touch = false) {
  if (typeof window === "undefined") return;

  if (touch && "vibrate" in navigator) {
    const vibration = patterns[kind].flatMap((pulse, index) => index === 0 ? [pulse.duration] : [pulse.delay, pulse.duration]);
    navigator.vibrate(vibration);
  }

  if (!finePointer() || !userActivated()) return;
  const activeContext = context();
  if (!activeContext) return;
  const play = () => {
    let start = activeContext.currentTime + 0.006;
    patterns[kind].forEach((pulse) => {
      start += pulse.delay / 1000;
      const interval = 16 + (1 - pulse.intensity) * 184;
      const count = Math.max(1, Math.ceil(pulse.duration / interval));
      for (let index = 0; index < count; index += 1) {
        noisePulse(activeContext, start + index * interval / 1000, pulse.intensity, volume, kind);
      }
      start += pulse.duration / 1000;
    });
  };

  if (activeContext.state === "running") play();
  else void warmHaptics().then((ready) => ready && play());
}
