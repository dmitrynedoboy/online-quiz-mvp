import axios from 'axios';
import { INIT_USER_START, INIT_USER_SUCCESS, INIT_USER_ERROR, LOGOUT_USER } from '../types';

const initUserSuccess = (user) => ({
	type: INIT_USER_SUCCESS,
	payload: user
});

const initUserStart = () => ({
	type: INIT_USER_START
});

const initUserError = (error) => ({
	type: INIT_USER_ERROR,
	payload: error
});

const logoutUser = () => ({
	type: LOGOUT_USER
});

export const userInitSession = () => (dispatch) => {
	axios(`${process.env.REACT_APP_SERVER_HOST}/auth`, { withCredentials: true })
		.then(({ data }) => {
			if (data.status === 400) {
				alert(data.error);
			} else {
				dispatch(initUserSuccess(data.user)); // пишем в стейт, если все ок
			}
		})
		.catch((err) => console.error(err));
};

export const signinServer = (loginData) => (dispatch) => {
	dispatch(initUserStart()); // запускаем лоадинг
	axios
		.post(`${process.env.REACT_APP_SERVER_HOST}/auth/signin`, loginData, { withCredentials: true }) // запрос на создание пользователя
		.then(({ data }) => {
			if (data.status === 400) {
				dispatch(initUserError(data.error)); // пишем ошибку в стейт
			} else {
				dispatch(initUserSuccess(data.user)); // пишем в стейт, если все ок
			}
		})
		.catch((err) => console.error(err));
};

export const signupServer = (formData) => (dispatch) => {
	dispatch(initUserStart()); // запускаем лоадинг
	axios
		.post(`${process.env.REACT_APP_SERVER_HOST}/auth/signup`, formData, { withCredentials: true }) // запрос на создание пользователя
		.then(({ data }) => {
			if (data.status === 400) {
				dispatch(initUserError(data.error)); // пишем ошибку в стейт
			} else {
				dispatch(initUserSuccess(data.user)); // пишем в стейт, если все ок
			}
		})
		.catch((err) => console.error(err));
};

export const logoutServer = () => (dispatch) => {
	axios(`${process.env.REACT_APP_SERVER_HOST}/auth/signout`, { withCredentials: true })
		.then(({ data }) => {
			if (data.status === 400) {
				dispatch(initUserError(data.error)); // пишем ошибку в стейт
			} else {
				dispatch(logoutUser()); // пишем в стейт, если все ок
			}
		})
		.catch((err) => console.error(err));
};
