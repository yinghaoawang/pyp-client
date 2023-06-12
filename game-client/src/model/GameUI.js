import { getCenter } from '../helpers';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class GameUI {
  constructor(scene, gameState, cardEngine, gameEventQueue) {
    this.scene = scene;
    this.gameState = gameState;
    this.cardEngine = cardEngine;
    this.gameEventQueue = gameEventQueue;
  }

  init() {
    this.scene.otherPlayerHandSizer = this.scene.rexUI.add
      .fixWidthSizer({
        x: getCenter(this.scene).x,
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
      .drawBounds(this.scene.add.graphics(), 0xff0000);

    this.scene.currentPlayerHandSizer = this.scene.rexUI.add
      .fixWidthSizer({
        x: getCenter(this.scene).x,
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
      .drawBounds(this.scene.add.graphics(), 0xff0000);

    // this.otherPlayerDeckSizer = .fixWidthSizer({
    // });

    // this.currentPlayerDeckSizer = ;
  }

  createCardSizer(card) {
    if (card == null) throw new Error('Card is null');

    const cardSizer = this.scene.rexUI.add
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
        this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, COLOR_LIGHT)
      )
      .add(
        this.scene.rexUI.add.label({
          width: 75,
          text: this.scene.rexUI.wrapExpandText(
            this.scene.add.text(0, 0, `${card.name}`, {
              fontSize: 18
            })
          ),
          expandTextWidth: true,
          align: 'left'
        })
      );

    return cardSizer;
  }

  update() {
    const currentPlayer = this.gameState.getCurrentPlayer();
    const otherPlayer = this.gameState.getOtherPlayer();

    let sizer = this.scene.otherPlayerHandSizer;
    sizer.removeAll(true);
    for (const card of otherPlayer.getHand()) {
      sizer.add(
        this.scene.rexUI.add.label({
          width: 75,
          height: 100,
          background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, COLOR_DARK)
        })
      );
      sizer.layout();
    }

    sizer = this.scene.currentPlayerHandSizer;
    sizer.removeAll(true);
    for (const card of currentPlayer.getHand()) {
      const cardSizer = this.scene.gameUI.createCardSizer(card);
      sizer.add(cardSizer);
      sizer.layout();
    }
  }
}
