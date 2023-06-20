import Phaser from 'phaser';
import config from './config';
import BootScene from './scenes/Boot';
import PreloaderScene from './scenes/Preloader';
import LobbyDirectoryScene from './scenes/LobbyDirectory';
import LobbyScene from './scenes/Lobby';
import GameScene from './scenes/Game';
import ConnectScene from './scenes/Connect';
import TestScene from './scenes/Test';

const game = new Phaser.Game(
  Object.assign(config.phaser, {
    scene: [
      BootScene,
      PreloaderScene,
      ConnectScene,
      LobbyDirectoryScene,
      LobbyScene,
      GameScene,
      TestScene
    ]
  })
);
