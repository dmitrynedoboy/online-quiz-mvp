import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { roomReducer } from "./room.reducer";
import { gameReducer } from "./game.reducer";
import { roomsWaitingReducer } from "./rooms.waiting.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  room: roomReducer,
  waitingRooms: roomsWaitingReducer,
});
