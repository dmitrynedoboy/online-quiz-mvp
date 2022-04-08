import { INIT_USER_START, INIT_USER_SUCCESS, INIT_USER_ERROR, LOGOUT_USER, PROFILE_CHANGE } from '../types';

export function userReducer(state = {}, action) {
	const { type, payload } = action;
	switch (type) {
		case INIT_USER_START: {
			return {
				...state,
				isLoading: true
			};
		}
		case INIT_USER_SUCCESS: {
			return {
				value: payload,
				error: null,
				isLoading: false
			};
		}
		case INIT_USER_ERROR: {
			return {
				...state,
				isLoading: false,
				error: payload
			};
		}
		case LOGOUT_USER: {
			return {
				value: {},
				isLoading: false,
				error: null
			};
		}
		default: {
			return state;
		}
	}
}
