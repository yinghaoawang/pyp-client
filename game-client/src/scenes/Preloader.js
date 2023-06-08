import Phaser from 'phaser';

class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  preload() {
    this.add.image(400, 300, 'logo').setOrigin(.5, .5).setDisplaySize(600, 200);

    this.load.setPath('assets');
    this.load.image('globe', 'globe.png');
  }

  create(data) {
    this.add
      .text(400, 450, 'Start', {
        font: '25px'
      })
      .setInteractive({ cursor: 'pointer' })
      .setOrigin(.5, .5);

    this.input.on('pointerdown', () => this.scene.start('ConnectScene'));
  }
}

export default Preloader;
