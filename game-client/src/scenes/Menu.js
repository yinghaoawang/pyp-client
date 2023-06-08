import Phaser from 'phaser';
import gameState from '../model/gameState';
import levels from '../data/levels';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  init(data) {}

  preload() {}

  create(data) {
    const scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 400,
        y: 300,
        width: 250,
        height: 220,

        scrollMode: 0,

        background: this.rexUI.add.roundRectangle(
          0,
          0,
          2,
          2,
          10,
          COLOR_PRIMARY
        ),

        panel: {
          child: this.rexUI.add.fixWidthSizer({
            space: {
              left: 3,
              right: 3,
              top: 3,
              bottom: 3,
              item: 8,
              line: 8
            }
          }),

          mask: {
            padding: 1
          }
        },

        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.rexUI.add
            .roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT)
            .setInteractive({ cursor: 'pointer' })
        },

        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,

          panel: 10
        }
      })
      .layout();

    updatePanel(scrollablePanel, content);

    this.add.text(0, 580, 'Click any word');
    this.add
      .text(0, 0, 'Back')
      .setInteractive({ cursor: 'pointer' })

      .on('pointerdown', () => {
        this.scene.start('BootScene');
      });
    this.print = this.add.text(0, 560, '');
  }

  update(time, delta) {}
}

const updatePanel = function (panel, content) {
  const sizer = panel.getElement('panel');
  const scene = panel.scene;

  sizer.clear(true);
  const lines = content.split('\n');
  for (let li = 0, lcnt = lines.length; li < lcnt; li++) {
    const words = lines[li].split(' ');
    for (let wi = 0, wcnt = words.length; wi < wcnt; wi++) {
      sizer.add(
        scene.add
          .text(0, 0, words[wi], {
            fontSize: 18
          })
          .setInteractive({ cursor: 'pointer' })
          .on('pointerdown', function () {
            this.scene.print.text = this.text;
            this.setTint(Phaser.Math.Between(0, 0xffffff));
          })
      );
    }
    if (li < lcnt - 1) {
      sizer.addNewLine();
    }
  }

  panel.layout();
  return panel;
};

const content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.
Along with the fantastic open source community, Phaser is actively developed and maintained by Photon Storm. As a result of rapid support, and a developer friendly API, Phaser is currently one of the most starred game frameworks on GitHub.
Thousands of developers from indie and multi-national digital agencies, and universities worldwide use Phaser. You can take a look at their incredible games.`;

export default Menu;
