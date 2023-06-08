import Phaser from 'phaser';

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  init(data) {}

  preload() {
    this.load.setPath('assets');
    this.load.image('logo', 'logo.jpg');
  }

  create(data) {
    this.scene.start('PreloaderScene');
  }
}

export default Boot;
