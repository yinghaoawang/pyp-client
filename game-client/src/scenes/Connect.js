import Phaser from 'phaser';
const { io } = require('socket.io-client');

class Connect extends Phaser.Scene {
  constructor() {
    super({ key: 'ConnectScene' });
  }

  create(data) {
    this.loadingGlobe = this.add
      .image(400, 280, 'globe')
      .setDisplaySize(250, 250)
      .setTint(0, 0x0000ff, 0xff0000, 0)
      .setOrigin(0.5, 0.5);

    this.isLoading = true;
    this.loadingText = this.add.text(400, 500, 'Connecting to server', {
      font: '20px'
    });
    this.loadingText.setOriginFromFrame();

    this.socket = io('http://localhost:9898');
  }

  update() {
    this.loadingGlobe.rotation += 0.01;
    if (this.isLoading && this.socket?.connected) {
      console.log('connected');
      setTimeout(() => {
        this.loadingText.setText('Connected, click anywhere');
        this.input.on('pointerdown', () => {
          this.scene.start('LobbyScene');
        });
      }, 1000);
      this.isLoading = false;
    }
  }
}

export default Connect;
