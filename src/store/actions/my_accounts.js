import {
  GET_MY_ACCOUNTS_REQUESTED,
} from "../types";

export function getMyAccounts(params) {
  return { type: GET_MY_ACCOUNTS_REQUESTED, params };
}

