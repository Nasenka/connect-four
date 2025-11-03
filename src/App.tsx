import { useState } from "react";
import { Player } from "./types";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import Board from "./components/Board/Board";
import "./App.scss";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(Player.FIRST);

  const handleChangePlayer = () => {
    setCurrentPlayer((prev) =>
      prev === Player.FIRST ? Player.SECOND : Player.FIRST
    );
  };

  return (
    <main>
      <section className="game">
        <div className="container game__wrapper">
          <PlayerInfo player={Player.FIRST} currentPlayer={currentPlayer} />
          <Board
            currentPlayer={currentPlayer}
            onChangePlayer={handleChangePlayer}
          />
          <PlayerInfo player={Player.SECOND} currentPlayer={currentPlayer} />
        </div>
      </section>
    </main>
  );
}

export default App;
