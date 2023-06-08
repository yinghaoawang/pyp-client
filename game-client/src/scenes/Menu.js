import Phaser from 'phaser';
import gameState from '../model/gameState';
import levels from '../data/levels';
import { TextButton, Column, Viewport } from 'phaser-ui-tools';

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  init(data) {}

  preload() {
    this.load.image('med-button', 'assets/button-200x50.png');
  }

  create(data) {
    const btnFnc = (evt) => {
      console.log('button pressed', evt);
    };

    this.add.text(10, 10, `Lobby`, { font: '48px Arial', fill: '#000000' });

    // Add buttons.
    const buttonOne = new TextButton(this, 0, 0, 'med-button', btnFnc, this)
      .setText('New Game')
      .eventTextYAdjustment(3);
    const buttonTwo = new TextButton(this, 0, 0, 'med-button', btnFnc, this)
      .setText('Continue')
      .eventTextYAdjustment(3);
    const buttonThree = new TextButton(this, 0, 0, 'med-button', btnFnc, this, 1)
      .setText('Options')
      .setDisplaySize(200, 50)
      .eventTextYAdjustment(3);

    const column = new Column(this, 200, 100);
    column.addNode(buttonOne, 0, 10);
    column.addNode(buttonTwo, 0, 10);
    column.addNode(buttonThree, 0, 10);
  }

  update(time, delta) {}
}

export default Menu;
