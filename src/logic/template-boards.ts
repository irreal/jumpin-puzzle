import { createBoard } from "./board";
import { createField } from "./field";
import { Board } from "./types";

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
