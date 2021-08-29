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

export function addGameObject(board: Board, gameObject: GameObject): Board {
  const newBoard = cloneBoard(board);
  newBoard.gameObjects = [...newBoard.gameObjects, gameObject];
  return newBoard;
}
