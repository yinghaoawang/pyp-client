import Phaser from 'phaser';

class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  init(data) {}

  preload() {
    this.add.image(400, 300, 'logo');

    this.load.setPath('assets');
    // this.load.spritesheet('hero-run-sheet', 'hero/run.png', {
    //   frameWidth: 32,
    //   frameHeight: 64
    // });
  }

  create(data) {
    // this.anims.create({
    //   key: 'hero-running',
    //   frames: this.anims.generateFrameNumbers('hero-run-sheet'),
    //   frameRate: 10,
    //   repeat: -1
    // });

    const startButton = this.add.text(400, 450, 'START', {
      font: '40px Arial',
      fill: '#000000'
    });
    startButton.setInteractive({ cursor: 'pointer' });
    startButton.setOriginFromFrame();
    startButton.on('pointerdown', () => this.scene.start('MenuScene'));
  }
}

export default Preloader;
