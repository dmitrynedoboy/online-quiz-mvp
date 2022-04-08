import axios from 'axios';
import { INIT_GAME } from '../types';

export const initGame = (game) => {
	return {
		type: INIT_GAME,
		payload: game
	};
};

export const initGameAC = (room) => (dispatch) => {
	const { roomId, roomHash } = room;
	try {
		axios.post(`${process.env.REACT_APP_SERVER_HOST}/room/${roomHash}`, { roomId }).then((response) => {
			dispatch(initGame(response.data));
		});
	} catch (err) {
		console.error(err);
	}
};
