import Phaser from "phaser";
import { createField, createGameObject } from "../gameObjects/createBoard";
import { addGameObjects, gameWon } from "../logic/board";
import { cloneGameObjects } from "../logic/game-object";
import {
  addMaster1Objects,
  addTestObjects,
  createStandardBoard,
} from "../logic/template-boards";
import { Board, GameObject } from "../logic/types";

export default class Demo extends Phaser.Scene {
  constructor(private graphics: Phaser.GameObjects.Graphics) {
    super("GameScene");
  }
  board?: Board;
  startingObjects?: GameObject[];
  madeMoves = false;
  winText?: Phaser.GameObjects.GameObject;
  moveCountText?: Phaser.GameObjects.GameObject;

  moveCount = 0;

  preload() {
    this.load.image("rabbit", "assets/rabbit.png");
    this.load.image("mushroom", "assets/mushroom.png");
    this.load.image("fox", "assets/fox.png");
  }

  init(data: any) {
    console.log("wtf", data);
    if (!data || !data.gameObjects) {
      console.log("well shit");
      return;
    }
    this.startingObjects = cloneGameObjects(data.gameObjects);
    this.board = createStandardBoard();
    this.board = addGameObjects(this.board, data.gameObjects);
    this.madeMoves = false;
    this.moveCount = 0;
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
        this.madeMoves = true;
        const handler = gameObject.getData("dropcallback");
        if (handler) {
          handler(pointer, () => {
            this.moveCount++;
            this.updateMoveCountText();
          });
          if (gameWon(this.board!)) {
            this.winText = this.add.text(40, 300, "POBEDIO SI IGRICU, BRAVO!", {
              fontSize: "50px",
              color: "#000000",
            });
          } else {
            if (this.winText) {
              this.winText.destroy();
              this.winText = undefined;
            }
          }
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
    this.input.keyboard.on("keydown-ESC", (event: any) => {
      if (this.madeMoves) {
        this.scene.start("GameScene", { gameObjects: this.startingObjects });
      } else {
        this.scene.start("MenuScene");
      }
    });
    if (this.board) {
      this.createBoard(this.board);
    }
    this.add.text(10, 10, "Escape za restart nivoa ili izlazak u glavni meni", {
      font: "16px Arial",
    });
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

  updateMoveCountText(): void {
    if (!this.moveCountText) {
      this.moveCountText = this.add.text(
        40,
        40,
        `broj poteza: ${this.moveCount}`,
        { fontSize: "40px" }
      );
    } else {
      (
        this.moveCountText as Phaser.GameObjects.Text
      ).text = `broj poteza: ${this.moveCount}`;
    }
  }
}
