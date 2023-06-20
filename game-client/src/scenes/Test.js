import Phaser from 'phaser';

class Test extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  preload() {}

  create(data) {
    this.add
      .text(400, 450, 'Start', {
        font: '25px'
      })
      .setInteractive({ cursor: 'pointer' })
      .setOrigin(0.5, 0.5);
  }
}

export default Test;
