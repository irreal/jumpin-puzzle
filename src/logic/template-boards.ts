import {
  addGameObject,
  addGameObjects,
  cloneBoard,
  createBoard,
} from "./board";
import { createField } from "./field";
import { createGameObject } from "./game-object";
import { createObjectsFromShortString } from "./helper";
import { Board, GameObjectType, Level } from "./types";

export function createStandardBoard(): Board {
  return createBoard([
    createField(0, 0, true, true),
    createField(1, 0, false, false),
    createField(2, 0, true, false),
    createField(3, 0, false, false),
    createField(4, 0, true, true),
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
    createField(0, 4, true, true),
    createField(1, 4, false, false),
    createField(2, 4, true, false),
    createField(3, 4, false, false),
    createField(4, 4, true, true),
  ]);
}

export function addMaster1Objects(board: Board): Board {
  let newBoard = cloneBoard(board);
  newBoard = addGameObjects(newBoard, [
    createGameObject(GameObjectType.Mushroom, [{ x: 0, y: 0 }]),
    createGameObject(GameObjectType.Fox, [
      { x: 2, y: 1 },
      { x: 3, y: 2 },
    ]),
    createGameObject(GameObjectType.Bunny, [{ x: 4, y: 2 }]),
    createGameObject(GameObjectType.Bunny, [{ x: 0, y: 3 }]),
    createGameObject(GameObjectType.Bunny, [{ x: 2, y: 3 }]),
    createGameObject(GameObjectType.Fox, [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
    ]),
  ]);
  return newBoard;
}

export function addTestObjects(board: Board): Board {
  let newBoard = cloneBoard(board);
  newBoard = addGameObjects(newBoard, [
    createGameObject(GameObjectType.Bunny, [{ x: 1, y: 0 }]),
    createGameObject(GameObjectType.Bunny, [{ x: 3, y: 0 }]),
    createGameObject(GameObjectType.Bunny, [{ x: 2, y: 3 }]),
    createGameObject(GameObjectType.Mushroom, [{ x: 2, y: 0 }]),
    createGameObject(GameObjectType.Mushroom, [{ x: 1, y: 1 }]),
    createGameObject(GameObjectType.Mushroom, [{ x: 1, y: 2 }]),
    createGameObject(GameObjectType.Mushroom, [{ x: 1, y: 3 }]),
    createGameObject(GameObjectType.Fox, [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ]),
    createGameObject(GameObjectType.Fox, [
      { x: 3, y: 4 },
      { x: 4, y: 4 },
    ]),
  ]);
  return newBoard;
}

export function getAllLevels(): Level[] {
  return [
    {
      name: "Dobrodošao zeče",
      id: "1",
      gameObjects: createObjectsFromShortString("0220000020000100000000000"),
    },
    {
      name: "Dva zecova",
      id: "2",
      gameObjects: createObjectsFromShortString("0012100002000200000000000"),
    },
    {
      name: "isto, samo potez više",
      id: "4",
      gameObjects: createObjectsFromShortString("0000000000100002020001020"),
    },
    {
      name: "zajeban",
      id: "99",
      gameObjects: createObjectsFromShortString("0101024001200000300020000"),
    },
  ];
}
