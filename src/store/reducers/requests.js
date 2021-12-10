import {
  GET_REQUESTS_REQUESTED,
  GET_REQUESTS_FAILED,
  GET_REQUESTS_SUCCESS,
} from "../types";

const initialState = {
  requests: [],
  headers: [],
  isLoading: false,
};

function requestsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_REQUESTS_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GET_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        requests: action.payload.rows,
        headers: action.payload.headers,
        isLoading: false,
      });
    default: return state;
  }
}

export default requestsReducer;