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
    creatorButton.on("pointerover", () => {
      creatorButton.setStyle({ color: "black" });
    });
    creatorButton.on("pointerout", () => {
      creatorButton.setStyle({ color: "white" });
    });

    const playButton = this.add.text(100, 200, "Igraj postojeći nivo", {
      fontSize: "42px",
    });
    playButton.setInteractive();
    playButton.on("pointerdown", () => {
      this.scene.start("LevelSelectScene");
    });
    playButton.on("pointerover", () => {
      playButton.setStyle({ color: "black" });
    });
    playButton.on("pointerout", () => {
      playButton.setStyle({ color: "white" });
    });
  }
}
