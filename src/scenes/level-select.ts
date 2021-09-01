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
    const customLevels = JSON.parse(
      localStorage.getItem("custom-levels") || "[]"
    );
    const levels = [...getAllLevels(), ...customLevels];
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
    let startX = 0;
    let startY = 0;
    let isDown = false;
    let oldX = 0;
    let oldY = 0;
    this.input.on("pointerdown", (pointer: any) => {
      startX = pointer.x;
      startY = pointer.y;
      isDown = true;
    });
    this.input.on("pointerup", (pointer: any) => {
      isDown = false;
      oldX = this.cameras.main.scrollX;
      oldY = this.cameras.main.scrollY;
    });
    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!isDown) {
        return;
      }
      const x = pointer.x - startX;
      const y = pointer.y - startY;
      this.cameras.main.setScroll(0, oldY - y);
    });
  }
}
