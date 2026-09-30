// Winding Level Map View Component with Beautiful World Biomes

import { LEVELS, WORLDS } from './levels.js';
import { sound } from './sound.js';

export class MapView {
  constructor(containerElement, onSelectLevel, onOpenSettings) {
    this.container = containerElement;
    this.onSelectLevel = onSelectLevel;
    this.onOpenSettings = onOpenSettings;
  }

  getHighestUnlockedLevel() {
    const saved = localStorage.getItem('gravity_fruit_highest_level');
    return saved ? parseInt(saved, 10) : 5;
  }

  getLevelStars(levelId) {
    const saved = localStorage.getItem(`gravity_fruit_stars_${levelId}`);
    if (saved) return parseInt(saved, 10);
    if (levelId < this.getHighestUnlockedLevel()) return 3;
    return 0;
  }

  getTotalStars() {
    let total = 0;
    LEVELS.forEach(l => {
      total += this.getLevelStars(l.id);
    });
    return total;
  }

  render() {
    const highestLevel = this.getHighestUnlockedLevel();
    const totalStars = this.getTotalStars();
    const maxStars = LEVELS.length * 3;
    const progressPercent = Math.round((totalStars / maxStars) * 100);

    const nodeCount = LEVELS.length; // 100 levels
    const itemHeight = 100; // Increased spacing for clear breathing room
    const totalMapHeight = Math.max(1000, (nodeCount + 2) * itemHeight);
    const mapWidth = 400;

    const levelsData = LEVELS.map((level, idx) => {
      const reversedIndex = nodeCount - 1 - idx;
      const t = (reversedIndex / 4) * Math.PI;
      const leftPercent = 50 + 32 * Math.sin(t);
      const topPx = 110 + reversedIndex * itemHeight;

      return {
        level,
        leftPercent,
        topPx,
        isUnlocked: level.id <= highestLevel,
        isCurrent: level.id === highestLevel,
        stars: this.getLevelStars(level.id)
      };
    });

    // Build SVG cobblestone path
    let svgPathD = "";
    levelsData.forEach((node, i) => {
      const x = (node.leftPercent / 100) * mapWidth;
      const y = node.topPx;
      if (i === 0) {
        svgPathD += `M ${x} ${y}`;
      } else {
        const prev = levelsData[i - 1];
        const prevX = (prev.leftPercent / 100) * mapWidth;
        const prevY = prev.topPx;
        const cy1 = prevY + (y - prevY) / 2;
        const cy2 = prevY + (y - prevY) / 2;
        svgPathD += ` C ${prevX} ${cy1}, ${x} ${cy2}, ${x} ${y}`;
      }
    });

    // 10 World Zone Partitions
    const worldPartitions = WORLDS.map(world => {
      const startLevelId = (world.id - 1) * 10 + 1;
      const endLevelId = world.id * 10;
      const endNode = levelsData.find(n => n.level.id === endLevelId);
      const startNode = levelsData.find(n => n.level.id === startLevelId);

      // Section bounds
      const sectionTopPx = endNode ? endNode.topPx - 60 : 0;
      const sectionHeightPx = 10 * itemHeight;

      // Banner positioned cleanly in open space above node 10 / 20 / 30
      const bannerTopPx = sectionTopPx + 20;

      return {
        world,
        startLevelId,
        endLevelId,
        sectionTopPx,
        sectionHeightPx,
        bannerTopPx
      };
    });

    this.container.innerHTML = `
      <div class="orchard-map-screen">
        <!-- Top Navigation Header Bar -->
        <header class="orchard-map-header">
          <button class="menu-hamburger-btn" id="map-settings-btn" title="Settings">
            <span class="hamburger-icon">⚙️</span>
          </button>

          <div class="star-progress-widget">
            <div class="gold-star-badge">⭐</div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${progressPercent}%;"></div>
              <span class="progress-text">${totalStars}/${maxStars}</span>
            </div>
          </div>

          <button class="sound-icon-btn" id="map-sound-btn" title="Sound">
            ${sound.isMuted ? '🔇' : '🔊'}
          </button>
        </header>

        <!-- Scrollable Winding Map with 10 Gorgeous World Biomes -->
        <div class="map-scroll-container" id="map-scroll">
          <div class="map-content" style="height: ${totalMapHeight}px;">
            
            <!-- 10 World Zone Partition Backgrounds -->
            ${worldPartitions.map(p => `
              <div class="world-biome-partition biome-${p.world.theme}" style="top: ${p.sectionTopPx}px; height: ${p.sectionHeightPx}px;">
                <div class="biome-decor decor-left">${p.world.particle}</div>
                <div class="biome-decor decor-right">${p.world.particle}</div>
              </div>
            `).join('')}

            <!-- SVG Cobblestone Path Line -->
            <svg class="map-svg-path" viewBox="0 0 ${mapWidth} ${totalMapHeight}" preserveAspectRatio="none">
              <path d="${svgPathD}" class="cobblestone-path-border" />
              <path d="${svgPathD}" class="cobblestone-path-fill" />
              <path d="${svgPathD}" class="cobblestone-path-joints" />
            </svg>

            <!-- 10 World Header Banners (Positioned floating over path with z-index: 25) -->
            ${worldPartitions.map(p => `
              <div class="biome-header-banner-floating" style="top: ${p.bannerTopPx}px;">
                <span class="biome-title">${p.world.particle} WORLD ${p.world.id}: ${p.world.name.toUpperCase()}</span>
                <span class="biome-subtitle">LEVELS ${p.startLevelId} - ${p.endLevelId}</span>
              </div>
            `).join('')}

            <!-- 100 Level Nodes -->
            ${levelsData.map((node) => {
              const { level, leftPercent, topPx, isUnlocked, isCurrent } = node;
              
              let nodeStateClass = 'locked';
              if (isCurrent) nodeStateClass = 'current';
              else if (isUnlocked) nodeStateClass = 'unlocked';

              const isBoss = level.isBoss;

              return `
                <div class="map-node-wrapper" style="left: ${leftPercent}%; top: ${topPx}px;">
                  ${isBoss ? `<div class="boss-crown-badge">👑</div>` : (isUnlocked && !isCurrent ? `<div class="node-flag">🚩</div>` : '')}

                  <button class="orchard-node ${nodeStateClass} ${isBoss ? 'boss-node' : ''}" data-level-id="${level.id}" ${!isUnlocked ? 'disabled' : ''}>
                    ${isUnlocked ? `<span class="node-num">${level.id}</span>` : `<span class="node-lock">🔒</span>`}
                    ${isCurrent ? `<div class="active-blue-pulse"></div>` : ''}
                  </button>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Floating Jump to Current Level Button -->
          <button class="map-jump-btn" id="map-jump-btn" title="Jump to Current Level">
            🎯 LEVEL ${highestLevel}
          </button>
        </div>
      </div>
    `;

    // Auto scroll container to active current level node
    const scrollContainer = this.container.querySelector('#map-scroll');
    const scrollToActiveLevel = () => {
      const currentNodeEl = this.container.querySelector('.orchard-node.current') || this.container.querySelector('.orchard-node.unlocked');
      if (currentNodeEl && scrollContainer) {
        const wrapper = currentNodeEl.closest('.map-node-wrapper');
        if (wrapper) {
          scrollContainer.scrollTo({
            top: wrapper.offsetTop - scrollContainer.clientHeight / 2,
            behavior: 'smooth'
          });
        }
      }
    };

    setTimeout(scrollToActiveLevel, 100);

    // Jump button handler
    this.container.querySelector('#map-jump-btn')?.addEventListener('click', () => {
      sound.playClick();
      scrollToActiveLevel();
    });

    // Node click handlers
    this.container.querySelectorAll('.orchard-node.unlocked, .orchard-node.current').forEach(btn => {
      btn.addEventListener('click', () => {
        const levelId = parseInt(btn.getAttribute('data-level-id'), 10);
        sound.playClick();
        this.onSelectLevel(levelId);
      });
    });

    // Sound toggle
    const soundBtn = this.container.querySelector('#map-sound-btn');
    soundBtn?.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      soundBtn.innerHTML = isMuted ? '🔇' : '🔊';
      sound.playClick();
    });

    // Settings
    const settingsBtn = this.container.querySelector('#map-settings-btn');
    settingsBtn?.addEventListener('click', () => {
      sound.playClick();
      this.onOpenSettings();
    });
  }
}
