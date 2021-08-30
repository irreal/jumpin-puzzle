import Phaser, { Game } from "phaser";
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

    this.input.keyboard.on("keydown-SPACE", (event: any) => {
      this.scene.start("GameScene", { gameObjects: board.gameObjects });
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

    const order = [
      GameObjectType.Bunny,
      GameObjectType.Mushroom,
      GameObjectType.Fox,
      GameObjectType.Fox,
    ];
    let nextUp = -1;
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
      } else {
        nextUp = -1;
      }
      if (pointer.button === 2) {
        return;
      }
      while (true) {
        nextUp++;
        nextUp = nextUp % order.length;

        const newObj = createGameObject(order[nextUp], [field!.coordinate]);
        if (nextUp === order.length - 2) {
          const newX = field!.coordinate.x + 1;
          const newY = field!.coordinate.y;
          const secondField = getFieldByPoint(board, newX, newY);
          if (secondField && !getFieldObject(board, secondField)) {
            newObj.coordinates.push({
              x: newX,
              y: newY,
            });
          } else {
            continue;
          }
        } else if (nextUp === order.length - 1) {
          const newX = field!.coordinate.x;
          const newY = field!.coordinate.y + 1;
          const secondField = getFieldByPoint(board, newX, newY);
          if (secondField && !getFieldObject(board, secondField)) {
            newObj.coordinates.push({
              x: newX,
              y: newY,
            });
          } else {
            continue;
          }
        }
        board.gameObjects.push(newObj);
        const obj = cgo(this, newObj, board, startX, startY, width, height);
        this.objMap[`${field?.coordinate.x}-${field?.coordinate.y}`] = obj;
        break;
      }
    };
  }
}
