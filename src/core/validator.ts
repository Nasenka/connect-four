import { Player } from "../types";
import getWinningCells from "./getWinningCells";

const ROWS = 6;
const COLS = 7;
const BOARD = Array(COLS)
  .fill(null)
  .map(() => Array(ROWS).fill(null));
const CELLS = ROWS * COLS;

enum BoardState {
  WAITING = "waiting",
  PENDING = "pending",
  WIN = "win",
  DRAW = "draw",
}

interface StepDetail {
  player_1: number[][];
  player_2: number[][];
  board_state: BoardState;
  winner: {
    who: string;
    positions: number[][];
  } | null;
}

const validator = (arr: number[]): Record<string, StepDetail> => {
  if (arr.length > CELLS) {
    throw new Error("Больше ходов, чем возможно");
  }

  const history: Record<string, StepDetail> = {
    step_0: {
      player_1: [],
      player_2: [],
      board_state: BoardState.WAITING,
      winner: null,
    }
  }

  for (let i = 0; i < arr.length; i++) {
    const colIndex = arr[i];
    if (colIndex > 6 || colIndex < 0) {
      throw new Error("Недопустимый номер столбца");
    }

    const lastIndex = BOARD[colIndex].findIndex((item) => item !== null);
    const currentPlayer = i % 2 === 0 ? Player.FIRST : Player.SECOND;
    let rowIndex: number | null = null;

    if (lastIndex === -1) {
      rowIndex = ROWS - 1;
    } else if (lastIndex > 0) {
      rowIndex = lastIndex - 1;
    } else {
      throw new Error("Переполненный столбец");
    }

    BOARD[colIndex][rowIndex] = currentPlayer;

    const winningCells = getWinningCells(
      BOARD,
      colIndex,
      rowIndex,
      currentPlayer
    );

    const hasWinner = !!winningCells.length;

    console.log("arr[i + 1]", arr[i + 1]);

    if (hasWinner && arr[i + 1] !== undefined) {
      throw new Error("Лишний ход после победы");
    }

    history[`step_${i + 1}`] = {
      player_1: currentPlayer === Player.FIRST ? [...history[`step_${i}`].player_1, [colIndex, rowIndex]] : history[`step_${i}`].player_1,
      player_2: currentPlayer === Player.SECOND ? [...history[`step_${i}`].player_2, [colIndex, rowIndex]] : history[`step_${i}`].player_2,
      board_state: hasWinner ? BoardState.WIN : BoardState.PENDING,
      winner: hasWinner ? {
        who: currentPlayer,
        positions: winningCells,
      } : null
    }
  }

  if (arr.length === CELLS && history[`step_${arr.length}`].board_state !== BoardState.WIN) {
    history[`step_${arr.length}`].board_state = BoardState.DRAW;
  }

  return history;
}

export default validator;
