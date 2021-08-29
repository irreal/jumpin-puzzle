import { Field } from "../logic/types";

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
