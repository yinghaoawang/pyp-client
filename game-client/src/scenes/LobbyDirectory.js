import Phaser from 'phaser';
import userState from '../model/userState';
import lobbiesTestData from '../data/sample/lobbies';
import { getCenter } from '../helpers';
import {
  COLOR_DARK,
  COLOR_LIGHT,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  createContainedButton,
  createFwSizerWrapper
} from '../helpers/ui';

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

    const scene = this;
    setTimeout(() => {
      this.lobbies = lobbiesTestData;
      this.loadingSet.delete('getLobbies');
      updatePanel(scene, scrollablePanel, this.lobbies);
    }, 500);

    this.add.text(5, 580, 'Join or create a lobby');
    this.add
      .text(5, 5, 'Back')
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.scene.start('BootScene');
      });

    createContainedButton(this, 'Create Lobby', {
      x: 400,
      y: 550
    }).on('pointerdown', () => {
      const lobbyName = prompt(
        'Enter a lobby name (test names: "ready" and "notready"):'
      );
      if (lobbyName?.trim() == '' || lobbyName == null) {
        return;
      }

      scene.loadingSet.add('createLobby');
      const createdLobby = {
        id: 'jkkdkSLJkl23ljkSKLDJ=42',
        name: lobbyName,
        host: userState.getCurrentUser(),
        users: [userState.getCurrentUser()]
      };

      if (lobbyName == 'ready') {
        createdLobby.users.push({ id: 98, username: 'ready' });
      } else if (lobbyName == 'notready') {
        createdLobby.users.push({ id: 99, username: 'notready' });
      }

      setTimeout(() => {
        scene.loadingSet.delete('createLobby');
        scene.scene.start('LobbyScene', createdLobby);
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

const createScrollablePanel = function (scene) {
  return scene.rexUI.add
    .scrollablePanel({
      x: getCenter(scene).x,
      y: getCenter(scene).y - 35,
      width: 500,
      height: 500,
      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_SECONDARY),

      panel: {
        child: createFwSizerWrapper(scene, {
          space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            line: 15
          }
        }),

        mask: {
          padding: 1
        }
      },

      slider: {
        hideUnscrollableSlider: true,
        track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
        thumb: scene.rexUI.add
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

const updatePanel = function (scene, panel, lobbies) {
  const sizer = panel.getElement('panel');

  if (sizer == null) return null;

  sizer.clear(true);
  for (const lobby of lobbies) {
    const lobbyText = `${lobby.name}\nHost: ${lobby.host.username}\n${lobby.users.length} users`;

    sizer.add(
      createContainedButton(
        scene,
        lobbyText,
        {
          width: panel.width
        },
        { align: 'left' },
        { color: '#000022' }
      ).on('pointerdown', () => {
        scene.loadingSet.add('joinLobby');

        setTimeout(() => {
          scene.loadingSet.delete('joinLobby');
          scene.scene.start('LobbyScene', lobby); 
        }, 500);
      })
    );
    sizer.addNewLine();
  }

  panel.layout();
  return panel;
};

export default LobbyDirectory;
