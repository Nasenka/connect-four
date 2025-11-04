import { BoardState, Player } from "../types";

const getWinningCells = (
  board: BoardState,
  colIndex: number,
  rowIndex: number,
  currentPlayer: Player
) => {
  // направления, в которых будем искать одинаковые точки
  const directions = [
    { colStep: 1, rowStep: 0, }, // горизонталь
    { colStep: 0, rowStep: 1, }, // вертикаль
    { colStep: 1, rowStep: 1, }, // диагональ
    { colStep: -1, rowStep: 1, }, // диагональ
  ];

  // собираем координаты одинаковых точек подряд в данном направлении
  const coordsInDirection = (
    colStep: number,
    rowStep: number,
  ): number[][] => {
    let currentCol = colIndex + colStep;
    let currentRow = rowIndex + rowStep;
    let coords = [];

    while (
      currentCol >= 0 &&
      currentCol < board.length &&
      currentRow >= 0 &&
      currentRow < board[0].length &&
      board[currentCol][currentRow] === currentPlayer
    ) {
      coords.push([currentCol, currentRow]);
      currentCol += colStep;
      currentRow += rowStep;
    }

    return coords;
  };

  // Проверяем все 4 направления
  for (const { colStep, rowStep } of directions) {
    // считаем коорданиты точек в обе стороны
    const totalCoords = [
      [colIndex, rowIndex],
      ...coordsInDirection(rowStep, colStep),
      ...coordsInDirection(-rowStep, -colStep),
    ];

    if (totalCoords.length >= 4) {
      return totalCoords;
    }
  }

  return [];
};

export default getWinningCells;
