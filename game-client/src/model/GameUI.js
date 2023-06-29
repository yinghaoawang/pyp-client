import { getCard } from '../data/sample/cards';
import { getCenter, getSize, toDataURL } from '../helpers';
import {
  COLOR_DARK,
  COLOR_CARD_ZONE,
  COLOR_LIGHT,
  COLOR_FIELD_ZONE,
  createFwSizerWrapper,
  createGridSizerWrapper
} from '../helpers/ui';

class CardDetails extends RexPlugins.UI.FixWidthSizer {
  constructor(scene) {
    super(scene, {
      width: 600,
      height: 200,
      align: 'justify-left',
      space: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
      }
    });

    this.addBackground(
      scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK)
    )
      .anchorTop()
      .setDepth(2)
      .layout();
    scene.add.existing(this);
    console.log(this);
  }

  setCard(card) {
    this.card = card;
    this.setVisible(card != null);
    this.update();
  }

  getPadding() {
    return {
      x: this.space.left + this.space.right,
      y: this.space.bottom + this.space.top
    };
  }

  update() {
    this.removeAll(true);
    if (this.card == null) return;
    this.cardSizer = createCardSizer(this.scene, this.card).setDepth(3);
    this.descriptionBox = createDescriptionBox(this.scene, this.card, {
      width: this.minWidth - this.cardSizer.minWidth - this.getPadding().x - 10,
      height: this.minHeight - this.getPadding().y
    });
    this.add(this.cardSizer);
    this.add(this.descriptionBox);

    this.layout();
  }

  anchorTop() {
    this.setPosition(getCenter(this.scene).x, this.minHeight / 2);
    return this;
  }

  anchorBottom() {
    this.setPosition(
      getCenter(this.scene).x,
      getSize(this.scene).y - this.minHeight / 2
    );
    return this;
  }

  anchorLeft() {
    this.setPosition(this.minWidth / 2, getCenter(this.scene).y);
    return this;
  }

  anchorRight() {
    this.sizer.setPosition(
      getSize(this.scene).x - this.minWidth / 2,
      getCenter(this.scene).y
    );
    return this;
  }
}

const createWrappedText = (scene, text, textOpts, labelOpts) => {
  const wrappedText = scene.rexUI.add.label({
    width: 75,
    text: scene.rexUI.wrapExpandText(
      scene.add.text(0, 0, text, {
        fontSize: 18,
        ...textOpts
      })
    ),
    expandTextWidth: true,
    align: 'left',
    ...labelOpts
  });

  return wrappedText;
};

const createDescriptionBox = (scene, card, opts) => {
  return createFwSizerWrapper(scene, {
    space: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    },
    ...opts
  })
    .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT))
    .add(
      scene.rexUI.add.textArea({
        text: scene.add.text({ style: { fontSize: 18 } }),
        content: card.description,
        width: opts.width - 20,
        height: opts.height - 20,
        slider: {
          hideUnscrollableSlider: true,
          track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: scene.rexUI.add
            .roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT)
            .setInteractive({ cursor: 'pointer' })
        },
        mouseWheelScroller: {
          focus: false,
          speed: 0.1
        }
      })
    )
    .layout()
    .setDepth(3);
};

const createCardSizer = (scene, card, opts) => {
  const cardSizer = createFwSizerWrapper(scene, {
    width: 75,
    height: 100,
    align: 'left',
    ...opts
  }).addBackground(
    scene.rexUI.add.roundRectangle(
      0,
      0,
      0,
      0,
      5,
      card == null ? COLOR_DARK : COLOR_LIGHT
    )
  );

  if (card != null) {
    cardSizer.add(createWrappedText(scene, `${card.name}`));
    cardSizer.add(
      createFwSizerWrapper(scene, {
        width: 75,
        height: 65,
        align: 'center',
        space: {
          top: 5,
          bottom: 5
        }
      }).add(scene.add.sprite(0, 0, card.name).setDisplaySize(65, 65))
    );
    loadTexture(scene, card);
  }

  return cardSizer;
};

const loadTexture = (scene, data) => {
  return new Promise((resolve, reject) => {
    try {
      if (scene.textures.get(data.name).key === '__MISSING') {
        if (!scene.textures.exists(data.name)) {
          toDataURL(data.imgUrl, (base64Data) => {
            scene.textures.addBase64(data.name, base64Data);
            resolve();
          });
        } else {
          console.error(
            `Could not create texture for ${data.name} because it already exists.`
          );
          reject();
        }
      }
    } catch (error) {
      console.error('Could not load texture', error);
      reject();
    }
  });
};

export default class GameUI {
  constructor(scene, gameState, gameEngine) {
    this.scene = scene;
    this.gameState = gameState;
    this.gameEngine = gameEngine;
    this.isCardSelected = false;
  }

