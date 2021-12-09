import {
  GET_PLACEMENTS_REQUESTED,
  GET_PLACEMENTS_FAILED,
  GET_PLACEMENTS_SUCCESS,
  ADD_PLACEMENT_SUCCESS,
  UPDATE_PLACEMENT_SUCCESS,
} from "../types";

const initialState = {
  placements: [],
  headers: [],
  isLoading: false,
};

function placementReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLACEMENTS_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_PLACEMENTS_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GET_PLACEMENTS_SUCCESS:
      return Object.assign({}, state, {
        placements: action.payload.rows,
        headers: action.payload.headers,
        isLoading: false,
      });
    case ADD_PLACEMENT_SUCCESS:
      return Object.assign({}, state, {
        placements: [...state.placements, action.payload],
        isLoading: false,
      });
    case UPDATE_PLACEMENT_SUCCESS:
      return Object.assign({}, state, {
        placements: state.placements.map(placement => placement.id === action.payload.id ? action.payload : placement),
        isLoading: false,
      });
    default: return state;
  }
}

export default placementReducer;