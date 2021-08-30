import { GameObject, GameObjectType } from "./types";
import { createGameObject } from "./game-object";

export function createObjectsFromShortString(level: string): GameObject[] {
  const objects: GameObject[] = [];
  for (let i = 0; i < level.length; i++) {
    const x = i % 5;
    const y = Math.floor(i / 5);
    if (level[i] === "0") {
      continue;
    } else if (level[i] === "1") {
      objects.push(createGameObject(GameObjectType.Bunny, [{ x, y }]));
    } else if (level[i] === "2") {
      objects.push(createGameObject(GameObjectType.Mushroom, [{ x, y }]));
    } else if (level[i] === "3") {
      objects.push(
        createGameObject(GameObjectType.Fox, [
          { x, y },
          { x: x + 1, y },
        ])
      );
    } else if (level[i] === "4") {
      objects.push(
        createGameObject(GameObjectType.Fox, [
          { x, y },
          { x, y: y + 1 },
        ])
      );
    }
  }
  return objects;
}
