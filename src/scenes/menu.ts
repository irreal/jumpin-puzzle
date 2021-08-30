import Phaser, { Game } from "phaser";
import { createObjectsFromShortString } from "../logic/helper";

export default class MenuScene extends Phaser.Scene {
  constructor(private graphics: Phaser.GameObjects.Graphics) {
    super("MenuScene");
  }

  preload() {
    this.load.image("rabbit", "assets/rabbit.png");
  }

  create() {
    const bunny = this.add.image(400, 450, "rabbit");
    bunny.setScale(0.8);
    this.tweens.add({
      targets: bunny,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: true,
      ease: "Sine.easeInOut",
      duration: 3000,
    });
    bunny.setTint(0xffffff, 0xe18532, 0xa6a9ac, 0xa6a9ac);
    this.add.text(250, 10, "Skaču zecovi", { fontSize: "50px" });
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
