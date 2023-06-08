import Phaser from 'phaser';
import gameState from '../model/gameState';
import levels from '../data/levels';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyScene' });
  }

  init(data) {}

  preload() {}

  create(data) {
    const scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 400,
        y: 265,
        width: 450,
        height: 500,

        scrollMode: 0,

        background: this.rexUI.add.roundRectangle(
          0,
          0,
          2,
          2,
          10,
          COLOR_PRIMARY
        ),

        panel: {
          child: this.rexUI.add.fixWidthSizer({
            space: {
              left: 3,
              right: 3,
              top: 3,
              bottom: 3,
              item: 8,
              line: 8
            }
          }),

          mask: {
            padding: 1
          }
        },

        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.rexUI.add
            .roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT)
            .setInteractive({ cursor: 'pointer' })
        },

        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,

          panel: 10
        }
      })
      .layout();

    updatePanel(scrollablePanel, lobbies);

    this.add.text(0, 580, 'Join or create a lobby');
    this.add
      .text(0, 0, 'Back')
      .setInteractive({ cursor: 'pointer' })

      .on('pointerdown', () => {
        this.scene.start('BootScene');
      });

    this.rexUI.add
      .buttons({ x: 400, y: 550 })
      .add(createButton(this, 'Create Lobby'))
      .layout()
      .setInteractive({ cursor: 'pointer' });
  }

  update(time, delta) {}
}

const updatePanel = function (panel, lobbies) {
  const sizer = panel.getElement('panel');
  const scene = panel.scene;

  sizer.clear(true);
  for (const lobby of lobbies) {
    const lobbyText = `${lobby.name}\nHost: ${lobby.host}\n${lobby.users.length} users`;

    sizer.add(
      scene.add
        .text(0, 0, lobbyText, {
          fontSize: 18
        })
        .setTint(Phaser.Math.Between(0, 0x999999))
        .setInteractive({ cursor: 'pointer' })
    );
    sizer.addNewLine();
  }

  panel.layout();
  return panel;
};

const lobbies = [
  {
    name: 'jkKJSKLjkl234lkjzJK',
    host: 'Jojo',
    users: [1, 2, 3, 4, 5]
  },
  {
    name: 'doko',
    host: 'coco',
    users: [8, 42]
  }
];

const createButton = function (scene, text) {
  return scene.rexUI.add.label({
    width: 100,
    height: 40,
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
    text: scene.add.text(0, 0, text, {
      fontSize: 18
    }),
    space: {
      left: 10,
      right: 10
    }
  });
};

export default Lobby;
