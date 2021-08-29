import Phaser from "phaser";
import { createField } from "../gameObjects/createBoard";
import { addTestObjects, createStandardBoard } from "../logic/template-boards";
import { Board, GameObject, GameObjectType } from "../logic/types";

export default class Demo extends Phaser.Scene {
  constructor(private graphics: Phaser.GameObjects.Graphics) {
    super("GameScene");
  }

  preload() {
    this.load.image("rabbit", "assets/rabbit.png");
    this.load.image("mushroom", "assets/mushroom.png");
    this.load.image("fox", "assets/fox.png");
  }

  create() {
    this.graphics = this.add.graphics();

    this.input.on(
      "drag",
      function (pointer: any, gameObject: any, dragX: number, dragY: number) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    const board = addTestObjects(createStandardBoard());
    this.createBoard(board);
  }

  createBoard(board: Board): void {
    const width = 90;
    const height = 90;
    const startX = 200;
    const startY = 90;

    board.fields.forEach((field) => {
      createField(this.graphics, field, startX, startY, width, height);
    });
    board.gameObjects.forEach((go) => {
      this.createGameObject(go, startX, startY, width, height);
    });
  }

  createGameObject(
    gameObject: GameObject,
    startX: number,
    startY: number,
    width: number,
    height: number
  ) {
    gameObject.coordinates.forEach((c, index) => {
      switch (gameObject.type) {
        case GameObjectType.Bunny:
          let bunnySprite = this.add
            .image(
              startX + c.x * width + width / 2,
              startY + c.y * height + height / 2 - 15,
              "rabbit"
            )
            .setInteractive();
          bunnySprite.setScale(0.3);
          this.input.setDraggable(bunnySprite);
          break;
        case GameObjectType.Mushroom:
          const mushroomSprite = this.add.image(
            startX + c.x * width + width / 2,
            startY + c.y * height + height / 2 - 5,
            "mushroom"
          );
          mushroomSprite.setScale(0.06);
          break;
        case GameObjectType.Fox:
          const foxSprite = this.add
            .image(
              startX + c.x * width + width / 2,
              startY + c.y * height + height / 2,
              "fox"
            )
            .setInteractive();
          foxSprite.setScale(0.3);
          this.input.setDraggable(foxSprite);
          break;
      }
    });
  }
}
