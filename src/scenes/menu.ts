import Phaser, { Game } from "phaser";
import { createObjectsFromShortString } from "../logic/helper";

export default class MenuScene extends Phaser.Scene {
  constructor(private graphics: Phaser.GameObjects.Graphics) {
    super("MenuScene");
  }

  preload() {}

  create() {
    const creatorButton = this.add.text(100, 100, "Kreiraj nivo", {
      fontSize: "42px",
    });
    creatorButton.setInteractive();
    creatorButton.on("pointerdown", () => {
      this.scene.start("CreatorScene");
    });

    const playButton = this.add.text(100, 200, "Igraj postojeći nivo", {
      fontSize: "42px",
    });
    playButton.setInteractive();
    playButton.on("pointerdown", () => {
      this.scene.start("GameScene", {
        gameObjects: createObjectsFromShortString("0101024001200000300020000"),
      });
    });
  }
}
