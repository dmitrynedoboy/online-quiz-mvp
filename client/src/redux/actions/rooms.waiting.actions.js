import axios from 'axios';
import { INIT_ROOMS_START, INIT_ROOMS_SUCCESS, INIT_ROOMS_ERROR, INIT_ROOMS_END } from '../types';
import { useMemo } from 'react';

const initRoomsSuccess = (user) => ({
	type: INIT_ROOMS_SUCCESS,
	payload: user
});

export const initRoomsStart = () => ({
	type: INIT_ROOMS_START
});

const initRoomsError = (error) => ({
	type: INIT_ROOMS_ERROR,
	payload: error
});

export const initRoomsEnd = () => ({
	type: INIT_ROOMS_END
});

export const roomsInitServer = () => (dispatch) => {
	axios(`${process.env.REACT_APP_SERVER_HOST}/room`, { withCredentials: true })
		.then(({ data }) => {
			if (data.status === 400) {
				initRoomsError(data.error);
			} else {
				dispatch(initRoomsSuccess(data));
			}
		})
		.catch((err) => console.error(err));
};
