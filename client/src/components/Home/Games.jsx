import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomsInitServer } from "../../redux/actions/rooms.waiting.actions";
import GameCard from "./GameCard";

function Games() {
  const {
    isLoading,
    value: rooms,
    error,
  } = useSelector((state) => state.waitingRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(roomsInitServer());
    }, 3000);
  }, []);

  return (
    <div>
      <h2 className="games-title">
        {rooms && rooms.length > 0
          ? "Доступные сейчас игры"
          : "Доступных игр нет"}
      </h2>
      {isLoading && (
        <img src="https://i.stack.imgur.com/MEBIB.gif" alt="loading..." />
      )}
      {error && <div>Что-то пошло не так: {error}</div>}

      <div className="games-main">
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <GameCard
              key={room.roomId}
              img={`${process.env.REACT_APP_STATIC_PATH}/${room.gameImage}.png`}
              name={room.name}
              isPassword={room.isPassword}
              roomId={room.roomId}
              roomHash={room.room_hash}
            />
          ))}
      </div>
    </div>
  );
}

export default Games;
