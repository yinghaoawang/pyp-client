import Phaser from 'phaser';
import { createButton } from '../helpers/ui';
import { getCenter } from '../helpers';

class Test extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  preload() {}

  create(data) {
    createButton(this, 'Normal Start', {
      x: getCenter(this).x,
      y: getCenter(this).y
    }).on('pointerdown', () => {
      this.scene.start('PreloaderScene');
    });
  }
}

export default Test;
