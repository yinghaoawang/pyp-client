import Phaser from 'phaser';

class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  preload() {
    this.add.image(400, 300, 'logo');

    this.load.setPath('assets');
    this.load.image('globe', 'globe.png');
  }

  create(data) {
    this.add
      .text(400, 450, 'Start', {
        font: '25px'
      })
      .setInteractive({ cursor: 'pointer' })
      .setOriginFromFrame()
      .on('pointerdown', () => this.scene.start('ConnectScene'));
  }
}

export default Preloader;
