import Phaser, { Game } from "phaser";
import { createObjectsFromShortString } from "../logic/helper";
import { getAllLevels } from "../logic/template-boards";

export default class LevelSelectScene extends Phaser.Scene {
  constructor(private graphics: Phaser.GameObjects.Graphics) {
    super("LevelSelectScene");
  }

  preload() {
    this.load.image("rabbit", "assets/rabbit.png");
  }

  create() {
    const levels = getAllLevels();
    let x = 50;
    let y = 50;
    const levelStats = JSON.parse(
      window.localStorage.getItem("level-stats") || "{}"
    );
    levels.forEach((l, index) => {
      const stat = levelStats[l.id];
      const lvlText = this.add.text(
        x,
        y,
        index + 1 + ": " + l.name + (stat ? " " + stat + " poteza" : ""),
        {
          fontSize: "32px",
          color: stat ? "green" : "white",
        }
      );
      lvlText.setInteractive();
      lvlText.on("pointerdown", () => {
        this.scene.start("GameScene", {
          id: l.id,
          gameObjects: l.gameObjects,
          name: l.name,
        });
      });
      lvlText.on("pointerover", () => {
        const bunny = this.add
          .image(lvlText.x + lvlText.width + 30, lvlText.y, "rabbit")
          .setScale(0.3);
        lvlText.setData("bunny", bunny);
      });
      lvlText.on("pointerout", () => {
        const bunny = lvlText.getData("bunny");
        if (bunny) {
          bunny.destroy();
        }
      });
      y += 40;
    });

    this.input.keyboard.on("keydown-ESC", (event: any) => {
      this.scene.start("MenuScene");
    });
  }
}
