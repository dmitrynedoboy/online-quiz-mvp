import { createStore } from 'redux';
import { rootReducer } from './reducers/root.reducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
	user: {
		value: {},
		isLoading: false,
		error: null
	},
	game: [],
	room: {},
	waitingRooms: {
		value: [],
		isLoading: false,
		error: null
	}
};

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
