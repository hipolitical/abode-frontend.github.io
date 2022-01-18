import {
  GET_ALL_ACCOUNTS_REQUESTED,
  CREATE_REQUEST_REQUESTED,
} from "../types";

export function getAllAccounts(params) {
  return { type: GET_ALL_ACCOUNTS_REQUESTED, params };
}

export function createRequest(params) {
  return { type: CREATE_REQUEST_REQUESTED, params };
}