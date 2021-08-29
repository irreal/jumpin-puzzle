import { createBoard, getFieldByPoint } from "./board";
import { createField } from "./field";

describe("Board fields functions", () => {
  it("Finds field by id", () => {
    const board = createBoard([createField(5, 6), createField(5, 2)]);
    const field = getFieldByPoint(board, 5, 6);
    expect(field).not.toBeUndefined();
    expect(field!.coordinate.x).toBe(5);
    const field2 = getFieldByPoint(board, 5, 2);
    expect(field2).not.toBeUndefined();
    expect(field2!.coordinate.x).toBe(5);
    const field3 = getFieldByPoint(board, 5, 3);
    expect(field3).toBeUndefined();
  });
});
