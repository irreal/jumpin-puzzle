import { getFieldByPoint, getFieldObject, getRelativeField } from "./board";
import { getValidMoveTarget } from "./game-object";
import { addTestObjects, createStandardBoard } from "./template-boards";

const board = addTestObjects(createStandardBoard());

const fieldObject = getFieldObject(board, getFieldByPoint(board, 1, 0));

const moves = getValidMoveTarget(board, fieldObject);
console.log(moves);
