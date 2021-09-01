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
      name: "Uvod u skakutave zečeve",
      id: "1",
      gameObjects: createObjectsFromShortString("0220000020000100000000000"),
    },
    {
      name: "Dva zeca",
      id: "2",
      gameObjects: createObjectsFromShortString("0012100002000200000000000"),
    },
    {
      name: "skok, skok",
      id: "3",
      gameObjects: createObjectsFromShortString("0102000200000000020000100"),
    },
    {
      name: "zeka zeku preskače",
      id: "4",
      gameObjects: createObjectsFromShortString("0000000000100002020001020"),
    },
    {
      name: "zamisli se",
      id: "5",
      gameObjects: createObjectsFromShortString("0010002000200002000010000"),
    },
    {
      name: "reši u šest poteza",
      id: "6",
      gameObjects: createObjectsFromShortString("1200000200020100000000000"),
    },
    {
      name: "Sedam skokova do pobede",
      id: "7",
      gameObjects: createObjectsFromShortString("0000000000000100220000021"),
    },
    {
      name: "Sada sa 3 zeke",
      id: "8",
      gameObjects: createObjectsFromShortString("0000000002121210000000000"),
    },
    {
      name: "Početni 9",
      id: "9",
      gameObjects: createObjectsFromShortString("1202100200000000000000100"),
    },
    {
      name: "Početni 10",
      id: "10",
      gameObjects: createObjectsFromShortString("1212120000000000000000000"),
    },
    {
      name: "Početni 11",
      id: "11",
      gameObjects: createObjectsFromShortString("1201000200000010002000000"),
    },
    {
      name: "Početni 12",
      id: "12",
      gameObjects: createObjectsFromShortString("0000000000110010200000220"),
    },
    {
      name: "junior 13",
      id: "13",
      gameObjects: createObjectsFromShortString("0002002130002000000000000"),
    },
    {
      name: "junior 14",
      id: "14",
      gameObjects: createObjectsFromShortString("0001003000022020000000000"),
    },
    {
      name: "junior 15",
      id: "15",
      gameObjects: createObjectsFromShortString("0024000000002000020100000"),
    },
    {
      name: "junior 16",
      id: "16",
      gameObjects: createObjectsFromShortString("0100020000200000420000000"),
    },
    {
      name: "junior 17",
      id: "17",
      gameObjects: createObjectsFromShortString("0404000002200021000000000"),
    },
    {
      name: "junior 18",
      id: "18",
      gameObjects: createObjectsFromShortString("0000000300200203000020010"),
    },
    {
      name: "junior 19",
      id: "19",
      gameObjects: createObjectsFromShortString("0020000100000420020000000"),
    },
    {
      name: "junior 20",
      id: "20",
      gameObjects: createObjectsFromShortString("0100000000202000420000000"),
    },
    {
      name: "veoma težak nivo",
      id: "99",
      gameObjects: createObjectsFromShortString("0101024001200000300020000"),
    },
  ];
}
