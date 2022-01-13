import {
  GET_ACCOUNT_USERS_REQUESTED,
  GET_ACCOUNT_USERS_FAILED,
  GET_ACCOUNT_USERS_SUCCESS,
  GET_ALL_USERS_REQUESTED,
  GET_ALL_USERS_FAILED,
  GET_ALL_USERS_SUCCESS,
} from "../types";

const initialState = {
  account_users: [],
  all_users: [],
  headers: [],
  isLoading: false,
};

function accountUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS_REQUESTED:
    case GET_ACCOUNT_USERS_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_ALL_USERS_FAILED:
    case GET_ACCOUNT_USERS_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GET_ACCOUNT_USERS_SUCCESS:
      return Object.assign({}, state, {
        account_users: action.payload.rows,
        headers: action.payload.headers,
        isLoading: false,
      });
    case GET_ALL_USERS_SUCCESS:
      return Object.assign({}, state, {
        all_users: action.payload,
        isLoading: false,
      });
    default: return state;
  }
}

export default accountUsersReducer;