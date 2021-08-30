import { getFieldByPoint } from "../logic/board";
import { getValidMoveTarget } from "../logic/game-object";
import { Board, GameObject } from "../logic/types";

export function handleFoxDrag(
  scene: Phaser.Scene,
  fox: Phaser.GameObjects.Image,
  startX: number,
  startY: number,
  width: number,
  height: number,
  gameObject: GameObject,
  board: Board
) {
  const moves = getValidMoveTarget(board, gameObject);
  const horizontal = gameObject.coordinates[0].x < gameObject.coordinates[1].x;
  let minY = Infinity;
  let maxY = -Infinity;
  let minX = Infinity;
  let maxX = -Infinity;
  const movesWithRest = [
    ...moves,
    getFieldByPoint(
      board,
      gameObject.coordinates[0].x,
      gameObject.coordinates[0].y
    ),
  ];
  movesWithRest.forEach((m) => {
    const mX =
      startX + m!.coordinate.x * width + width / 2 + (horizontal ? 50 : 0);
    if (mX < minX) {
      minX = mX;
    }
    if (mX > maxX) {
      maxX = mX;
    }
    const mY =
      startY + m!.coordinate.y * height + height / 2 + (horizontal ? 0 : 30);
    if (mY < minY) {
      minY = mY;
    }
    if (mY > maxY) {
      maxY = mY;
    }
  });
  fox.setData("minX", minX);
  fox.setData("maxX", maxX);
  fox.setData("minY", minY);
  fox.setData("maxY", maxY);
  console.log(minX, maxX, minY, maxY);
}

export function handleFoxDrop(
  scene: Phaser.Scene,
  fox: Phaser.GameObjects.Image,
  startX: number,
  startY: number,
  width: number,
  height: number,
  pointer: Phaser.Input.Pointer,
  gameObject: GameObject,
  board: Board
) {
  const moves = getValidMoveTarget(board, gameObject);
  const currentField = getFieldByPoint(
    board,
    gameObject.coordinates[0].x,
    gameObject.coordinates[0].y
  )!;
  moves.push(currentField);
  const horizontal = gameObject.coordinates[0].x < gameObject.coordinates[1].x;
  const newFieldX = Math.floor((fox.x - startX - width / 2) / width);
  const newFieldY = Math.floor((fox.y - startY - height / 2) / height);
  if (
    moves.find(
      (m) => m.coordinate.x == newFieldX && m.coordinate.y == newFieldY
    )
  ) {
    gameObject.coordinates[0] = {
      x: newFieldX,
      y: newFieldY,
    };
    gameObject.coordinates[1] = {
      x: newFieldX + (horizontal ? 1 : 0),
      y: newFieldY + (horizontal ? 0 : 1),
    };
    const c1 = gameObject.coordinates[0];
    fox.setPosition(
      startX + c1.x * width + width / 2 + (horizontal ? 50 : 0),
      startY + c1.y * height + height / 2 + (horizontal ? 0 : 30)
    );
  }
}

export function handleFoxDragging(
  scene: Phaser.Scene,
  fox: Phaser.GameObjects.Image,
  startX: number,
  startY: number,
  width: number,
  height: number,
  dragX: number,
  dragY: number,
  gameObject: GameObject,
  board: Board
) {
  const minX: number = fox.getData("minX");
  const maxX: number = fox.getData("maxX");
  const minY: number = fox.getData("minY");
  const maxY: number = fox.getData("maxY");
  let x = dragX;
  let y = dragY;
  if (x < minX) {
    x = minX;
  }
  if (x > maxX) {
    x = maxX;
  }
  if (y < minY) {
    y = minY;
  }
  if (y > maxY) {
    y = maxY;
  }
  fox.setPosition(x, y);
}
