import Phaser from 'phaser';

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  init(data) {}

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create(data) {
    this.scene.start('PreloaderScene');
  }
}

export default Boot;
