import {
  GET_ALL_ACCOUNTS_REQUESTED,
  GET_ALL_ACCOUNTS_FAILED,
  GET_ALL_ACCOUNTS_SUCCESS,
  CREATE_REQUEST_SUCCESS,
} from "../types";
import {
  STATUS_DENIED,
  STATUS_REQUESTED,
} from '../../utils/consts';

const initialState = {
  accounts: [],
  headers: [],
  count: 0,
  isLoading: false,
};

function accountsAllReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNTS_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_ALL_ACCOUNTS_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GET_ALL_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, {
        accounts: action.payload.rows,
        headers: action.payload.headers,
        count: action.payload.count,
        isLoading: false,
      });
    case CREATE_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        accounts: state.accounts.map((account) => ({
          ...account,
          status: action.params.targetId === account.id ?
            STATUS_REQUESTED : account.status
        })),
      });
    }
    default: return state;
  }
}

export default accountsAllReducer;