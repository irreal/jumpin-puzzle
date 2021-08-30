import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import CreatorScene from "./scenes/Creator";

new Phaser.Game(
  Object.assign(config, {
    scene: [CreatorScene, GameScene],
  })
);
