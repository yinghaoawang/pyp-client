module.exports = {
  getCenter: (scene) => {
    return { x: scene.cameras.main.centerX, y: scene.cameras.main.centerY };
  }
};
