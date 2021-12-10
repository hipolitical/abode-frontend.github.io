import {
  GET_ALL_ACCOUNTS_REQUESTED,
} from "../types";

export function getAllAccounts() {
  return { type: GET_ALL_ACCOUNTS_REQUESTED };
}