  async displayTurnChange(isCurrentPlayerTurn, callback) {
    const init = () => {
      this.scene.turnTextSizer.removeAll(true);
      this.scene.turnTextSizer
        .add(
          createWrappedText(
            this.scene,
            isCurrentPlayerTurn ? 'Your Turn' : 'Enemy Turn',
            { fontSize: 18, align: 'center' },
            { width: 120, height: 50 }
          )
        )
        .setDepth(5)
        .layout();
      this.scene.turnTextSizer.setVisible(true);
    };

    const slideIn = () => {
      return new Promise((resolve, reject) => {
        const tween1 = this.scene.tweens.add({
          targets: this.scene.turnTextSizer,
          x: { from: -200, to: getCenter(this.scene).x },
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
          x: { from: getCenter(this.scene).x, to: getSize(this.scene).x + 200 },
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
    this.scene.input.on('pointerdown', () => {
      if (this.isCardSelected) {
        // deselect card
        this.scene.cardDetails?.setCard(null);
        this.isCardSelected = false;
      }
    });

    this.scene.input.on('selectCard', (card) => {
      // timeout required to fire event after deselection event
      setTimeout(() => {
        this.scene.cardDetails.setCard(card);
        this.isCardSelected = true;
      }, 0);
    });

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

    this.scene.fieldZone = createGridSizerWrapper(this, {
      x: getCenter(this.scene).x,
      y: getCenter(this.scene).y,
      col: 1,
      row: 2,
      columnProportions: [1],
      width: 720,
      height: 280,
      orientation: 'y',
      space: {
        left: 3,
        right: 3,
        top: 10,
        bottom: 10,
        row: 15
      },
      align: 'center'
    })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(0, 0, 10, 10, 5, COLOR_FIELD_ZONE)
      )
      .layout();

    this.scene.otherPlayerFieldZone = createFwSizerWrapper(this, {
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
        this.scene.rexUI.add.roundRectangle(0, 0, 10, 10, 5, 0x9999ff)
      )
      .layout();

    this.scene.playerFieldZone = createFwSizerWrapper(this, {
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
        this.scene.rexUI.add.roundRectangle(0, 0, 10, 10, 5, 0x9999ff)
      )
      .layout();

    this.scene.fieldZone
      .add(this.scene.otherPlayerFieldZone, { align: 'center' })
      .add(this.scene.playerFieldZone, { align: 'center' })
      .layout();

    this.scene.otherPlayerHandZone = createFwSizerWrapper(this, {
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

    this.scene.currentPlayerHandZone = createFwSizerWrapper(this, {
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

    this.scene.otherPlayerDeck = createCardSizer(this.scene, null)
      .setPosition(50, 60)
      .layout();

    this.scene.currentPlayerDeck = createCardSizer(this.scene, null)
      .setPosition(750, 540)
      .layout();

    this.scene.cardDetails = new CardDetails(this.scene);
    this.scene.cardDetails.layout().setVisible(false);
  }

  update() {
    const currentPlayer = this.gameState.getCurrentPlayer();
    const otherPlayer = this.gameState.getOtherPlayer();

    let sizer = this.scene.otherPlayerHandZone;
    sizer.removeAll(true);
    for (const card of otherPlayer.getHand()) {
      const cardSizer = createCardSizer(this.scene, card);
      sizer.add(cardSizer);
      sizer.layout();
    }

    sizer = this.scene.currentPlayerHandZone;
    sizer.removeAll(true);
    for (const card of currentPlayer.getHand()) {
      const cardSizer = createCardSizer(this.scene, card)
        .setInteractive({ cursor: 'pointer', draggable: true })
        .on('pointerdown', () => {
          this.scene.input.emit('selectCard', card);
        })
        .on('dragstart', function () {
          cardSizer.setData({ startX: cardSizer.x, startY: cardSizer.y });
        })
        .on('drag', function (pointer, dragX, dragY) {
          cardSizer.setPosition(dragX, dragY);
        })
        .on('dragend', function () {
          cardSizer.moveTo({
            x: cardSizer.getData('startX'),
            y: cardSizer.getData('startY'),
            speed: 2000
          });
        });
      sizer.add(cardSizer);
      sizer.layout();
    }

    sizer = this.scene.otherPlayerDeck;
    sizer.removeAll(true);
    sizer
      .add(
        createWrappedText(
          this.scene,
          this.gameState.getOtherPlayer().getDeck().length,
          null,
          {
            align: 'center',
            height: 100
          }
        )
      )
      .layout();

    sizer = this.scene.currentPlayerDeck;
    sizer.removeAll(true);
    sizer
      .add(
        createWrappedText(
          this.scene,
          this.gameState.getCurrentPlayer().getDeck().length,
          null,
          { align: 'center', height: 100 }
        )
      )
      .layout();
  }
}
