import classnames from "classnames";
import "./Board.scss";
import { Player, BoardState } from "../../types";
import { useState } from "react";
import getWinningCells from "../../core/getWinningCells";

// Кнопка сброса
// Считать количетсво побед
// Отмена шага
// Таймер

interface BoardProps {
  currentPlayer: Player;
  onChangePlayer: () => void;
}

const ROWS = 6;
const COLS = 7;
const BOARD = Array(COLS)
  .fill(null)
  .map(() => Array(ROWS).fill(null));

function Board({ currentPlayer, onChangePlayer }: BoardProps) {
  const [board, setBoard] = useState<BoardState>(BOARD);
  const [winner, setWinner] = useState<Player>();
  const [winningCells, setWinningCells] = useState<number[][]>([]);
  // Сделать один общий объект с победителем и его ячейками

  const handleColClick = (colIndex: number) => {
    if (winner) return;

    const newBoard = [...board];
    const lastIndex = newBoard[colIndex].findIndex((item) => item !== null);
    let rowIndex: number | null = null;

    if (lastIndex === -1) {
      rowIndex = newBoard[colIndex].length - 1;
    } else {
      rowIndex = lastIndex - 1;
    }

    if (rowIndex >= 0) {
      newBoard[colIndex][rowIndex] = currentPlayer;

      setBoard(newBoard);

      const winningCells = getWinningCells(
        newBoard,
        colIndex,
        rowIndex,
        currentPlayer
      );
      setWinningCells(winningCells);

      if (winningCells.length) {
        setWinner(currentPlayer);
      } else {
        onChangePlayer();
      }
    }
  };

  const renderCell = (cell: Player | null): React.ReactNode => {
    if (cell === null) {
      return "";
    }

    return cell;
  };

  return (
    <div className={classnames("board", { board_disabled: winner })}>
      {board.map((col, colIndex) => (
        <button
          className={classnames("board__col", {
            board__col_first: currentPlayer === Player.FIRST,
            board__col_second: currentPlayer === Player.SECOND,
          })}
          key={colIndex}
          onClick={() => handleColClick(colIndex)}
          disabled={board[colIndex][0] ? true : false}
        >
          {col.map((cell, cellIndex) => {
            let isWinningCell = false;

            for (const coord of winningCells) {
              if (coord[0] === colIndex && coord[1] === cellIndex) {
                isWinningCell = true;
              }
            }

            return (
              <div
                className={classnames("board__cell", {
                  board__cell_empty: cell === null,
                  board__cell_first: cell === Player.FIRST,
                  board__cell_second: cell === Player.SECOND,
                  board__cell_win: isWinningCell,
                })}
                key={cellIndex}
              >
                {renderCell(cell)}
              </div>
            );
          })}
        </button>
      ))}
    </div>
  );
}

export default Board;
