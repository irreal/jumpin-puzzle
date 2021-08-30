import Phaser from "phaser";
import { createField, createGameObject } from "../gameObjects/createBoard";
import { addGameObjects } from "../logic/board";
import {
  addMaster1Objects,
  addTestObjects,
  createStandardBoard,
} from "../logic/template-boards";
import { Board } from "../logic/types";

export default class Demo extends Phaser.Scene {
  constructor(private graphics: Phaser.GameObjects.Graphics) {
    super("GameScene");
  }
  board?: Board;

  preload() {
    this.load.image("rabbit", "assets/rabbit.png");
    this.load.image("mushroom", "assets/mushroom.png");
    this.load.image("fox", "assets/fox.png");
  }

  init(data: any) {
    if (!data || !data.gameObjects) {
      console.log("well shit");
      return;
    }
    this.board = createStandardBoard();
    this.board = addGameObjects(this.board, data.gameObjects);
  }

  create() {
    this.graphics = this.add.graphics();
    this.input.on(
      "dragstart",
      (_: any, gameObject: Phaser.GameObjects.GameObject) => {
        const handler = gameObject.getData("dragcallback");
        if (handler) {
          handler();
        }
      }
    );
    this.input.on(
      "dragend",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject
      ) => {
        const handler = gameObject.getData("dropcallback");
        if (handler) {
          handler(pointer);
        }
      }
    );
    this.input.on(
      "drag",
      function (_: any, gameObject: any, dragX: number, dragY: number) {
        const handler = gameObject.getData("draggingcallback");
        if (handler) {
          handler(dragX, dragY);
        }
      }
    );
    if (this.board) {
      this.createBoard(this.board);
    }
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
      createGameObject(this, go, board, startX, startY, width, height);
    });
  }
}
