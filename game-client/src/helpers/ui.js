// General
export const COLOR_PRIMARY = 0x4e342e;
export const COLOR_LIGHT = 0x7b5e57;
export const COLOR_DARK = 0x260e04;

// Game
export const COLOR_CARD_ZONE = 0x999999;

// Lobby
export const COLOR_HEADER = 0x482f26;
export const COLOR_HOST = 0x8b2f26;
export const COLOR_DISABLED = 0x444444;

export const createFwSizerWrapper = (scene, opts) => {
  const rexUI = scene?.rexUI || scene?.scene?.rexUI;
  if (rexUI == null) throw new Error('Could not find scene.rexUI');
  const sizer = rexUI.add.fixWidthSizer({
    ...opts
  });
  return sizer;
};

/** If you don't know what this is, you should probably use createContainedButton */
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
      align: 'center',
      ...opts
    })
    .layout()
    .setInteractive({ cursor: 'pointer' });
};

/** Creates a single button label in a button container */
export const createContainedButton = (
  scene,
  text,
  opts = { x: 400, y: 200, orientation: 'y' },
  buttonOpts
) => {
  return scene.rexUI.add
    .buttons({
      buttons: [
        createButtonLabel(scene, text, {
          width: opts.width,
          height: opts.height,
          ...buttonOpts
        })
      ],
      expand: true,
      ...opts
    })
    .layout()
    .setInteractive({ cursor: 'pointer' });
};
