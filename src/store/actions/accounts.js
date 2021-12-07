import {
  GET_ACCOUNTS_REQUESTED,
} from "../types";

export function getAccounts() {
  return { type: GET_ACCOUNTS_REQUESTED };
}