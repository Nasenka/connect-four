import classnames from "classnames";
import "./Board.scss";
import { Player, BoardState, Winner } from "../../types";
import getWinningCells from "../../core/getWinningCells";

interface BoardProps {
  board: BoardState;
  currentPlayer: Player;
  winner: Winner | null;
  onEndTurn: (newBoard: BoardState) => void;
  onReset: () => void;
  onWin: (winningCells: number[][]) => void;
}

function Board({
  board,
  currentPlayer,
  winner,
  onEndTurn,
  onReset,
  onWin,
}: BoardProps) {
  const handleColClick = (colIndex: number) => {
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

      const winningCells = getWinningCells(
        newBoard,
        colIndex,
        rowIndex,
        currentPlayer
      );

      if (winningCells.length) {
        onWin(winningCells);
      }

      onEndTurn(newBoard);
    }
  };

  const handleResetGame = () => {
    onReset();
  };

  const renderCell = (cell: Player | null): React.ReactNode => {
    if (cell === null) {
      return "";
    }

    return cell;
  };

  return (
    <div className="board__wrapper">
      {winner ? (
        <div className="board__winner">Победил игрок {winner.player}!</div>
      ) : null}
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

              if (winner) {
                for (const coord of winner.winningCells) {
                  if (coord[0] === colIndex && coord[1] === cellIndex) {
                    isWinningCell = true;
                  }
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
      <div className="board__buttons">
        <button className="board__button" onClick={handleResetGame}>
          Сбросить игру
        </button>
      </div>
    </div>
  );
}

export default Board;
