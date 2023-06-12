import { getCenter, toDataURL } from '../helpers';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class GameUI {
  constructor(scene, gameState, gameEngine) {
    this.scene = scene;
    this.gameState = gameState;
    this.gameEngine = gameEngine;
  }

  displayTurnSwitch(isCurrentPlayerTurn, callback) {
    this.scene.turnTextSizer.removeAll(true);
    this.scene.turnTextSizer
      .add(
        this.createWrappedText(
          isCurrentPlayerTurn ? 'Your Turn' : 'Enemy Turn',
          { fontSize: 18, align: 'center' },
          { width: 120, height: 50 }
        )
      )
      .layout();
    this.scene.turnTextSizer.setVisible(true);

    const tween1 = this.scene.tweens.add({
      targets: this.scene.turnTextSizer,
      x: { from: -200, to: 400 },
      ease: 'Linear',
      duration: 500,
      yoyo: false,
      repeat: 0
    });

    tween1.on('complete', () => {
      setTimeout(() => {
        const tween2 = this.scene.tweens.add({
          targets: this.scene.turnTextSizer,
          x: { from: 400, to: 800 + 200 },
          ease: 'Linear',
          duration: 500,
          yoyo: false,
          repeat: 0
        });

        tween2.on('complete', callback);
      }, 750);
    });
  }

  init() {
    this.scene.turnTextSizer = this.createFwSizerWrapper({
      width: 120,
      height: 50,
      align: 'center'
    })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, COLOR_LIGHT)
      )
      .setPosition(getCenter(this.scene).x, getCenter(this.scene).y)
      .layout()
      .setVisible(false);

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
      cardSizer.add(
        this.createFwSizerWrapper({
          width: 75,
          height: 65,
          align: 'center',
          space: {
            top: 5,
            bottom: 5
          }
        }).add(this.scene.add.sprite(0, 0, card.name).setDisplaySize(65, 65))
      );
      if (this.scene.textures.get(card.name).key === '__MISSING') {
        toDataURL(card.imgUrl, (base64Data) => {
          this.scene.textures.addBase64(card.name, base64Data);
        });
      }
    }

    return cardSizer;
  }

  createFwSizerWrapper(opts) {
    const sizer = this.scene.rexUI.add.fixWidthSizer({
      ...opts
    });
    return sizer;
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
