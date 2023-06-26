// General
export const COLOR_PRIMARY = 0x666699;
export const COLOR_SECONDARY = 0xaaaaff;

export const COLOR_LIGHT = 0x777999;
export const COLOR_DARK = 0x222444;

// Game
export const COLOR_CARD_ZONE = 0x999999;

// Lobby
export const COLOR_HEADER = 0x482f26;
export const COLOR_HOST = 0x8b2f26;
export const COLOR_DISABLED = 0x444444;

export const createFwSizerWrapper = (scene, sizerOpts) => {
  const rexUI = scene?.rexUI || scene?.scene?.rexUI;
  if (rexUI == null) throw new Error('Could not find scene.rexUI');
  const sizer = rexUI.add.fixWidthSizer({
    ...sizerOpts
  });
  return sizer;
};

export const createLabel = (scene, text, labelOpts, textOpts) => {
  return scene.rexUI.add
    .label({
      text: scene.add.text(0, 0, text, {
        fontSize: 18,
        ...textOpts
      }),
      space: {
        top: 3,
        left: 3,
        right: 3,
        bottom: 3
      },
      align: 'center',
      ...labelOpts
    })
    .layout();
};

/** If you don't know what this is, you should probably use createContainedButton */
export const createButtonLabel = (
  scene,
  text,
  labelOpts = { width: 100, height: 40 },
  textOpts,
  backgroundColor
) => {
  return createLabel(scene, text, {
    background: scene.rexUI.add.roundRectangle(
      0,
      0,
      labelOpts.width,
      labelOpts.height,
      20,
      backgroundColor || COLOR_PRIMARY
    ),

    space: {
      top: 15,
      left: 20,
      right: 20,
      bottom: 15
    },
    align: 'center',
    ...labelOpts
  })
    .layout()
    .setInteractive({ cursor: 'pointer' });
};

/** Creates a single button label in a button container */
export const createContainedButton = (
  scene,
  text,
  containerOpts = { x: 400, y: 200, orientation: 'y' },
  buttonOpts,
  textOpts
) => {
  return scene.rexUI.add
    .buttons({
      buttons: [
        createButtonLabel(
          scene,
          text,
          {
            width: containerOpts.width,
            height: containerOpts.height,
            ...buttonOpts
          },
          textOpts
        )
      ],
      expand: true,
      ...containerOpts
    })
    .layout()
    .setInteractive({ cursor: 'pointer' });
};
