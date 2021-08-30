import { getFieldByPoint, getFieldObject, getRelativeField } from "./board";
import { getValidMoveTarget } from "./game-object";
import { addTestObjects, createStandardBoard } from "./template-boards";

const board = addTestObjects(createStandardBoard());

const fieldObject = getFieldObject(board, getFieldByPoint(board, 3, 1));

const moves = getValidMoveTarget(board, fieldObject);
console.log(moves);
