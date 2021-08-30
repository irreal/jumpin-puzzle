import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import CreatorScene from "./scenes/Creator";
import MenuScene from "./scenes/menu";

new Phaser.Game(
  Object.assign(config, {
    scene: [MenuScene, CreatorScene, GameScene],
  })
);
