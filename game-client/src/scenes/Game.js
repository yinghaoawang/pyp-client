import Phaser from 'phaser';
import { getCenter } from '../helpers';
import GameState from '../model/gameState';
import GameEngine from '../model/GameEngine';
import GameEventQueue from '../model/GameEventQueue';
import GameUI from '../model/GameUI';
import eventQueueTestData from '../data/sample/eventQueue';
import testPacketSender from '../data/sample/testPacketSender';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    
  }

  init(data) {
    this.isTesting = data?.isTesting;
    if (this.isTesting) {
      testPacketSender.setGame(this);
    }

    this.gameState = new GameState();
    this.gameEngine = new GameEngine(this.gameState, {
      isTesting: this.isTesting
    });
    this.gameUI = new GameUI(this, this.gameState, this.gameEngine);
    this.gameEventQueue = new GameEventQueue(
      this.gameState,
      this.gameEngine,
      this.gameUI
    );
    this.isRunning = false;
  }

  preload() {}

  create(data) {
    this.loadingText = this.add
      .text(getCenter(this).x, getCenter(this).y, '')
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setVisible(false);

    this.loadingSet = new Set(['initGame']);

    setTimeout(() => {
      this.loadingSet.delete('initGame');
      this.isRunning = true;

      this.runTestEvents(eventQueueTestData);
    }, 500);
  }

  runTestEvents(testData) {
    for (const packet of testData) {
      this.processPacket(packet);
    }
  }

  processPacket(packet) {
    switch (packet.eventName) {
      case 'initPlayer':
        const { currentPlayerIndex } = packet.payload;
        this.gameEngine.initializePlayers({ currentPlayerIndex });
        this.gameUI.init();
        break;
      default:
        this.gameEventQueue.enqueueEvent(packet.eventName, packet.payload);
    }
  }

  update(time, delta) {
    if (this.loadingSet.has('initGame')) {
      this.loadingText.setVisible(true).setText('Initializing Game');
    } else {
      this.loadingText.setVisible(false);
    }

    if (this.isRunning) {
      this.gameEventQueue.update(this);
    }
  }

  updateView() {
    this.gameUI.update();
  }
}

export default Game;
