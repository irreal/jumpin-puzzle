import { Coordinate, GameObject, GameObjectType } from "./types";

export function createGameObject(
  type: GameObjectType,
  coordinates: Coordinate[]
): GameObject {
  return {
    type,
    coordinates,
  };
}
