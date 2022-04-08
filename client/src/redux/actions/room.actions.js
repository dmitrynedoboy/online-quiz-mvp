import { ADD_NEW_ROOM } from '../types';
import { CLEAR_ROOM } from '../types';
import { CHANGE_ROOM_STATUS } from '../types';
import { CHANGE_ROOM_STATUS_FINISH } from '../types';
import axios from 'axios';

export const addNewRoomInState = (roomData) => {
	return {
		type: ADD_NEW_ROOM,
		payload: roomData
	};
};

export const changeRoomStatusAC = (roomData) => {
	return {
		type: CHANGE_ROOM_STATUS,
		payload: roomData
	};
};

export const changeRoomStatusToFinished = () => {
	return {
		type: CHANGE_ROOM_STATUS_FINISH,
		payload: { status: 'finished' }
	};
};

export const clearRoomAC = (roomData) => {
	return {
		type: CLEAR_ROOM,
		payload: roomData
	};
};

export const addNewRoom = (roomData) => (dispatch) => {
	try {
		axios.post(`${process.env.REACT_APP_SERVER_HOST}/room/create`, roomData).then((response) => {
			if (response.status === 200) {
				dispatch(addNewRoomInState(response.data));
			}
		});
	} catch (err) {
		console.error(err);
	}
};

// функция инициализация комнаты c сервера
export const initRoom = (roomHash) => (dispatch) => {
	try {
		axios(`${process.env.REACT_APP_SERVER_HOST}/room/${roomHash}`).then((response) => {
			if (response.data.message) {
				window.location = `/?message=${response.data.message}`;
			}
			if (response.status === 200) {
				dispatch(addNewRoomInState(response.data));
			}
		});
	} catch (err) {
		console.error(err);
	}
};
