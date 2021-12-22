import {
  GET_ALL_ACCOUNTS_REQUESTED,
} from "../types";

export function getAllAccounts(params) {
  return { type: GET_ALL_ACCOUNTS_REQUESTED, params };
}
