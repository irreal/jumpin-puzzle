import { Board, Field, GameObject, GameObjectType } from "../logic/types";
import {
  handleBunnyDrag,
  handleBunnyDragging,
  handleBunnyDrop,
} from "./bunnyDrag";

export function createField(
  graphics: Phaser.GameObjects.Graphics,
  field: Field,
  startX: number,
  startY: number,
  width: number,
  height: number
) {
  graphics.fillStyle(0x00ff00);
  graphics.fillRect(
    startX + field.coordinate.x * width,
    startY + field.coordinate.y * height,
    width,
    height
  );
  graphics.fillStyle(
    field.isHome ? 0xff8800 : 0x009900,
    field.isHome ? 0.8 : 0.2
  );
  graphics.fillCircle(
    startX + field.coordinate.x * width + width / 2,
    startY + field.coordinate.y * height + height / 2,
    width / 4
  );
  if (field.isWall) {
    graphics.lineStyle(4, 0xffffff);
    graphics.strokeRect(
      startX + field.coordinate.x * width,
      startY + field.coordinate.y * height,
      width,
      height
    );
  }
}

export function createGameObject(
  scene: Phaser.Scene,
  gameObject: GameObject,
  board: Board,
  startX: number,
  startY: number,
  width: number,
  height: number
) {
  switch (gameObject.type) {
    case GameObjectType.Bunny:
      const c = gameObject.coordinates[0];
      let bunnySprite = scene.add
        .image(
          startX + c.x * width + width / 2,
          startY + c.y * height + height / 2 - 15,
          "rabbit"
        )
        .setInteractive();
      bunnySprite.setScale(0.3);
      scene.input.setDraggable(bunnySprite);
      bunnySprite.setData("dragcallback", () => {
        handleBunnyDrag(
          scene,
          bunnySprite,
          startX,
          startY,
          width,
          height,
          gameObject,
          board
        );
      });
      bunnySprite.setData("dropcallback", (pointer: Phaser.Input.Pointer) => {
        handleBunnyDrop(
          scene,
          bunnySprite,
          startX,
          startY,
          width,
          height,
          pointer,
          gameObject,
          board
        );
      });
      bunnySprite.setData(
        "draggingcallback",
        (dragX: number, dragY: number) => {
          handleBunnyDragging(
            scene,
            bunnySprite,
            startX,
            startY,
            width,
            height,
            dragX,
            dragY,
            gameObject,
            board
          );
        }
      );
      break;
    case GameObjectType.Mushroom:
      const cM = gameObject.coordinates[0];
      const mushroomSprite = scene.add.image(
        startX + cM.x * width + width / 2,
        startY + cM.y * height + height / 2 - 5,
        "mushroom"
      );
      mushroomSprite.setScale(0.06);
      break;
    case GameObjectType.Fox:
      const c1 = gameObject.coordinates[0];
      const c2 = gameObject.coordinates[1];
      const horizontal = c2.x > c1.x;
      const foxSprite = scene.add
        .image(
          startX + c1.x * width + width / 2 + (horizontal ? 50 : 0),
          startY + c1.y * height + height / 2 + (horizontal ? 0 : 30),
          "fox"
        )
        .setInteractive();
      foxSprite.setScale(0.2);
      if (!horizontal) {
        foxSprite.setRotation(1.5708);
      }
      scene.input.setDraggable(foxSprite);
      break;
  }
}
