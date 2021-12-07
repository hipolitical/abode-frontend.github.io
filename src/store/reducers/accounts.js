import {
  GET_ACCOUNTS_REQUESTED,
  GET_ACCOUNTS_FAILED,
  GET_ACCOUNTS_SUCCESS,
  ADD_ACCOUNT_SUCCESS,
} from "../types";

const initialState = {
  accounts: [],
  headers: [],
  isLoading: false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_ACCOUNTS_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GET_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, {
        accounts: action.payload.rows,
        headers: action.payload.headers,
        isLoading: false,
      });
    case ADD_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        accounts: [...state.accounts, action.payload],
        isLoading: false,
      });
    default: return state;
  }
}

export default accountReducer;