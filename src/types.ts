export enum Player {
  FIRST = "1",
  SECOND = "2",
}

export type BoardState = (Player | null)[][];

export type Winner = {
  player: Player;
  winningCells: number[][];
}

export type GameInfo = {
  player_1: {
    wins: number;
  };
  player_2: {
    wins: number;
  }
  board: BoardState;
  currentPlayer: Player;
  winner: Winner | null;
}
