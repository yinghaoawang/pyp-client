import Phaser from 'phaser';
import { getCenter } from '../helpers';
import gameState from '../model/userState';
import {
  COLOR_DARK,
  COLOR_DISABLED,
  COLOR_HEADER,
  COLOR_HOST,
  COLOR_LIGHT,
  createLabel,
  createButtonLabel,
  createFwSizerWrapper
} from '../helpers/ui';
import { socket } from '../data/socket';

const onGetLobby = (scene, payload) => {
  scene.loadingSet.delete('getLobby');
  scene.lobbyData = payload.lobby;

  let sizer = createFwSizerWrapper(scene, {
    x: getCenter(scene).x,
    y: getCenter(scene).y,
    width: 500,
    height: 500,
    space: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
      item: 8,
      line: 8
    },
    align: 'left'
  }).addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK));

  scene.lobbySizer = sizer;
  updateLobby(scene, scene.lobbySizer, scene.lobbyData);
};

const onTestGetLobby = (scene) => {
  setTimeout(() => {
    scene.loadingSet.delete('getLobby');
    const currentUser = gameState.getCurrentUser();
    if (scene.lobbyData.users.find((u) => u.id === currentUser.id) == null) {
      scene.lobbyData.users.push(currentUser);
    }
    if (scene.lobbyData.users.find((u) => u.username === 'ready')) {
      scene.lobbyData.users.find((u) => u.username === 'ready').isReady = true;
    }

    let sizer = createFwSizerWrapper(scene, {
      x: getCenter(scene).x,
      y: getCenter(scene).y,
      width: 500,
      height: 500,
      space: {
        left: 3,
        right: 3,
        top: 3,
        bottom: 3,
        item: 8,
        line: 8
      },
      align: 'left'
    }).addBackground(
      scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK)
    );

    updateLobby(scene, sizer, scene.lobbyData);
    scene.lobbySizer = sizer;
  }, 500);
};

class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyScene' });
  }

  init(data) {}

  preload() {}

  create(data) {
    this.isTesting = data?.isTesting;
    this.lobbyData = data?.lobby;

    this.loadingText = this.add
      .text(getCenter(this).x, getCenter(this).y, '')
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setVisible(false);

    this.loadingSet = new Set(['getLobby']);
    this.add
      .text(5, 5, 'Back')
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.scene.start('LobbyDirectory');
      });

    if (this.isTesting) {
      onTestGetLobby(this);
    } else {
      socket.on('getUsersLobby', (payload) => onGetLobby(this, payload));
      socket.emit('getUsersLobby');
    }
  }

  update(time, delta) {
    if (this.loadingSet.has('getLobby')) {
      this.loadingText.setVisible(true).setText('Loading Lobby');
    } else {
      this.loadingText.setVisible(false);
    }
  }
}

const updateLobby = function (scene, sizer, lobbyData) {
  sizer.removeAll(true);
  const title = createFwSizerWrapper(scene, {
    x: 400,
    y: 300,
    width: 500,
    orientation: 'y',
    space: {
      row: 5,
      left: 20,
      right: 20,
      top: 10,
      bottom: 10
    }
  })
    .add(
      createLabel(scene, 'Lobby: ' + lobbyData.name, {
        align: 'left',
        expand: false
      })
    )
    .addNewLine()
    .add(
      createLabel(scene, 'Host: ' + lobbyData.host.username, {
        align: 'left',
        expand: false
      })
    );

  sizer.add(title);

  const checkAllUsersReady = () =>
    lobbyData.users.reduce((acc, user, idx) => {
      if (acc === false) return false;
      const isHost = lobbyData.host.username === user.username;
      if (isHost) return true;
      if (user.isReady) return true;
      return false;
    }, true);

  for (const user of lobbyData.users) {
    const isCurrentUser = gameState.getCurrentUser().username === user.username;
    const isHost = lobbyData.host.username === user.username;

    const userItem = scene.rexUI.add
      .gridSizer({
        x: 400,
        y: 300,
        col: 2,
        row: 1,
        columnProportions: [0, 1],
        width: 500,
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          row: 15
        }
      })
      .addBackground(
        scene.rexUI.add.roundRectangle(
          0,
          0,
          10,
          10,
          0,
          isCurrentUser ? COLOR_HOST : COLOR_LIGHT
        )
      )
      .add(
        createLabel(scene, `${isHost ? 'Host: ' : ''}${user.username}`, {
          align: 'left'
        }),
        { expand: true }
      )
      .add(
        createLabel(
          scene,
          !isHost ? (user.isReady ? 'Ready' : 'Not Ready') : '',
          {
            align: 'right'
          }
        ),
        { expand: true }
      );
    if (isCurrentUser) {
      const userButtonLabel = createUserButtonLabel();
      userItem.add(
        createFwSizerWrapper(scene, {
          x: 400,
          y: 300,
          space: {
            top: 10
          }
        }).add(userButtonLabel)
      );
    }
    sizer.add(userItem);
  }

  function createUserButtonLabel() {
    const user = lobbyData.users.find(
      (u) => u.id === gameState.getCurrentUser().id
    );
    if (user == null) {
      throw new Error('Current user not found in lobby');
    }
    const isHost = lobbyData.host.username === user.username;

    const userButton = createButtonLabel(
      scene,
      isHost ? 'Start Game' : !user.isReady ? 'Get Ready' : 'Cancel',
      {
        space: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        }
      },
      null,
      isHost
        ? checkAllUsersReady()
          ? COLOR_LIGHT
          : COLOR_DISABLED
        : COLOR_LIGHT
    );

    if (isHost && !checkAllUsersReady()) return userButton;

    userButton.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      if (!isHost) {
        user.isReady = !user.isReady;
        updateLobby(scene, sizer, lobbyData);
      } else {
        if (checkAllUsersReady()) {
          scene.scene.start('GameScene');
        } else {
          console.error('All users are not ready');
        }
      }
    });

    return userButton;
  }

  sizer.layout();
};

export default Lobby;
