/**
 * =========================================================================
 * ROMANTIC AUDIO ENGINE FOR AALIYAAAA
 * =========================================================================
 * Provides:
 * 1. Web Audio API based lush romantic acoustic piano/harp synthesizer
 *    (Zero external files needed, always works on any device!)
 * 2. HTML5 Audio Player for custom uploaded MP3 / audio files
 * 3. Floating persistent audio widget with sound waves animation
 * 4. Local storage / IndexedDB support for custom songs
 */

class RomanticAudioEngine {
  constructor() {
    this.isPlaying = false;
    this.currentMode = 'synth'; // 'synth' or 'file'
    this.synthCtx = null;
    this.synthInterval = null;
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.volume = 0.55;
    this.audioElement.volume = this.volume;
    this.audioElement.preload = 'auto';

    // Default site song (from config) – set immediately so it's ready on the first tap
    const defaultSrc = window.BIRTHDAY_CONFIG?.music?.audioSrc ||
      (typeof DEFAULT_CONFIG !== 'undefined' ? DEFAULT_CONFIG.music?.audioSrc : null);
    this.defaultSrc = defaultSrc;
    if (defaultSrc) {
      this.audioElement.src = defaultSrc;
      this.currentMode = 'file';
    }

    // Load any saved custom music blob from IndexedDB
    this.initIndexedDB();
    this.setupAudioListeners();
  }

  initIndexedDB() {
    const request = indexedDB.open("AaliyaMusicDB", 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("tracks")) {
        db.createObjectStore("tracks", { keyPath: "id" });
      }
    };
    request.onsuccess = (e) => {
      this.db = e.target.result;
      this.loadSavedTrack();
    };
  }

  loadSavedTrack() {
    if (!this.db) return;
    const tx = this.db.transaction("tracks", "readonly");
    const store = tx.objectStore("tracks");
    const req = store.get("custom_song");
    req.onsuccess = (e) => {
      if (req.result && req.result.blob) {
        const url = URL.createObjectURL(req.result.blob);
        this.audioElement.src = url;
        this.currentMode = 'file';
        this.updateTrackName(req.result.name || "Our Custom Song.mp3");
      } else if (this.defaultSrc && !this.audioElement.src) {
        // Default song is already set in the constructor; only (re)assign if missing
        this.audioElement.src = this.defaultSrc;
        this.currentMode = 'file';
      }
    };
  }

  saveCustomTrack(file) {
    if (!this.db) return;
    const tx = this.db.transaction("tracks", "readwrite");
    const store = tx.objectStore("tracks");
    store.put({
      id: "custom_song",
      blob: file,
      name: file.name,
      uploadedAt: new Date().toISOString()
    });
    
    const url = URL.createObjectURL(file);
    this.audioElement.src = url;
    this.currentMode = 'file';
    this.updateTrackName(file.name);
    
    if (this.isPlaying) {
      this.stopSynth();
      this.audioElement.play().catch(e => console.warn(e));
    }
  }

  setupAudioListeners() {
    this.audioElement.addEventListener('ended', () => {
      if (this.isPlaying) {
        this.audioElement.currentTime = 0;
        this.audioElement.play();
      }
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    this.isPlaying = true;
    if (this.currentMode === 'file' && this.audioElement.src) {
      this.audioElement.play().then(() => {
        this.updateUI(true);
      }).catch(err => {
        console.warn("Audio file play blocked/failed, falling back to synth:", err);
        this.startSynth();
        this.updateUI(true);
      });
    } else {
      this.startSynth();
      this.updateUI(true);
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynth();
    this.updateUI(false);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) this.audioElement.volume = this.volume;
    if (this.synthGain) this.synthGain.gain.setValueAtTime(this.volume * 0.28, this.synthCtx.currentTime);
  }

  startSynth() {
    if (this.synthInterval) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.synthCtx) {
        this.synthCtx = new AudioCtx();
      }
      if (this.synthCtx.state === 'suspended') {
        this.synthCtx.resume();
      }

      this.synthGain = this.synthCtx.createGain();
      this.synthGain.gain.value = this.volume * 0.28;
      this.synthGain.connect(this.synthCtx.destination);

      // Heartwarming romantic arpeggio chord progression in E Major:
      // E major -> G# minor -> C# minor -> A major -> F# minor -> B major
      const chords = [
        // E Maj: E3, B3, E4, G#4, B4, E5
        [164.81, 246.94, 329.63, 415.30, 493.88, 659.25],
        // B / D#: D#3, B3, F#4, B4, D#5
        [155.56, 246.94, 369.99, 493.88, 622.25],
        // C# min: C#3, G#3, E4, G#4, C#5, E5
        [138.59, 207.65, 329.63, 415.30, 554.37, 659.25],
        // A Maj: A2, E3, A3, C#4, E4, A4
        [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
        // F# min: F#2, C#3, F#3, A3, C#4, F#4
        [92.50, 138.59, 185.00, 220.00, 277.18, 369.99],
        // B Maj: B2, F#3, B3, D#4, F#4, B4
        [123.47, 185.00, 246.94, 311.13, 369.99, 493.88]
      ];

      let chordIndex = 0;
      let noteIndex = 0;

      const playNote = () => {
        if (!this.isPlaying || !this.synthCtx) return;
        const currentChord = chords[chordIndex];
        const freq = currentChord[noteIndex % currentChord.length];

        this.playPianoTone(freq);

        noteIndex++;
        if (noteIndex >= currentChord.length) {
          noteIndex = 0;
          chordIndex = (chordIndex + 1) % chords.length;
        }
      };

      // Play notes at gentle, dreamy tempo (every 480ms)
      playNote();
      this.synthInterval = setInterval(playNote, 480);
    } catch (e) {
      console.error("Synthesizer error:", e);
    }
  }

  playPianoTone(freq) {
    if (!this.synthCtx) return;
    const now = this.synthCtx.currentTime;

    // Dual oscillator for rich, warm chime/piano resonance
    const osc1 = this.synthCtx.createOscillator();
    const osc2 = this.synthCtx.createOscillator();
    const noteGain = this.synthCtx.createGain();
    const filter = this.synthCtx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.002, now); // soft harmonic shimmer

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 1.8);

    // Warm envelope
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.35, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.synthGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.3);
    osc2.stop(now + 2.3);
  }

  stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  updateTrackName(name) {
    const el = document.getElementById("music-track-title");
    if (el) el.textContent = name;
  }

  updateUI(playing) {
    const btn = document.getElementById("music-toggle-btn");
    const waves = document.getElementById("music-waves");
    const statusText = document.getElementById("music-status-text");

    if (btn) {
      if (playing) {
        btn.classList.add("is-playing");
        btn.setAttribute("aria-label", "Pause romantic music");
      } else {
        btn.classList.remove("is-playing");
        btn.setAttribute("aria-label", "Play romantic music");
      }
    }

    if (waves) {
      if (playing) {
        waves.classList.add("active");
      } else {
        waves.classList.remove("active");
      }
    }

    if (statusText) {
      statusText.textContent = playing ? "Playing: Love Melody ♪" : "Music Paused";
    }
  }
}

window.RomanticAudio = new RomanticAudioEngine();

