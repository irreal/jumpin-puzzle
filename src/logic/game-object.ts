import { getFieldByPoint, getFieldObject } from "./board";
import { Board, Coordinate, Field, GameObject, GameObjectType } from "./types";

export function createGameObject(
  type: GameObjectType,
  coordinates: Coordinate[]
): GameObject {
  return {
    type,
    coordinates,
  };
}

export function getValidMoveTarget(
  board: Board,
  object: GameObject | undefined
): Field[] {
  if (!object) {
    return [];
  }
  switch (object.type) {
    case GameObjectType.Bunny:
      return getValidMoveTargetForBunny(board, object);
    default:
      return [];
  }
}

function getValidMoveTargetForBunny(board: Board, bunny: GameObject): Field[] {
  const currentField = getFieldByPoint(
    board,
    bunny.coordinates[0].x,
    bunny.coordinates[0].y
  );
  if (!currentField) {
    return [];
  }
  const moves: Field[] = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      if (i !== 0 && j !== 0) {
        continue;
      }
      let index = 1;
      let hasJumped = false;
      while (true) {
        const field = getFieldByPoint(
          board,
          currentField.coordinate.x + i * index,
          currentField.coordinate.y + j * index
        );
        if (!field) {
          break;
        }
        const object = getFieldObject(board, field);
        if (!object) {
          if (hasJumped) {
            moves.push(field);
          }
          break;
        } else {
          hasJumped = true;
        }

        index++;
      }
    }
  }
  return moves;
}
