import { GameObjects } from "phaser";
import { Board, Field, GameObject } from "./types";

export function cloneBoard(board: Board): Board {
  return {
    fields: [...board.fields],
    gameObjects: [...board.gameObjects],
  };
}

export function createBoard(fields: Field[]): Board {
  const board: Board = { fields, gameObjects: [] };
  return board;
}

export function addFields(board: Board, fields: Field[]): Board {
  const newBoard = cloneBoard(board);
  newBoard.fields = [...newBoard.fields, ...fields];
  return newBoard;
}

export function getFieldByPoint(
  board: Board,
  x: number,
  y: number
): Field | undefined {
  return board.fields.find((f) => f.coordinate.x === x && f.coordinate.y === y);
}

export function getRelativeField(
  board: Board,
  field: Field | undefined,
  x: number,
  y: number
): Field | undefined {
  if (!field) {
    return undefined;
  }
  return getFieldByPoint(board, field.coordinate.x + x, field.coordinate.y + y);
}

export function addGameObject(board: Board, gameObject: GameObject): Board {
  const newBoard = cloneBoard(board);
  newBoard.gameObjects = [...newBoard.gameObjects, gameObject];
  return newBoard;
}
export function addGameObjects(board: Board, gameObjects: GameObject[]): Board {
  const newBoard = cloneBoard(board);
  newBoard.gameObjects = [...newBoard.gameObjects, ...gameObjects];
  return newBoard;
}

export function getFieldObject(
  board: Board,
  field?: Field
): GameObject | undefined {
  if (!field) {
    return undefined;
  }
  return board.gameObjects.find((o) =>
    o.coordinates.find(
      (c) => c.x === field.coordinate.x && c.y === field.coordinate.y
    )
  );
}
