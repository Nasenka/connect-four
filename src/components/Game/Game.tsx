import { useEffect, useState } from "react";
import { BoardState, GameInfo, Player } from "../../types";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import Board from "../Board/Board";
import { formatTime, getEmptyBoard, getGameInfo } from "./utils";
import "./Game.scss";

const SECONDS_PER_TURN = 60;

function Game() {
  const [gameInfo, setGameInfo] = useState<GameInfo>(getGameInfo());
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_TURN);

  const { player_1, player_2, board, currentPlayer, winner } = gameInfo;

  useEffect(() => {
    if (winner) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [winner]);

  useEffect(() => {
    if (timeLeft === 0) {
      const timeOutWinner =
        currentPlayer === Player.FIRST ? Player.SECOND : Player.FIRST;

      setGameInfo((prev) => {
        const newGameInfo = {
          ...prev,
          player_1: {
            wins:
              timeOutWinner === Player.FIRST
                ? prev.player_1.wins + 1
                : prev.player_1.wins,
          },
          player_2: {
            wins:
              timeOutWinner === Player.SECOND
                ? prev.player_2.wins + 1
                : prev.player_2.wins,
          },
          winner: {
            player: timeOutWinner,
            winningCells: [],
          },
        };
        localStorage.setItem("gameInfo", JSON.stringify(newGameInfo));

        return newGameInfo;
      });
    }
  }, [currentPlayer, timeLeft]);

  const handleEndTurn = (newBoard: BoardState) => {
    setTimeLeft(SECONDS_PER_TURN);
    setGameInfo((prev) => {
      const newGameInfo = {
        ...prev,
        board: newBoard,
        currentPlayer:
          prev.currentPlayer === Player.FIRST ? Player.SECOND : Player.FIRST,
      };
      localStorage.setItem("gameInfo", JSON.stringify(newGameInfo));

      return newGameInfo;
    });
  };

  const handleWin = (winningCells: number[][]) => {
    setGameInfo((prev) => {
      const newGameInfo = {
        ...prev,
        player_1: {
          wins:
            prev.currentPlayer === Player.FIRST
              ? prev.player_1.wins + 1
              : prev.player_1.wins,
        },
        player_2: {
          wins:
            prev.currentPlayer === Player.SECOND
              ? prev.player_2.wins + 1
              : prev.player_2.wins,
        },
        winner: {
          player: currentPlayer,
          winningCells,
        },
      };
      localStorage.setItem("gameInfo", JSON.stringify(newGameInfo));

      return newGameInfo;
    });
  };

  const handleReset = () => {
    setTimeLeft(SECONDS_PER_TURN);
    setGameInfo((prev) => {
      const newGameInfo = {
        ...prev,
        board: getEmptyBoard(),
        currentPlayer: Player.FIRST,
        winner: null,
      };
      localStorage.setItem("gameInfo", JSON.stringify(newGameInfo));

      return newGameInfo;
    });
  };

  const formattedTime = formatTime(timeLeft);

  return (
    <section className="game">
      <div className="game__wrapper">
        <PlayerInfo
          currentPlayer={currentPlayer}
          player={Player.FIRST}
          timeLeft={formattedTime}
          wins={player_1.wins}
        />
        <Board
          board={board}
          currentPlayer={currentPlayer}
          winner={winner}
          onEndTurn={handleEndTurn}
          onReset={handleReset}
          onWin={handleWin}
        />
        <PlayerInfo
          currentPlayer={currentPlayer}
          player={Player.SECOND}
          timeLeft={formattedTime}
          wins={player_2.wins}
        />
      </div>
    </section>
  );
}

export default Game;
