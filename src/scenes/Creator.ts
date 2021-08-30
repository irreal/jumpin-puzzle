import Phaser from "phaser";
import {
  createField,
  createGameObject as cgo,
} from "../gameObjects/createBoard";
import { getFieldByPoint, getFieldObject } from "../logic/board";
import { createGameObject } from "../logic/game-object";
import { createStandardBoard } from "../logic/template-boards";
import { Board, GameObjectType } from "../logic/types";

export default class Creator extends Phaser.Scene {
  constructor(private graphics: Phaser.GameObjects.Graphics) {
    super("CreatorScene");
  }
  addObject: any = () => {};
  objMap: any = {};

  preload() {
    this.load.image("rabbit", "assets/rabbit.png");
    this.load.image("mushroom", "assets/mushroom.png");
    this.load.image("fox", "assets/fox.png");
  }

  create() {
    this.input.mouse.disableContextMenu();
    this.graphics = this.add.graphics();
    this.input.on("pointerdown", (pointer: any) => {
      this.addObject(pointer);
    });

    const board = createStandardBoard();
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

    this.addObject = (pointer: Phaser.Input.Pointer) => {
      const fieldX = Math.floor((pointer.x - startX) / width);
      const fieldY = Math.floor((pointer.y - startY) / height);
      const field = getFieldByPoint(board, fieldX, fieldY);
      const existingObj = getFieldObject(board, field);
      if (existingObj) {
        board.gameObjects = board.gameObjects.filter(
          (go) =>
            go.coordinates[0].x !== existingObj.coordinates[0].x ||
            go.coordinates[0].y !== existingObj.coordinates[0].y
        );
        const obj =
          this.objMap[
            existingObj.coordinates[0].x + "-" + existingObj.coordinates[0].y
          ];
        obj.destroy();
      }
      const newObj = createGameObject(GameObjectType.Bunny, [
        field!.coordinate,
      ]);
      board.gameObjects.push(newObj);
      const obj = cgo(this, newObj, board, startX, startY, width, height);
      this.objMap[`${field?.coordinate.x}-${field?.coordinate.y}`] = obj;
    };
  }
}
