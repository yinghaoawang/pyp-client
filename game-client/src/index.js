import Phaser from 'phaser';
import config from './config';
import BootScene from './scenes/Boot';
import PreloaderScene from './scenes/Preloader';
import LobbyScene from './scenes/Lobby';
import GameScene from './scenes/Game';
import ConnectScene from './scenes/Connect';

const game = new Phaser.Game(Object.assign(config, {
  scene: [BootScene, PreloaderScene, ConnectScene, LobbyScene, GameScene],
}));
