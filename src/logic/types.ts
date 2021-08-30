export type Board = {
  fields: Field[];
  gameObjects: GameObject[];
};
export type Field = {
  coordinate: Coordinate;
  isHome: boolean;
  isWall: boolean;
};

export type GameObject = {
  type: GameObjectType;
  coordinates: Coordinate[];
};
export enum GameObjectType {
  Bunny = "Bunny",
  Mushroom = "Mushroom",
  Fox = "Fox",
}

export type Coordinate = {
  x: number;
  y: number;
};
