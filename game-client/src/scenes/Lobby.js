import Phaser from 'phaser';
import { getCenter } from '../helpers';
import gameState from '../model/gameState';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const COLOR_HEADER = 0x482f26;
const COLOR_HOST = 0x8b2f26;
const COLOR_DISABLED = 0x444444;

class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyScene' });
  }

  init(data) {}

  preload() {}

  create(data) {
    this.data = data;

    this.loadingText = this.add
      .text(getCenter(this).x, getCenter(this).y, 'Joining Lobby')
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

    let sizer;

    setTimeout(() => {
      this.loadingSet.delete('getLobby');
      const currentUser = gameState.getCurrentUser();
      if (this.data.users.find((u) => u.id === currentUser.id) == null) {
        this.data.users.push(currentUser);
      }
      if (this.data.users.find((u) => u.username === 'ready')) {
        this.data.users.find((u) => u.username === 'ready').isReady = true;
      }

      sizer = this.rexUI.add
      .fixWidthSizer({
        x: getCenter(this).x,
        y: getCenter(this).y,
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
      })
      .addBackground(
        this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK)
      );

      updateLobby(this, sizer, data);
    }, 1000);
  } 

  update(time, delta) {
    if (this.loadingSet.has('getLobby')) {
      this.loadingText.setVisible(true).setText('Loading Lobby');
    } else {
      this.loadingText.setVisible(false);
    }
  }
}

const updateLobby = function (game, sizer, data) {
  sizer.removeAll(true);
  const scene = game;

  const title = game.rexUI.add
    .sizer({
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
    .addBackground(game.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_HEADER))
    .add(
      game.rexUI.add.label({
        text: scene.add.text(0, 0, 'Lobby: ' + data.name),
        align: 'left',
        expand: false
      })
    )
    .add(
      game.rexUI.add.label({
        text: scene.add.text(0, 0, 'Host: ' + data.host.username),
        align: 'left',
        expand: false
      })
    );

  sizer.add(title);

  const allUsersReady = () =>
    data.users.reduce((acc, user, idx) => {
      if (acc === false) return false;
      const isHost = data.host.username === user.username;
      if (isHost) return true;
      if (user.isReady) return true;
      return false;
    }, true);

  for (const user of data.users) {
    const isCurrentUser = gameState.getCurrentUser().username === user.username;
    const isHost = data.host.username === user.username;

    const userItem = game.rexUI.add
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
        game.rexUI.add.roundRectangle(
          0,
          0,
          10,
          10,
          0,
          isCurrentUser ? COLOR_HOST : COLOR_LIGHT
        )
      )
      .add(
        game.rexUI.add.label({
          text: scene.add.text(
            0,
            0,
            `${isHost ? 'Host: ' : ''}${user.username}`
          ),
          align: 'left'
        }),
        { expand: true }
      )
      .add(
        game.rexUI.add.label({
          text: scene.add.text(
            0,
            0,
            !isHost ? (user.isReady ? 'Ready' : 'Not Ready') : ''
          ),
          align: 'right'
        }),
        { expand: true }
      );
    if (isCurrentUser) {
      const userButton = createUserButton();
      userItem.add(
        game.rexUI.add
          .sizer({
            x: 400,
            y: 300,
            space: {
              top: 10
            }
          })

          .add(userButton)
      );
    }
    sizer.add(userItem);
  }

  function createUserButton() {
    const user = data.users.find(u => u.id === gameState.getCurrentUser().id);
    if (user == null) {
      throw new Error('Current user not found in lobby');
    }
    const isHost = data.host.username === user.username;

    const userButton = game.rexUI.add.label({
      background: game.rexUI.add.roundRectangle(
        0,
        0,
        0,
        0,
        10,
        isHost ? (allUsersReady() ? COLOR_LIGHT : COLOR_DISABLED) : COLOR_LIGHT
      ),
      text: scene.add.text(
        0,
        0,
        isHost ? 'Start Game' : !user.isReady ? 'Get Ready' : 'Cancel'
      ),
      space: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
      }
    });

    if (isHost && !allUsersReady()) return userButton;

    userButton.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      if (!isHost) {
        user.isReady = !user.isReady;
        updateLobby(game, sizer, data);
      } else {
        if (allUsersReady()) {
          console.log('start game');
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
