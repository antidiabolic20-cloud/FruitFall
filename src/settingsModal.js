// Settings & How To Play & Stats Modal Component - AAA Aesthetic Polish

import { sound } from './sound.js';
import { WORLDS, LEVELS } from './levels.js';

export class SettingsModal {
  constructor(onClose, onResetProgress) {
    this.onClose = onClose;
    this.onResetProgress = onResetProgress;
    this.activeTab = 'settings'; // 'settings' | 'guide' | 'stats'
  }

  getHighestUnlockedLevel() {
    const saved = localStorage.getItem('gravity_fruit_highest_level');
    return saved ? parseInt(saved, 10) : 1;
  }

  getTotalStars() {
    let total = 0;
    LEVELS.forEach(l => {
      const saved = localStorage.getItem(`gravity_fruit_stars_${l.id}`);
      if (saved) total += parseInt(saved, 10);
      else if (l.id < this.getHighestUnlockedLevel()) total += 3;
    });
    return total;
  }

  render(container) {
    const highestLevel = this.getHighestUnlockedLevel();
    const totalStars = this.getTotalStars();
    const maxStars = LEVELS.length * 3;
    const currentWorldId = Math.min(10, Math.ceil(highestLevel / 10));

    const particlesEnabled = localStorage.getItem('gravity_fruit_particles') !== 'false';

    const modalEl = document.createElement('div');
    modalEl.className = 'modal-container';
    modalEl.innerHTML = `
      <div class="modal-card settings-modal-polished">
        <!-- Modal Header -->
        <div class="modal-header-polished">
          <div class="modal-title-group">
            <span class="header-icon-glow">⚙️</span>
            <h2>SETTINGS & GUIDE</h2>
          </div>
          <button class="close-icon-btn" id="close-settings-btn" title="Close">✖</button>
        </div>

        <!-- Tab Navigation Bar -->
        <div class="settings-tabs-nav">
          <button class="settings-tab-btn active" data-tab="settings">
            <span>⚙️</span> Options
          </button>
          <button class="settings-tab-btn" data-tab="guide">
            <span>📖</span> Guide
          </button>
          <button class="settings-tab-btn" data-tab="stats">
            <span>🏆</span> Stats
          </button>
        </div>

        <div class="settings-body-scroll">
          <!-- TAB 1: SETTINGS OPTIONS -->
          <div class="tab-pane active" id="pane-settings">
            <!-- Audio Toggle Card -->
            <div class="setting-card">
              <div class="setting-info">
                <span class="setting-label">Sound FX & Audio</span>
                <span class="setting-desc">Web Audio game sounds and combos</span>
              </div>
              <div class="setting-controls-group">
                <button class="test-sound-btn" id="test-sound-btn" title="Test SFX">
                  🎵 Test
                </button>
                <label class="switch-toggle">
                  <input type="checkbox" id="sound-checkbox" ${!sound.isMuted ? 'checked' : ''}>
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>

            <!-- Visual & Particle Quality Card -->
            <div class="setting-card">
              <div class="setting-info">
                <span class="setting-label">Visual FX & Particles</span>
                <span class="setting-desc">Fruit spark explosions & floating leaves</span>
              </div>
              <label class="switch-toggle">
                <input type="checkbox" id="particles-checkbox" ${particlesEnabled ? 'checked' : ''}>
                <span class="switch-slider"></span>
              </label>
            </div>

            <!-- Controls Preview Card -->
            <div class="setting-card">
              <div class="setting-info">
                <span class="setting-label">PC Keyboard Controls</span>
                <span class="setting-desc">Use WASD / Arrow Keys + Enter to select</span>
              </div>
              <span class="badge-pill">⌨️ Enabled</span>
            </div>

            <!-- Danger Zone: Reset Progress -->
            <div class="danger-card">
              <div class="danger-info">
                <span>Reset Game Progress</span>
                <p>Clears unlocked levels, high scores, and earned stars</p>
              </div>
              <button class="danger-reset-btn" id="reset-progress-btn">
                ⚠️ RESET
              </button>
            </div>
          </div>

          <!-- TAB 2: HOW TO PLAY GUIDE -->
          <div class="tab-pane" id="pane-guide">
            <div class="guide-container">
              <div class="guide-tile">
                <span class="tile-icon">🍎</span>
                <div class="tile-text">
                  <strong>1. Tap Matching Pairs</strong>
                  <p>Select any 2 identical fruits on the board to pop and clear them.</p>
                </div>
              </div>

              <div class="guide-tile">
                <span class="tile-icon">⬇️</span>
                <div class="tile-text">
                  <strong>2. Gravity Physics</strong>
                  <p>When fruits pop, items above slide down into the empty spaces.</p>
                </div>
              </div>

              <div class="guide-tile">
                <span class="tile-icon">🥤</span>
                <div class="tile-text">
                  <strong>3. Blender Column Wipe</strong>
                  <p>Tap the Blender powerup to clear an entire column when you are stuck.</p>
                </div>
              </div>

              <div class="guide-tile">
                <span class="tile-icon">👑</span>
                <div class="tile-text">
                  <strong>4. 100 Levels & Bosses</strong>
                  <p>Beat targets across 10 worlds with up to 3 stars per level!</p>
                </div>
              </div>

              <div class="guide-tile">
                <span class="tile-icon">🎯</span>
                <div class="tile-text">
                  <strong>5. Move Budget</strong>
                  <p>Clear all required fruits before your remaining moves run out!</p>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: STATS & BIOME GALLERY -->
          <div class="tab-pane" id="pane-stats">
            <div class="stats-overview-grid">
              <div class="stat-box">
                <span class="stat-icon">⭐</span>
                <span class="stat-value">${totalStars} / ${maxStars}</span>
                <span class="stat-label">Total Stars</span>
              </div>
              <div class="stat-box">
                <span class="stat-icon">🗺️</span>
                <span class="stat-value">Level ${highestLevel}</span>
                <span class="stat-label">Max Unlocked</span>
              </div>
              <div class="stat-box">
                <span class="stat-icon">🏝️</span>
                <span class="stat-value">${currentWorldId} / 10</span>
                <span class="stat-label">Worlds Discovered</span>
              </div>
            </div>

            <h4 class="biome-gallery-title">🎨 WORLD BIOMES GALLERY</h4>
            <div class="biome-gallery-list">
              ${WORLDS.map(w => {
                const isDiscovered = w.id <= currentWorldId;
                return `
                  <div class="biome-gallery-card ${isDiscovered ? 'unlocked' : 'locked'}">
                    <span class="gallery-icon">${w.particle}</span>
                    <div class="gallery-info">
                      <strong>World ${w.id}: ${w.name}</strong>
                      <span>Levels ${(w.id - 1) * 10 + 1} - ${w.id * 10}</span>
                    </div>
                    <span class="gallery-status">${isDiscovered ? '🔓 Discovered' : '🔒 Locked'}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(modalEl);

    // Tab Switcher logic
    const tabBtns = modalEl.querySelectorAll('.settings-tab-btn');
    const tabPanes = modalEl.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        sound.playClick();

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = modalEl.querySelector(`#pane-${targetTab}`);
        activePane?.classList.add('active');
      });
    });

    // Close button
    modalEl.querySelector('#close-settings-btn')?.addEventListener('click', () => {
      sound.playClick();
      modalEl.remove();
      this.onClose();
    });

    // Sound Checkbox Toggle
    const soundCheckbox = modalEl.querySelector('#sound-checkbox');
    soundCheckbox?.addEventListener('change', () => {
      sound.toggleMute();
      if (!sound.isMuted) sound.playClick();
    });

    // Test Sound FX Button
    const testSoundBtn = modalEl.querySelector('#test-sound-btn');
    testSoundBtn?.addEventListener('click', () => {
      sound.playPowerup();
    });

    // Visual FX / Particles toggle
    const particlesCheckbox = modalEl.querySelector('#particles-checkbox');
    particlesCheckbox?.addEventListener('change', () => {
      sound.playClick();
      localStorage.setItem('gravity_fruit_particles', particlesCheckbox.checked.toString());
    });

    // Reset Progress
    modalEl.querySelector('#reset-progress-btn')?.addEventListener('click', () => {
      sound.playClick();
      if (confirm("⚠️ Are you sure you want to reset all 100 levels, high scores, and earned stars?")) {
        localStorage.clear();
        modalEl.remove();
        this.onResetProgress();
      }
    });
  }
}

