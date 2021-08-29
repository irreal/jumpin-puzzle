import { Field } from "./types";

export function createField(
  x: number,
  y: number,
  isWall = false,
  isHome = false
): Field {
  return {
    coordinate: { x, y },
    isWall,
    isHome,
  };
}
