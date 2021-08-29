import { createField } from "./field";

describe("Field functions", () => {
  it("Creates a field", () => {
    const field = createField(0, 0);
    expect(field.coordinate.x).toEqual(0);
    expect(field.coordinate.y).toEqual(0);
    expect(field.isHome).toEqual(false);
    expect(field.isWall).toEqual(false);
  });
});
