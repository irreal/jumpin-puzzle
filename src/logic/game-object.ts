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
    case GameObjectType.Fox:
      return getValidMoveTargetForFox(board, object);
    default:
      return [];
  }
}

function getValidMoveTargetForFox(board: Board, fox: GameObject): Field[] {
  const headField = getFieldByPoint(
    board,
    fox.coordinates[0].x,
    fox.coordinates[0].y
  )!;
  const tailField = getFieldByPoint(
    board,
    fox.coordinates[1].x,
    fox.coordinates[1].y
  )!;
  const horizontal = tailField.coordinate.x > headField.coordinate.x;

  if (horizontal) {
    return getValidMoveTargetForFoxHorizontal(board, headField);
  } else {
    return getValidMoveTargetForFoxVertical(board, headField);
  }
}

function getValidMoveTargetForFoxHorizontal(
  board: Board,
  headField: Field
): Field[] {
  const moves: Field[] = [];
  for (let i = -1; i <= 1; i += 2) {
    let index = i < 0 ? 1 : 2;
    while (true) {
      const field = getFieldByPoint(
        board,
        headField.coordinate.x + i * index,
        headField.coordinate.y
      );
      if (!field) {
        break;
      }
      const object = getFieldObject(board, field);
      if (!object) {
        moves.push(
          getFieldByPoint(
            board,
            field.coordinate.x - (i < 0 ? 0 : 1),
            field.coordinate.y
          )!
        );
      } else {
        break;
      }
      index++;
    }
  }
  return moves;
}

function getValidMoveTargetForFoxVertical(
  board: Board,
  headField: Field
): Field[] {
  console.log("getting vertical");
  const moves: Field[] = [];
  for (let i = -1; i <= 1; i += 2) {
    let index = i < 0 ? 1 : 2;
    while (true) {
      const field = getFieldByPoint(
        board,
        headField.coordinate.x,
        headField.coordinate.y + i * index
      );
      if (!field) {
        break;
      }
      const object = getFieldObject(board, field);
      if (!object) {
        moves.push(
          getFieldByPoint(
            board,
            field.coordinate.x,
            field.coordinate.y - (i < 0 ? 0 : 1)
          )!
        );
      } else {
        break;
      }
      index++;
    }
  }
  return moves;
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

export function cloneGameObjects(objects: GameObject[]): GameObject[] {
  return objects.map((object) => {
    return {
      type: object.type,
      coordinates: object.coordinates.map((coordinate) => {
        return {
          x: coordinate.x,
          y: coordinate.y,
        };
      }),
    };
  });
}
