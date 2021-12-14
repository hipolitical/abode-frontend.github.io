import {
  GET_SINGLE_ACCOUNT_REQUESTED,
  GET_SINGLE_ACCOUNT_FAILED,
  GET_SINGLE_ACCOUNT_SUCCESS,
} from "../types";

const initialState = {
  single_account: {},
  isLoading: false,
};

function singleAccountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ACCOUNT_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_SINGLE_ACCOUNT_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GET_SINGLE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        single_account: action.payload,
        isLoading: false,
      });
    default: return state;
  }
}

export default singleAccountReducer;