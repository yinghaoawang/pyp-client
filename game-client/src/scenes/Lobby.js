import Phaser from 'phaser';

class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyScene' });
  }

  init(data) {}

  preload() {
  }

  create(data) {
    this.add
    .text(5, 5, 'Back')
    .setInteractive({ cursor: 'pointer' })
    .on('pointerdown', () => {
      this.scene.start('LobbyDirectory');
    });
  }
}

export default Lobby;
