import { addFields, createBoard } from "./board";
import { createField } from "./field";

describe("Board functions", () => {
  it("Creates empty board", () => {
    const board = createBoard([]);
    expect(board.fields.length).toEqual(0);
  });

  it("Creates board with fields", () => {
    const board = createBoard([createField(4, 5)]);
    expect(board.fields.length).toEqual(1);
    expect(board.fields[0].coordinate.x).toEqual(4);
    expect(board.fields[0].coordinate.y).toEqual(5);
  });

  it("Adds fields to a board", () => {
    let board = createBoard([]);
    board = addFields(board, [createField(4, 5)]);
    expect(board.fields.length).toEqual(1);
    expect(board.fields[0].coordinate.x).toEqual(4);
    expect(board.fields[0].coordinate.y).toEqual(5);

    board = addFields(board, [createField(6, 7)]);
    expect(board.fields.length).toEqual(2);
    expect(board.fields[1].coordinate.x).toEqual(6);
    expect(board.fields[1].coordinate.y).toEqual(7);

    board = createBoard([]);
    board = addFields(board, [createField(4, 5), createField(6, 7)]);
    expect(board.fields.length).toEqual(2);
    expect(board.fields[0].coordinate.x).toEqual(4);
    expect(board.fields[0].coordinate.y).toEqual(5);
    expect(board.fields[1].coordinate.x).toEqual(6);
    expect(board.fields[1].coordinate.y).toEqual(7);
  });
});
