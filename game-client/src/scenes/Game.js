import Phaser from 'phaser';
import { getCenter } from '../helpers';
import GameState from '../model/gameState';
import CardEngine from '../model/cardEngine';
import GameEventQueue from '../model/GameEventQueue';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.gameState = new GameState();
    this.cardEngine = new CardEngine(this.gameState);
    this.gameEventQueue = new GameEventQueue(this.gameState, this.cardEngine);
    this.isRunning = false;

    this.initView();
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
      
      this.gameEventQueue.handleEvent('drawCards', {
        turn: 0,
        playerIndex: 0,
        cards: [{}, {}, {}, {}, {}]
      });
      this.gameEventQueue.handleEvent('drawCards', {
        turn: 0,
        playerIndex: 1,
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
    }, 2000);
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

  initView() {
    this.otherPlayerHandSizer = this.rexUI.add
      .fixWidthSizer({
        x: getCenter(this).x,
        y: 50,
        width: 600,
        height: 100,
        space: {
          left: 3,
          right: 3,
          top: 3,
          bottom: 3,
          item: 8
        },
        align: 'center'
      })
      .layout()
      .drawBounds(this.add.graphics(), 0xff0000);
    // this.otherPlayerDeckSizer = ;
    this.currentPlayerHandSizer = this.rexUI.add
      .fixWidthSizer({
        x: getCenter(this).x,
        y: 550,
        width: 600,
        height: 100,
        space: {
          left: 3,
          right: 3,
          top: 3,
          bottom: 3,
          item: 8
        },
        align: 'center'
      })
      .layout()
      .drawBounds(this.add.graphics(), 0xff0000);
    // this.currentPlayerDeckSizer = ;
  }

  updateView() {
    const currentPlayer = this.gameState.getCurrentPlayer();
    const otherPlayer = this.gameState.getOtherPlayer();

    let sizer = this.otherPlayerHandSizer;
    sizer.removeAll(true);
    for (const card of otherPlayer.getHand()) {
      sizer.add(
        this.rexUI.add.label({
          width: 75,
          height: 100,
          background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, COLOR_DARK)
        })
      );
      sizer.layout();
    }

    sizer = this.currentPlayerHandSizer;
    sizer.removeAll(true);
    for (const card of currentPlayer.getHand()) {
      const cardSizer = this.rexUI.add
        .fixWidthSizer({
          width: 75,
          height: 100,
          space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8
          },
          align: 'left'
        })
        .addBackground(
          this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, COLOR_LIGHT)
        )

        .add(
          this.rexUI.add.label({
            width: 75,
            text: this.rexUI.wrapExpandText(
              this.add.text(0, 0, `${card.name}`, {
                fontSize: 18
              })
            ),
            expandTextWidth: true,
            align: 'left'
          })
        );
      sizer.add(cardSizer);
      sizer.layout();
    }
  }
}

export default Game;
