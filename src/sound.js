// Web Audio API Sound Synthesizer for Gravity Fruit Match Game

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('gravity_fruit_muted') === 'true';
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('gravity_fruit_muted', this.isMuted.toString());
    return this.isMuted;
  }

  // Soft click sound for UI buttons
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  // Fruit select chime
  playSelect() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, this.audioCtx.currentTime + 0.08); // E5

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.08);
  }

  // Match pop sound with optional pitch scale for combos
  playMatch(combo = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const baseFreq = 350 + Math.min(combo, 8) * 80;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, this.audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.18);
  }

  // Gravity drop falling thud sound
  playGravity() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.12);
  }

  // Mismatch error buzz
  playMismatch() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, this.audioCtx.currentTime);
    osc.frequency.setValueAtTime(120, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.16);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.16);
  }

  // Magic Powerup spark
  playPowerup() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + idx * 0.06 + 0.15);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + idx * 0.06);
      osc.stop(this.audioCtx.currentTime + idx * 0.06 + 0.15);
    });
  }

  // Level Win Victory Fanfare
  playWin() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73]; // A Major Arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.09);

      const duration = idx === notes.length - 1 ? 0.4 : 0.15;
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + idx * 0.09 + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + idx * 0.09);
      osc.stop(this.audioCtx.currentTime + idx * 0.09 + duration);
    });
  }
}

export const sound = new SoundManager();
