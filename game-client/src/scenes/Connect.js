import Phaser from 'phaser';
import config from '../config';
import { getCenter, getSize } from '../helpers';
const { io } = require('socket.io-client');

class Connect extends Phaser.Scene {
  constructor() {
    super({ key: 'ConnectScene' });
  }

  create(data) {
    this.loadingGlobe = this.add
      .image(getCenter(this).x, getCenter(this).y - 20, 'globe')
      .setDisplaySize(250, 250)
      .setTint(0, 0x0000ff, 0xff0000, 0)
      .setOrigin(0.5, 0.5);

    this.isLoading = true;
    this.loadingText = this.add.text(getCenter(this).x, getSize(this).y - 100, 'Connecting to server', {
      font: '20px'
    });
    this.loadingText.setOriginFromFrame();

    this.socket = io(config.socketUrl);
  }

  update() {
    this.loadingGlobe.rotation += 0.01;
    if (this.isLoading && this.socket?.connected) {
      console.log('connected');
      setTimeout(() => {
        this.loadingText.setText('Connected, click anywhere');
        this.input.on('pointerdown', () => {
          this.scene.start('LobbyDirectory');
        });
      }, 500);
      this.isLoading = false;
    }
  }
}

export default Connect;
