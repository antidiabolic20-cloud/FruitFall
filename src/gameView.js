// Game Board View & Interactive Gameplay Controller with Polish & Level Start Banner

import { FRUIT_TYPES, createInitialBoard, checkMatch, applyMatchAndGravity, applyBlenderColumnCascade, findPossibleMatch, isBoardCleared, countRemainingFruits, shuffleBoard } from './gameLogic.js';
import { getLevelConfig, LEVELS } from './levels.js';
import { sound } from './sound.js';
import { getFruitSVG } from './fruitIcons.js';

export class GameView {
  constructor(containerElement, levelId, onBackToMap, onNextLevel) {
    this.container = containerElement;
    this.levelConfig = getLevelConfig(levelId);
    this.onBackToMap = onBackToMap;
    this.onNextLevel = onNextLevel;

    // Game state
    this.board = [];
    this.selectedCell = null;
    this.mismatchedCells = null;
    this.cursorPos = { row: 0, col: 0 };
    this.movesLeft = this.levelConfig.maxMoves;
    this.score = 0;
    this.combo = 1;
    this.isAnimating = false;
    this.hintPair = null;

    // Powerups
    this.blendersLeft = 1;
    this.isBlenderMode = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  init() {
    this.board = createInitialBoard(this.levelConfig.rows, this.levelConfig.cols, this.levelConfig.fruitTypes);
    this.render();
    this.initCanvasParticleEngine();
    this.showLevelStartSplash();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  showLevelStartSplash() {
    sound.playPowerup();
    const splashEl = document.createElement('div');
    splashEl.className = 'level-start-splash';
    splashEl.innerHTML = `
      <div class="splash-card">
        <span class="splash-level">LEVEL ${this.levelConfig.id}</span>
        <h2 class="splash-world">${this.levelConfig.worldName}</h2>
        <span class="splash-target">Clear All Fruit Pairs!</span>
      </div>
    `;
    this.container.appendChild(splashEl);
    setTimeout(() => splashEl.classList.add('fade-out'), 1000);
    setTimeout(() => splashEl.remove(), 1400);
  }

  render() {
    const { id, name, worldName, worldTheme, worldParticle, rows, cols } = this.levelConfig;

    this.container.innerHTML = `
      <div class="orchard-game-screen world-theme-${worldTheme}">
        <!-- Ambient Particles -->
        <div class="world-particles">
          <div class="ambient-p p1">${worldParticle}</div>
          <div class="ambient-p p2">${worldParticle}</div>
          <div class="ambient-p p3">${worldParticle}</div>
        </div>

        <!-- Top Navigation Bar -->
        <header class="orchard-game-header">
          <button class="menu-btn" id="game-menu-btn" title="Back to Level Map">
            <span class="btn-icon">⬅️</span>
            <span class="btn-text">MAP</span>
          </button>

          <!-- HUD Dashboard -->
          <div class="hud-dashboard">
            <div class="hud-col">
              <span class="hud-title">SCORE</span>
              <span class="hud-value" id="score-val">${this.score}</span>
            </div>
            <div class="hud-col moves-col ${this.movesLeft <= 3 ? 'low-moves' : ''}">
              <span class="hud-title">MOVES</span>
              <span class="hud-value ${this.movesLeft <= 3 ? 'danger-red' : ''}" id="moves-val">${this.movesLeft}</span>
            </div>
            <div class="hud-col">
              <span class="hud-title">WORLD ${this.levelConfig.worldId}</span>
              <span class="hud-value target-val">${worldName}</span>
            </div>
          </div>

          <button class="sound-btn" id="game-sound-btn" title="Toggle Sound">
            ${sound.isMuted ? '🔇' : '🔊'}
          </button>
        </header>

        <!-- Power-ups Bar -->
        <div class="powerup-top-bar">
          <button class="blender-powerup-btn ${this.isBlenderMode ? 'active' : ''}" id="blender-btn" ${this.blendersLeft <= 0 ? 'disabled' : ''}>
            🥤 BLENDER CASCADE (${this.blendersLeft})
          </button>
        </div>

        <!-- Main Wood Board Container -->
        <div class="board-wrapper">
          <canvas id="particle-canvas" class="particle-canvas"></canvas>
          <div class="wood-game-board board-theme-${worldTheme}" id="board-grid" 
               style="grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);">
            ${this.renderGridCells()}
          </div>
        </div>

        <!-- Message Banner -->
        <div class="message-banner" id="msg-banner">
          Tap 2 matching fruits to pop them!
        </div>

        <!-- Modal Overlay Placeholder -->
        <div id="modal-container" class="modal-container hidden"></div>
      </div>
    `;

    this.attachEventListeners();
  }

  renderGridCells() {
    let html = '';
    const { rows, cols } = this.levelConfig;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const fruitId = this.board[r][c];
        const isSelected = this.selectedCell && this.selectedCell.row === r && this.selectedCell.col === c;
        const isCursor = this.cursorPos.row === r && this.cursorPos.col === c;
        const isMismatch = this.mismatchedCells && this.mismatchedCells.some(cell => cell.row === r && cell.col === c);
        const isHint = this.hintPair && this.hintPair.some(p => p[0] === r && p[1] === c);

        if (fruitId === 0) {
          html += `<div class="grid-cell empty-cell" data-row="${r}" data-col="${c}"></div>`;
        } else {
          const cellClasses = [
            'grid-cell',
            'fruit-cell',
            isSelected ? 'cyan-match-glow' : '',
            isCursor ? 'keyboard-cursor' : '',
            isMismatch ? 'mismatch-shake' : '',
            isHint ? 'hint-glow' : ''
          ].filter(Boolean).join(' ');

          html += `
            <div class="${cellClasses}" data-row="${r}" data-col="${c}">
              ${getFruitSVG(fruitId)}
              ${isSelected ? `<div class="cyan-aura-beam"></div>` : ''}
              ${isMismatch ? `<div class="red-x-overlay">✖</div>` : ''}
            </div>
          `;
        }
      }
    }
    return html;
  }

