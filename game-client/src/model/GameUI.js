import { getCenter, toDataURL } from '../helpers';
import {
  COLOR_DARK,
  COLOR_CARD_ZONE,
  COLOR_LIGHT,
  createFwSizerWrapper
} from '../helpers/ui';

export default class GameUI {
  constructor(scene, gameState, gameEngine) {
    this.scene = scene;
    this.gameState = gameState;
    this.gameEngine = gameEngine;
  }

  async displayTurnChange(isCurrentPlayerTurn, callback) {
    const init = () => {
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
    };

    const slideIn = () => {
      return new Promise((resolve, reject) => {
        const tween1 = this.scene.tweens.add({
          targets: this.scene.turnTextSizer,
          x: { from: -200, to: 400 },
          ease: 'Linear',
          duration: 500,
          yoyo: false,
          repeat: 0
        });

        tween1.on('complete', resolve);
      });
    };

    const slideOut = () => {
      return new Promise((resolve, reject) => {
        const tween2 = this.scene.tweens.add({
          targets: this.scene.turnTextSizer,
          x: { from: 400, to: 800 + 200 },
          ease: 'Linear',
          duration: 500,
          yoyo: false,
          repeat: 0
        });

        tween2.on('complete', resolve);
      });
    };

    init();
    await slideIn();

    const onConfirmClick = async () => {
      this.scene.input.off('pointerdown', onConfirmClick);
      await slideOut();
      callback();
    };
    this.scene.input.on('pointerdown', onConfirmClick);
  }

  init() {
    this.scene.turnTextSizer = createFwSizerWrapper(this, {
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

    this.scene.otherPlayerHandSizer = createFwSizerWrapper(this, {
      x: getCenter(this.scene).x,
      y: 70,
      width: 600,
      height: 120,
      orientation: 'x',
      space: {
        left: 3,
        right: 3,
        top: 10,
        bottom: 10,
        item: 8
      },
      align: 'center'
    })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(0, 0, 10, 10, 5, COLOR_CARD_ZONE)
      )
      .layout();

    this.scene.currentPlayerHandSizer = createFwSizerWrapper(this, {
      x: getCenter(this.scene).x,
      y: 530,
      width: 600,
      height: 120,
      space: {
        left: 3,
        right: 3,
        top: 10,
        bottom: 10,
        item: 8
      },
      align: 'center'
    })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(0, 0, 10, 10, 5, COLOR_CARD_ZONE)
      )
      .layout();

    this.scene.otherPlayerDeckSizer = this.createCardSizer(null, {
      unknown: true
    })
      .setPosition(50, 60)
      .layout();

    this.scene.currentPlayerDeckSizer = this.createCardSizer(null, {
      unknown: true
    })
      .setPosition(750, 540)
      .layout();
  }

  createCardSizer(card, opts) {
    if (card == null && opts?.unknown != true) throw new Error('Card is null');

    const cardSizer = createFwSizerWrapper(this, {
      width: 75,
      height: 100,
      align: 'left'
    }).addBackground(
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
        createFwSizerWrapper(this, {
          width: 75,
          height: 65,
          align: 'center',
          space: {
            top: 5,
            bottom: 5
          }
        }).add(this.scene.add.sprite(0, 0, card.name).setDisplaySize(65, 65))
      );
      try {
        if (this.scene.textures.get(card.name).key === '__MISSING') {
          if (!this.scene.textures.exists(card.name)) {
            toDataURL(card.imgUrl, (base64Data) => {
              this.scene.textures.addBase64(card.name, base64Data);
            });
          } else {
            console.error(
              `Could not create texture for ${card.name} because it already exists.`
            );
          }
        }
      } catch (error) {
        console.error('Could not load texture', error);
      }
      
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
