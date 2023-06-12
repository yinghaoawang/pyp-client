import Phaser from 'phaser';
import gameState from '../model/userState';
import levels from '../data/levels';
import { getCenter } from '../helpers';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class LobbyDirectory extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyDirectory' });
  }

  init(data) {}

  preload() {}

  create(data) {
    this.lobbies = [];
    this.loadingText = this.add
      .text(getCenter(this).x, getCenter(this).y, 'Joining Lobby')
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setVisible(false);

    this.loadingSet = new Set(['getLobbies']);

    const scrollablePanel = createScrollablePanel(this);

    updatePanel(this, scrollablePanel, this.lobbies);

    const game = this;
    setTimeout(() => {
      this.lobbies = [
        {
          name: 'jkKJSKLjkl234lkjzJK',
          host: { id: 3, username: 'ai94' },
          users: [
            { id: 1, username: 'Ronpob' },
            { id: 2, username: 'Jonthan' },
            { id: 3, username: 'ai94' },
            { id: 4, username: 'Someguy' }
          ]
        },
        {
          name: 'doko',
          host: { id: 8, username: 'coco' },
          users: [
            { id: 8, username: 'coco' },
            { id: 42, username: 'jojo6879' }
          ]
        }
      ];
      this.loadingSet.delete('getLobbies');
      updatePanel(game, scrollablePanel, this.lobbies);
    }, 500);

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
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        const lobbyName = prompt('Enter a lobby name (test names: "ready" and "notready"):');
        if (lobbyName?.trim() == '' || lobbyName == null) {
          return;
        }

        game.loadingSet.add('createLobby');
        const createdLobby = {
          id: 'jkkdkSLJkl23ljkSKLDJ=42',
          name: lobbyName,
          host: gameState.getCurrentUser(),
          users: [gameState.getCurrentUser()]
        };

        if (lobbyName == 'ready') {
          createdLobby.users.push({ id: 98, username: 'ready' });
        } else if (lobbyName == 'notready') {
          createdLobby.users.push({ id: 99, username: 'notready' });
        }

        setTimeout(() => {
          game.loadingSet.delete('createLobby');
          game.scene.start('LobbyScene', createdLobby);
        }, 500);
      });
  }

  update(time, delta) {
    if (this.loadingSet.has('getLobbies')) {
      this.loadingText.setVisible(true).setText('Loading Lobbies');
    } else if (this.loadingSet.has('createLobby')) {
      this.loadingText.setVisible(true).setText('Creating Lobby');
    } else if (this.loadingSet.has('joinLobby')) {
      this.loadingText.setVisible(true).setText('Joining Lobby');
    } else {
      this.loadingText.setVisible(false);
    }
  }

  isLoading() {
    return this.loadingSet.size > 0;
  }
}

const createScrollablePanel = function (game) {
  return game.rexUI.add
    .scrollablePanel({
      x: 400,
      y: 265,
      width: 500,
      height: 500,

      scrollMode: 0,

      background: game.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

      panel: {
        child: game.rexUI.add.fixWidthSizer({
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
        track: game.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
        thumb: game.rexUI.add
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
};

const updatePanel = function (game, panel, lobbies) {
  const sizer = panel.getElement('panel');

  if (sizer == null) return null;

  sizer.clear(true);
  for (const lobby of lobbies) {
    const lobbyText = `${lobby.name}\nHost: ${lobby.host.username}\n${lobby.users.length} users`;

    sizer.add(
      game.rexUI.add
        .label({
          background: game.rexUI.add.roundRectangle(
            0,
            0,
            0,
            0,
            15,
            COLOR_LIGHT
          ),
          text: game.add.text(0, 0, lobbyText, {
            fontSize: 18,
            color: '#44ff44'
          }),
          align: 'left',
          space: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
          }
        })
        .setInteractive({ cursor: 'pointer' })
        .on('pointerdown', () => {
          game.loadingSet.add('joinLobby');

          setTimeout(() => {
            game.loadingSet.delete('joinLobby');
            game.scene.start('LobbyScene', lobby);
          }, 500);
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
