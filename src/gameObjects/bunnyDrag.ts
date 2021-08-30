import { getFieldByPoint } from "../logic/board";
import { getValidMoveTarget } from "../logic/game-object";
import { Board, GameObject } from "../logic/types";

export function handleBunnyDrag(
  scene: Phaser.Scene,
  bunny: Phaser.GameObjects.Image,
  startX: number,
  startY: number,
  width: number,
  height: number,
  gameObject: GameObject,
  board: Board
) {
  const moves = getValidMoveTarget(board, gameObject);
  const dropTargetObjects: Phaser.GameObjects.GameObject[] = [];
  moves.forEach((f) => {
    const c = f.coordinate;
    let bunnySprite = scene.add.image(
      startX + c.x * width + width / 2,
      startY + c.y * height + height / 2 - 15,
      "rabbit"
    );
    bunnySprite.setScale(0.3);
    bunnySprite.alpha = 0.4;
    dropTargetObjects.push(bunnySprite);
  });
  bunny.setData("dropTargetObjects", dropTargetObjects);
}

export function handleBunnyDrop(
  scene: Phaser.Scene,
  bunny: Phaser.GameObjects.Image,
  startX: number,
  startY: number,
  width: number,
  height: number,
  pointer: Phaser.Input.Pointer,
  gameObject: GameObject,
  board: Board
) {
  const dropTargetObjects: Phaser.GameObjects.GameObject[] =
    bunny.getData("dropTargetObjects") || [];
  dropTargetObjects.forEach((to) => {
    to.destroy();
  });

  const moves = getValidMoveTarget(board, gameObject);
  moves.push(
    getFieldByPoint(
      board,
      gameObject.coordinates[0].x,
      gameObject.coordinates[0].y
    )!
  );

  const targetFieldX = Math.floor(pointer.position.x - startX / width);
  const targetFieldY = Math.floor(pointer.position.y - startY / height);
  const targetField = getFieldByPoint(board, targetFieldX, targetFieldY);
  console.log("target: ", targetFieldX, targetFieldY, targetField);
}
