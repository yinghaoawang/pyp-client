import Phaser from 'phaser';
import { createContainedButton } from '../helpers/ui';
import userState from '../model/userState';

class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  preload() {
    this.add
      .image(400, 300, 'logo')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(600, 200);

    this.load.setPath('assets');
    this.load.image('globe', 'globe.png');
  }

  create(data) {
    this.isTesting = data?.isTesting;

    if (this.isTesting) {
      userState.loadTestUser();
    }

    this.add
      .text(400, 450, 'Start', {
        font: '25px'
      })
      .setInteractive({ cursor: 'pointer' })
      .setOrigin(0.5, 0.5);

    this.input.on('pointerdown', () =>
      this.scene.start('ConnectScene', { isTesting: this.isTesting })
    );
  }
}

export default Preloader;
