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

    this.scene.otherPlayerDeckSizer = this.createCardSizer(null, {
      unknown: true
    })
      .setPosition(50, 50)
      .layout()
      .drawBounds(this.scene.add.graphics(), 0xff0000);

    this.scene.currentPlayerDeckSizer = this.createCardSizer(null, {
      unknown: true
    })
      .setPosition(750, 550)
      .layout()
      .drawBounds(this.scene.add.graphics(), 0xff0000);
  }

  createCardSizer(card, opts) {
    if (card == null && opts?.unknown != true) throw new Error('Card is null');

    const cardSizer = this.scene.rexUI.add
      .fixWidthSizer({
        width: 75,
        height: 100,
        align: 'left'
      })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(
          0,
          0,
          0,
          0,
          5,
          opts?.unknown === true ? COLOR_DARK : COLOR_LIGHT
        )
      );

    if (opts?.unknown != true) {
      cardSizer.add(this.createWrappedText(`${card.name}`));
    }

    return cardSizer;
  }

  createWrappedText(text, textOpts, labelOpts) {
    const wrappedText = this.scene.rexUI.add.label({
      width: 75,
      text: this.scene.rexUI.wrapExpandText(
        this.scene.add.text(0, 0, text, {
          fontSize: 18,
          ...textOpts
        })
      ),
      expandTextWidth: true,
      align: 'left',
      ...labelOpts
    });

    return wrappedText;
  }

  update() {
    const currentPlayer = this.gameState.getCurrentPlayer();
    const otherPlayer = this.gameState.getOtherPlayer();

    let sizer = this.scene.otherPlayerHandSizer;
    sizer.removeAll(true);
    for (const card of otherPlayer.getHand()) {
      const cardSizer = this.createCardSizer(card, {
        unknown: card.unknown
      });
      sizer.add(cardSizer);
      sizer.layout();
    }

    sizer = this.scene.currentPlayerHandSizer;
    sizer.removeAll(true);
    for (const card of currentPlayer.getHand()) {
      const cardSizer = this.createCardSizer(card, {
        unknown: card.unknown
      });
      sizer.add(cardSizer);
      sizer.layout();
    }

    sizer = this.scene.otherPlayerDeckSizer;
    sizer.removeAll(true);
    sizer
      .add(
        this.createWrappedText(
          this.gameState.getOtherPlayer().getDeck().length,
          null,
          {
            align: 'center',
            height: 100
          }
        )
      )
      .layout();

    sizer = this.scene.currentPlayerDeckSizer;
    sizer.removeAll(true);
    sizer
      .add(
        this.createWrappedText(
          this.gameState.getCurrentPlayer().getDeck().length,
          null,
          { align: 'center', height: 100 }
        )
      )
      .layout();
  }
}
