import { INIT_ROOMS_START, INIT_ROOMS_SUCCESS, INIT_ROOMS_ERROR, INIT_ROOMS_END } from '../types';

export function roomsWaitingReducer(state = {}, action) {
	const { type, payload } = action;
	switch (type) {
		case INIT_ROOMS_START: {
			return {
				...state,
				isLoading: true
			};
		}
    case INIT_ROOMS_END: {
			return {
				isLoading: false
			};
		}
		case INIT_ROOMS_SUCCESS: {
			return {
				value: payload,
				error: null,
				isLoading: false
			};
		}
		case INIT_ROOMS_ERROR: {
			return {
				...state,
				isLoading: false,
				error: payload
			};
		}
		default: {
			return state;
		}
	}
}
