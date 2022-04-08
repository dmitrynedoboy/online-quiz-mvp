import { ADD_NEW_ROOM } from '../types';
import { CHANGE_ROOM_STATUS } from '../types';
import { CHANGE_ROOM_STATUS_FINISH } from '../types';
import { CLEAR_ROOM } from '../types';

export function roomReducer(state = [], action) {
  const { type, payload } = action;


  switch (type) {
    case ADD_NEW_ROOM: {
      return {...payload}
    }
    case CHANGE_ROOM_STATUS:{
      return payload
    }
    case CHANGE_ROOM_STATUS_FINISH:{
      return {...state, ...payload}
    }
    case CLEAR_ROOM: {
      return {}
    }
    default: {
      return state
    }
  }
}
