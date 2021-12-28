import {
  GET_MY_ACCOUNTS_REQUESTED,
} from "../types";

export function getMyAccounts(id) {
  return { type: GET_MY_ACCOUNTS_REQUESTED, id };
}

