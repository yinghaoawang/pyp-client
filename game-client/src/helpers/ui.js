export const COLOR_PRIMARY = 0x4e342e;
export const COLOR_LIGHT = 0x7b5e57;
export const COLOR_DARK = 0x260e04;

/** If you don't know what this is, you should probably use createButton */
export const createButtonLabel = (
  scene,
  text,
  opts = { width: 100, height: 40 }
) => {
  return scene.rexUI.add
    .label({
      background: scene.rexUI.add.roundRectangle(
        0,
        0,
        opts.width,
        opts.height,
        20,
        0x7b5e57
      ),
      text: scene.add.text(0, 0, text, {
        fontSize: 18
      }),
      space: {
        top: 15,
        left: 20,
        right: 20,
        bottom: 15
      },
      ...opts
    })
    .layout();
};

/** Creates a single button label in a button container */
export const createButton = (
  scene,
  text,
  opts = { x: 400, y: 200, orientation: 'y' },
  buttonOpts
) => {
  return scene.rexUI.add
    .buttons({
      buttons: [
        createButtonLabel(scene, text, {
          width: buttonOpts,
          height: buttonOpts,
          ...buttonOpts
        })
      ],
      ...opts
    })
    .layout()
    .setInteractive({ cursor: 'pointer' });
};
