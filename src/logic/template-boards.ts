import {
  addGameObject,
  addGameObjects,
  cloneBoard,
  createBoard,
} from "./board";
import { createField } from "./field";
import { createGameObject } from "./game-object";
import { Board, GameObjectType } from "./types";

export function createStandardBoard(): Board {
  return createBoard([
    createField(0 - 1, 0, true, true),
    createField(1 - 1, 0, false, false),
    createField(2 - 1, 0, true, false),
    createField(3 - 1, 0, false, false),
    createField(4 - 1, 0, true, true),
    createField(0, 1, false, false),
    createField(1, 1, false, false),
    createField(2, 1, false, false),
    createField(3, 1, false, false),
    createField(4, 1, false, false),
    createField(0, 2, true, false),
    createField(1, 2, false, false),
    createField(2, 2, true, true),
    createField(3, 2, false, false),
    createField(4, 2, true, false),
    createField(0, 3, false, false),
    createField(1, 3, false, false),
    createField(2, 3, false, false),
    createField(3, 3, false, false),
    createField(4, 3, false, false),
    createField(0 + 1, 4, true, true),
    createField(1 + 1, 4, false, false),
    createField(2 + 1, 4, true, false),
    createField(3 + 1, 4, false, false),
    createField(4 + 1, 4, true, true),
    //random shit
    createField(3, -1, true, false),
    createField(5, 2, true, false),
    createField(6, 2, true, true),
  ]);
}

export function addTestObjects(board: Board): Board {
  let newBoard = cloneBoard(board);
  newBoard = addGameObjects(newBoard, [
    createGameObject(GameObjectType.Bunny, [{ x: 1, y: 0 }]),
    createGameObject(GameObjectType.Mushroom, [{ x: 2, y: 0 }]),
    createGameObject(GameObjectType.Fox, [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ]),
  ]);
  return newBoard;
}
