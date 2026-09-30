// Main Application Entry & Navigation Router

import { MapView } from './mapView.js';
import { GameView } from './gameView.js';
import { SettingsModal } from './settingsModal.js';
import { sound } from './sound.js';

class App {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.currentScreen = 'MAP'; // 'MAP' | 'GAME'
    this.currentLevelId = 1;

    this.mapView = null;
    this.gameView = null;
  }

  init() {
    // Initialize sound on first user interaction anywhere in document
    const initSoundOnUserGesture = () => {
      sound.init();
      window.removeEventListener('click', initSoundOnUserGesture);
      window.removeEventListener('touchstart', initSoundOnUserGesture);
    };
    window.addEventListener('click', initSoundOnUserGesture);
    window.addEventListener('touchstart', initSoundOnUserGesture);

    this.showMapScreen();
  }

  showMapScreen() {
    if (this.gameView) {
      this.gameView.destroy();
      this.gameView = null;
    }
    this.currentScreen = 'MAP';
    this.appContainer.innerHTML = '';
    
    this.mapView = new MapView(
      this.appContainer,
      (levelId) => this.startGameScreen(levelId),
      () => this.openSettings()
    );
    this.mapView.render();
  }

  startGameScreen(levelId) {
    if (this.gameView) {
      this.gameView.destroy();
      this.gameView = null;
    }
    this.currentScreen = 'GAME';
    this.currentLevelId = levelId;
    this.appContainer.innerHTML = '';

    this.gameView = new GameView(
      this.appContainer,
      levelId,
      () => this.showMapScreen(),
      (nextLevelId) => this.startGameScreen(nextLevelId)
    );
    this.gameView.init();
  }

  openSettings() {
    const settings = new SettingsModal(
      () => {},
      () => this.showMapScreen()
    );
    settings.render(this.appContainer);
  }
}

// Start App when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
