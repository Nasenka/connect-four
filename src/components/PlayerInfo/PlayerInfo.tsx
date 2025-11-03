import classnames from "classnames";
import "./PlayerInfo.scss";
import { Player } from "../../types";

interface PlayerInfoProps {
  player: string;
  currentPlayer: string;
}

function PlayerInfo({ player, currentPlayer }: PlayerInfoProps) {
  return (
    <div
      className={classnames("player", {
        player_first: player === Player.FIRST,
        player_second: player === Player.SECOND,
      })}
    >
      <div className="player__wrapper">
        <div className="player__color-wrapper">
          <div className="player__color" />
        </div>
        <div className="player__number">Игрок {player}</div>
        {/* <div className="player__wins">Побед: 1</div> */}
      </div>
      {player === currentPlayer ? (
        <div className="player__turn">Ход игрока {player}</div>
      ) : null}
    </div>
  );
}

export default PlayerInfo;
