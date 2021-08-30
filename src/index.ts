import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import CreatorScene from "./scenes/Creator";
import MenuScene from "./scenes/menu";
import LevelSelectScene from "./scenes/level-select";

new Phaser.Game(
  Object.assign(config, {
    scene: [MenuScene, LevelSelectScene, CreatorScene, GameScene],
  })
);
