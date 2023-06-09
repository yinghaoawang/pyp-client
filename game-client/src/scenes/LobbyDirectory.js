import Phaser from 'phaser';
import gameState from '../model/gameState';
import levels from '../data/levels';
import { getCenter } from '../helpers';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

let lobbies = [];

class LobbyDirectory extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyDirectory' });
  }

  init(data) {}

  preload() {}

  create(data) {
    lobbies = [];
    this.loadingText = this.add
      .text(getCenter(this).x, getCenter(this).y, 'Joining Lobby')
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setVisible(false);

    this.isLoadingJoinLobby = false;
    this.isLoadingLobbies = true;

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

    updatePanel(this, scrollablePanel, lobbies);

    const game = this;
    setTimeout(() => {
      lobbies =   [{
        name: 'jkKJSKLjkl234lkjzJK',
        host: 'Jojo',
        users: [1, 2, 3, 4, 5]
      },
      {
        name: 'doko',
        host: 'coco',
        users: [8, 42]
      }];
      this.isLoadingLobbies = false;
      updatePanel(game, scrollablePanel, lobbies)
    }, 1000);

    this.add.text(5, 580, 'Join or create a lobby');
    this.add
      .text(5, 5, 'Back')
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

  update(time, delta) {
    if (this.isLoadingLobbies) {
      this.loadingText.setVisible(true).setText('Loading Lobbies');
    } else if (this.isLoadingJoinLobby) {
      this.loadingText.setVisible(true).setText('Joining Lobby');
    } else {
      this.loadingText.setVisible(false);
    }
  }
}

const updatePanel = function (game, panel, lobbies) {
  const sizer = panel.getElement('panel');

  sizer.clear(true);
  for (const lobby of lobbies) {
    const lobbyText = `${lobby.name}\nHost: ${lobby.host}\n${lobby.users.length} users`;

    sizer.add(
      game.add
        .text(0, 0, lobbyText, {
          fontSize: 18
        })
        .setTint(Phaser.Math.Between(0, 0x999999))
        .setInteractive({ cursor: 'pointer' })
        .on('pointerdown', () => {
          game.isLoadingJoinLobby = true;

          setTimeout(() => {
            game.isLoadingJoinLobby = false;
            game.scene.start('LobbyScene');
          }, 1000);
        })
    );
    sizer.addNewLine();
  }

  panel.layout();
  return panel;
};

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

export default LobbyDirectory;
