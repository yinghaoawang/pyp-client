import Phaser from 'phaser';
import {
  COLOR_LIGHT,
  createButtonLabel,
  createContainedButton
} from '../helpers/ui';
import { getCenter } from '../helpers';

class Test extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  preload() {}

  create(data) {
    var buttons = this.rexUI.add
      .buttons({
        x: getCenter(this).x,
        y: getCenter(this).y,
        width: 350,
        orientation: 'y',
        space: { item: 8 },
        buttons: [
          createButtonLabel(this, 'Normal Start').on('pointerdown', () => {
            this.scene.start('PreloaderScene');
          }),
          createButtonLabel(this, 'Test Start').on('pointerdown', () => {
            this.scene.start('PreloaderScene', { isTesting: true });
          }),
          createButtonLabel(this, 'Test Game Start').on('pointerdown', () => {
            this.scene.start('GameScene', { isTesting: true });
          })
        ]
      })
      .layout();
  }
}

export default Test;