  attachEventListeners() {
    const gridEl = this.container.querySelector('#board-grid');
    if (gridEl) {
      gridEl.addEventListener('click', (e) => {
        if (this.isAnimating) return;
        const cellEl = e.target.closest('.grid-cell');
        if (!cellEl) return;

        const row = parseInt(cellEl.getAttribute('data-row'), 10);
        const col = parseInt(cellEl.getAttribute('data-col'), 10);

        this.cursorPos = { row, col };

        if (this.isBlenderMode) {
          this.useBlenderOnColumn(col);
          return;
        }

        if (this.board[row][col] !== 0) {
          this.handleCellClick(row, col);
        }
      });
    }

    this.container.querySelector('#game-menu-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.destroy();
      this.onBackToMap();
    });

    const soundBtn = this.container.querySelector('#game-sound-btn');
    soundBtn?.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      soundBtn.innerHTML = isMuted ? '🔇' : '🔊';
      sound.playClick();
    });

    this.container.querySelector('#blender-btn')?.addEventListener('click', () => {
      if (this.blendersLeft <= 0) return;
      this.isBlenderMode = !this.isBlenderMode;
      sound.playClick();
      this.showMessage(this.isBlenderMode ? "Click any column to blend!" : "Blender cancelled.");
      this.render();
    });
  }

  handleKeyDown(e) {
    if (this.isAnimating) return;
    const { rows, cols } = this.levelConfig;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.cursorPos.row = (this.cursorPos.row - 1 + rows) % rows;
        this.updateBoardUI();
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        this.cursorPos.row = (this.cursorPos.row + 1) % rows;
        this.updateBoardUI();
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.cursorPos.col = (this.cursorPos.col - 1 + cols) % cols;
        this.updateBoardUI();
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.cursorPos.col = (this.cursorPos.col + 1) % cols;
        this.updateBoardUI();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        const { row, col } = this.cursorPos;
        if (this.isBlenderMode) {
          this.useBlenderOnColumn(col);
        } else if (this.board[row][col] !== 0) {
          this.handleCellClick(row, col);
        }
        break;
      case 'Escape':
        this.destroy();
        this.onBackToMap();
        break;
    }
  }

  handleCellClick(row, col) {
    this.hintPair = null;

    if (!this.selectedCell) {
      this.selectedCell = { row, col };
      sound.playSelect();
      this.updateBoardUI();
      return;
    }

    if (this.selectedCell.row === row && this.selectedCell.col === col) {
      this.selectedCell = null;
      sound.playSelect();
      this.updateBoardUI();
      return;
    }

    const { row: r1, col: c1 } = this.selectedCell;
    const r2 = row;
    const c2 = col;

    if (checkMatch(this.board, r1, c1, r2, c2)) {
      this.processMatch(r1, c1, r2, c2);
    } else {
      sound.playMismatch();
      this.mismatchedCells = [{ row: r1, col: c1 }, { row: r2, col: c2 }];
      this.selectedCell = null;
      this.movesLeft = Math.max(0, this.movesLeft - 1);
      this.updateBoardUI();

      setTimeout(() => {
        this.mismatchedCells = null;
        this.updateBoardUI();
      }, 500);
    }
  }

  async processMatch(r1, c1, r2, c2) {
    this.isAnimating = true;
    this.selectedCell = null;
    this.movesLeft -= 1;

    const cell1 = this.container.querySelector(`[data-row="${r1}"][data-col="${c1}"]`);
    const cell2 = this.container.querySelector(`[data-row="${r2}"][data-col="${c2}"]`);

    if (cell1) cell1.classList.add('pop-anim');
    if (cell2) cell2.classList.add('pop-anim');

    if (cell1) this.spawnParticleBurst(cell1);
    if (cell2) this.spawnParticleBurst(cell2);

    sound.playMatch(this.combo);
    const addedPoints = 100 * this.combo;
    this.score += addedPoints;
    this.combo++;

    this.showFloatingText(cell1, `+${addedPoints} PTS`);

    await new Promise(res => setTimeout(res, 220));

    const { newBoard, columnMoves } = applyMatchAndGravity(this.board, r1, c1, r2, c2);
    this.board = newBoard;

    sound.playGravity();
    this.updateBoardUI();
    this.animateGravityFalls(columnMoves);

    await new Promise(res => setTimeout(res, 350));
    this.isAnimating = false;

    this.checkGameStatus();
  }

  async useBlenderOnColumn(targetCol) {
    if (this.blendersLeft <= 0 || this.isAnimating) return;
    this.isBlenderMode = false;
    this.blendersLeft -= 1;
    this.isAnimating = true;

    sound.playPowerup();
    this.showMessage(`Blender cascading column ${targetCol + 1}! 🥤`);

    const colCells = this.container.querySelectorAll(`[data-col="${targetCol}"]`);
    colCells.forEach(cell => cell.classList.add('blender-column-glow'));

    await new Promise(res => setTimeout(res, 350));

    const { newBoard, columnMoves } = applyBlenderColumnCascade(this.board, targetCol);
    this.board = newBoard;

    this.updateBoardUI();
    this.animateGravityFalls(columnMoves);

    await new Promise(res => setTimeout(res, 350));
    this.isAnimating = false;
    this.checkGameStatus();
  }

  animateGravityFalls(columnMoves) {
    columnMoves.forEach(move => {
      if (move.distance > 0) {
        const cellEl = this.container.querySelector(`[data-row="${move.toRow}"][data-col="${move.col}"]`);
        if (cellEl) {
          const cellHeight = cellEl.clientHeight || 50;
          const offsetY = -move.distance * cellHeight;
          cellEl.style.transform = `translateY(${offsetY}px)`;
          cellEl.style.transition = 'none';

          cellEl.offsetHeight;

          cellEl.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
          cellEl.style.transform = 'translateY(0)';
        }
      }
    });
  }

  checkGameStatus() {
    if (isBoardCleared(this.board)) {
      this.handleWin();
      return;
    }

    const matchPair = findPossibleMatch(this.board);
    if (!matchPair && countRemainingFruits(this.board) > 0) {
      this.showMessage("No matches left! Auto-shuffling board...");
      setTimeout(() => {
        this.board = shuffleBoard(this.board);
        this.updateBoardUI();
        sound.playPowerup();
      }, 700);
    }

    if (this.movesLeft <= 0) {
      this.handleGameOver();
      return;
    }
  }

  handleWin() {
    sound.playWin();
    const stars = 3;
    const currentLevelId = this.levelConfig.id;
    const nextLevelId = currentLevelId >= LEVELS.length ? 1 : currentLevelId + 1;

    const currentHighest = parseInt(localStorage.getItem('gravity_fruit_highest_level') || '1', 10);
    if (nextLevelId > currentHighest) {
      localStorage.setItem('gravity_fruit_highest_level', nextLevelId.toString());
    }
    localStorage.setItem(`gravity_fruit_stars_${currentLevelId}`, stars.toString());

    const modalEl = this.container.querySelector('#modal-container');
    modalEl.classList.remove('hidden');
    modalEl.innerHTML = `
      <div class="orchard-victory-modal">
        <div class="golden-banner-ribbon">
          <div class="banner-text-top">LEVEL ${currentLevelId} COMPLETE!</div>
          <div class="banner-text-sub">⭐ ${stars} STARS EARNED! ⭐</div>
        </div>

        <div class="victory-stars-row">
          <span class="victory-star">⭐</span>
          <span class="victory-star">⭐</span>
          <span class="victory-star">⭐</span>
        </div>

        <div class="victory-score-box">
          <div class="score-line">
            <span>FINAL SCORE</span>
            <strong>${this.score}</strong>
          </div>
        </div>

        <div class="modal-action-row">
          <button class="orchard-btn map-nav-btn" id="win-map-btn">
            🗺️ MAP
          </button>
          <button class="orchard-btn next-nav-btn" id="win-next-btn">
            NEXT LEVEL ➡️
          </button>
        </div>
      </div>
    `;

    this.container.querySelector('#win-map-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.destroy();
      this.onBackToMap();
    });

    this.container.querySelector('#win-next-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.destroy();
      this.onNextLevel(nextLevelId);
    });
  }

  handleGameOver() {
    sound.playMismatch();
    const modalEl = this.container.querySelector('#modal-container');
    modalEl.classList.remove('hidden');
    modalEl.innerHTML = `
      <div class="modal-card lose-modal">
        <h2 class="modal-title">OUT OF MOVES! 💔</h2>
        <p class="modal-subtitle">Try again to clear all fruits!</p>
        <div class="modal-buttons">
          <button class="modal-btn secondary-btn" id="lose-map-btn">Map</button>
          <button class="modal-btn primary-btn" id="lose-retry-btn">Retry 🔄</button>
        </div>
      </div>
    `;

    this.container.querySelector('#lose-map-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.destroy();
      this.onBackToMap();
    });

    this.container.querySelector('#lose-retry-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.init();
    });
  }

  showMessage(msg) {
    const banner = this.container.querySelector('#msg-banner');
    if (banner) {
      banner.innerText = msg;
      banner.classList.add('highlight');
      setTimeout(() => banner.classList.remove('highlight'), 1800);
    }
  }

  showFloatingText(targetEl, text) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const floatEl = document.createElement('div');
    floatEl.className = 'floating-score-gold';
    floatEl.innerText = text;
    floatEl.style.left = `${rect.left + rect.width / 2}px`;
    floatEl.style.top = `${rect.top}px`;
    document.body.appendChild(floatEl);

    setTimeout(() => floatEl.remove(), 900);
  }

  updateBoardUI() {
    const gridEl = this.container.querySelector('#board-grid');
    if (gridEl) {
      gridEl.innerHTML = this.renderGridCells();
    }

    const scoreVal = this.container.querySelector('#score-val');
    if (scoreVal) {
      scoreVal.innerText = this.score;
      scoreVal.classList.add('pulse-num');
      setTimeout(() => scoreVal.classList.remove('pulse-num'), 300);
    }

    const movesVal = this.container.querySelector('#moves-val');
    if (movesVal) movesVal.innerText = this.movesLeft;
  }

  initCanvasParticleEngine() {
    const canvas = this.container.querySelector('#particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    this.particles = [];

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.particles = this.particles.filter(p => p.alpha > 0);

      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.alpha -= 0.03;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (this.particles.length > 0) {
        requestAnimationFrame(animateParticles);
      }
    };

    this.runParticleAnimation = animateParticles;
  }

  spawnParticleBurst(targetEl) {
    const canvas = this.container.querySelector('#particle-canvas');
    if (!canvas || !targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    const boardRect = canvas.getBoundingClientRect();

    const centerX = rect.left - boardRect.left + rect.width / 2;
    const centerY = rect.top - boardRect.top + rect.height / 2;

    const colors = ['#00e5ff', '#00f2fe', '#ffd700', '#ffffff', '#a855f7'];

    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }

    this.runParticleAnimation();
  }
}
