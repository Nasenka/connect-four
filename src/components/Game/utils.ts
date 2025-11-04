import { Player } from "../../types";

export const getEmptyBoard = () => {
  const ROWS = 6;
  const COLS = 7;

  return Array(COLS)
    .fill(null)
    .map(() => Array(ROWS).fill(null));
}

export const getGameInfo = () => {
  const gameInfo = localStorage.getItem("gameInfo");

  if (gameInfo) {
    return JSON.parse(gameInfo);
  }

  return {
    player_1: {
      wins: 0,
    },
    player_2: {
      wins: 0,
    },
    board: getEmptyBoard(),
    currentPlayer: Player.FIRST,
    winner: null,
  }
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const leftSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = leftSeconds < 10 ? '0' + leftSeconds : leftSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}
