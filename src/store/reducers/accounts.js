import {
  GET_MY_ACCOUNTS_REQUESTED,
  GET_MY_ACCOUNTS_FAILED,
  GET_MY_ACCOUNTS_SUCCESS,
  ADD_CLIENT_ACCOUNT_SUCCESS,
  UPDATE_CLIENT_ACCOUNT_SUCCESS,
} from "../types";

const initialState = {
  accounts: [],
  headers: [],
  isLoading: false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_ACCOUNTS_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_MY_ACCOUNTS_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GET_MY_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, {
        accounts: action.payload.rows,
        headers: action.payload.headers,
        isLoading: false,
      });
    case ADD_CLIENT_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        accounts: [...state.accounts, action.payload],
        isLoading: false,
      });
    case UPDATE_CLIENT_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        accounts: state.accounts.map(account => account.id === action.payload.id ? action.payload : account),
        isLoading: false,
      });
    default: return state;
  }
}

export default accountReducer;