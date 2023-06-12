import Phaser from 'phaser';
import { getCenter } from '../helpers';
import GameState from '../model/gameState';
import CardEngine from '../model/cardEngine';
import GameEventQueue from '../model/GameEventQueue';
import GameUI from '../model/GameUI';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.gameState = new GameState();
    this.cardEngine = new CardEngine(this.gameState);
    this.gameUI = new GameUI(this, this.gameState, this.cardEngine);
    this.gameEventQueue = new GameEventQueue(
      this.gameState,
      this.cardEngine,
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

      this.gameState.initializePlayers({ currentPlayerIndex: 1 });
      this.gameUI.init();

      this.gameEventQueue.handleEvent('drawCards', {
        metadata: {
          turn: 0,
          playerIndex: 0
        },
        cards: [
          { unknown: true },
          { unknown: true },
          { unknown: true },
          { unknown: true },
          { unknown: true }
        ]
      });
      this.gameEventQueue.handleEvent('drawCards', {
        metadata: {
          turn: 0,
          playerIndex: 1
        },
        cards: [
          { id: 12, name: 'Skull', attack: 5, health: 5, energyCost: 1 },
          { id: 12, name: 'Skull', attack: 5, health: 5, energyCost: 1 },
          { id: 12, name: 'Skull', attack: 5, health: 5, energyCost: 1 },
          {
            id: 4,
            name: 'Squirthill',
            attack: 1,
            health: 2,
            energyCost: 1,
            ability: {
              name: 'Soak',
              energyCost: 1,
              effects: [
                {
                  type: 'applyDebuff',
                  debuff: 'Wet',
                  target: 'enemy'
                }
              ]
            }
          },
          {
            id: 5,
            name: 'Bikachu',
            attack: 4,
            health: 4,
            energyCost: 2,
            ability: {
              name: 'Shock',
              energyCost: 1,
              effects: [
                {
                  if: {
                    condition: {
                      target: {
                        has: {
                          type: 'debuff'
                        }
                      }
                    },
                    effect: {
                      type: 'attack',
                      multiplier: 3
                    }
                  },
                  else: {
                    effect: {
                      type: 'attack',
                      multiplier: 1.5
                    }
                  }
                },
                {
                  type: 'removeDebuff',
                  debuff: 'Wet',
                  target: 'enemy'
                }
              ]
            }
          }
        ]
      });

      this.gameEventQueue.handleEvent('wait', { ms: 500 });
    }, 500);
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
