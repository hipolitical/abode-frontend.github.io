import {
  GET_ACCOUNTS_REQUESTED,
  ADD_ACCOUNT_REQUESTED,
  UPDATE_ACCOUNT_REQUESTED,
} from "../types";

export function getAccounts() {
  return { type: GET_ACCOUNTS_REQUESTED };
}

export function addAccount(account) {
  return { type: ADD_ACCOUNT_REQUESTED, account };
}

export function updateAccount(account) {
  return { type: UPDATE_ACCOUNT_REQUESTED, account };
}